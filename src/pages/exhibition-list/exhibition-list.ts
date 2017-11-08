import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams, LoadingController, Events } from 'ionic-angular';
import { ExhibitionsProvider } from '../../providers/exhibitions/exhibitions';
import { NativeStorage } from '@ionic-native/native-storage';
import { TranslateService } from '@ngx-translate/core';
import { DownloadProvider } from '../../providers/downloader/downloader';


@IonicPage()
@Component({
    selector: 'page-exhibition-list',
    templateUrl: 'exhibition-list.html',
})
export class ExhibitionList {
    exhibitions: Array<Object>
    allExhibitions: Array<Object>
    hasExhibitions: boolean
    storedData;

    constructor(public navCtrl: NavController,
                public alertCtrl: AlertController,
                public navParams: NavParams,
                public events: Events,
                public loadingCtrl: LoadingController,
                private nativeStorage: NativeStorage,
                public translate: TranslateService,
                private service: ExhibitionsProvider,
                private downloader: DownloadProvider) {
    }

    ionViewWillEnter() {
      this.getStoredData()
      this.events.publish('stopRanging')
      this.events.publish('cleanLastTriggeredBeacon')
    }

    getStoredData() {
      this.nativeStorage.keys().then((data) => {
        this.storedData = data
        this.setExhibtitions()
      })
    }

    setExhibtitions() {
      this.service.retrieveList().subscribe(exhibitions => {
        if(exhibitions.length > 0){
          this.hasExhibitions = true
          this.allExhibitions = exhibitions
          this.filterExhibitions()
        }else {
          this.showNoExhibitionMessage()
        }
      })
    }

    showNoExhibitionMessage() {
        this.hasExhibitions = false
    }

    isDownloaded(exhibition) {
        return this.storedData.some(id => id === exhibition.id)
    }

    filterExhibitions() {
        let activeExhibitions: Array<Object> = []

        for (let exhibition of this.allExhibitions) {
            if (exhibition['show']) {
                activeExhibitions.push(exhibition)
            }
        }

        this.exhibitions = activeExhibitions
    }

    askLanguage(exhibition) {
      let messages;

      this.translate.get('EXHIBITIONS.LIST.ALERT').subscribe(data => {
        messages = data
      });

      var isoCodeTranslations = {
        'es': 'Castellano',
        'cat': 'Valencià',
        'en': 'English'
      }

      let alert = this.alertCtrl.create({
        title: messages['TITLE'],
        message: messages['BODY'],
        buttons: [
            {
              text: messages['BUTTONS']['NO'],
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            },
            {
              text: messages['BUTTONS']['YES'],
              handler: (isoCode) => {
                this.download(exhibition, isoCode)
              }
          }
        ]
      });
      exhibition.iso_codes.forEach((locale) => {
        alert.addInput({type: 'radio', label: isoCodeTranslations[locale], value: locale})
      })
      alert.present();
    }

    presentLoading() {
      const loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      loading.present();

      setTimeout(() => {
        loading.dismiss();
      }, 1000);
    }

    download(exhibition, isoCode) {
      this.service.download(exhibition.id, isoCode).subscribe(exhibition => {
        this.downloadMedia(exhibition).then((exhibition) => {
          console.log(exhibition)
          this.saveInLocal(exhibition)
        })
      })
    }

    saveInLocal(exhibition) {
      this.nativeStorage.setItem(exhibition.id, exhibition)
          .then(
            () => {
              this.presentLoading()
              this.getStoredData()
              console.log('Stored item!')
            },
            error => console.error('Error storing item', error)
          );
    }

    extractMedia(exhibition){
      let media = []
      media.push(exhibition.image)
      exhibition.items.forEach(function(item){
        media.push(item.image)
        item.children.forEach(function(child){
          media.push(child.image)
        })
      })
      return media
    }

    downloadMedia(exhibition) {
      return Promise.all(exhibition.items.map((object) => {
        return this.downloader.download(object.video, object.id).then((source) => {
          object.video = source
          return object
        })
      })).then(items => {
        exhibition.items = items
        return new Promise<Object>((resolve) => {
            resolve(exhibition);
        });
      })
    }

    delete(exhibition) {
      this.nativeStorage.remove(exhibition.id).then(() => {
        this.presentLoading()
        this.getStoredData()
      })
    }

    goToDetail(exhibition) {
      this.nativeStorage.getItem(exhibition.id)
        .then(
          exhibition => {
            this.navCtrl.push('ExhibitionDetail', {exhibition: exhibition})
          })
        .catch(
          error => {
            this.askLanguage(exhibition)
          });
    }

    goToMuseum(museumId) {
        this.navCtrl.push('MuseumDetail', {id: museumId})
    }
}
