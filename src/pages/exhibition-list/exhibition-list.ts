import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams, LoadingController, Events, Platform } from 'ionic-angular';
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
    loading;

    constructor(public navCtrl: NavController,
                public alertCtrl: AlertController,
                public navParams: NavParams,
                public events: Events,
                public platform: Platform,
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
      if (this.platform.is('cordova')) {
        this.nativeStorage.keys().then((data) => {
          this.storedData = data
          this.setExhibtitions()
        })
      }else {
        this.storedData = []
        this.setExhibtitions()
      }
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

    download(exhibition, isoCode) {
      this.service.download(exhibition.id, isoCode).subscribe(exhibition => {
        this.extractItems(exhibition)
        this.saveInLocal(exhibition)
      }, error => {
        console.log(JSON.stringify(error))
      })
    }

    saveInLocal(exhibition) {
      this.nativeStorage.setItem(exhibition.id, exhibition)
          .then(
            () => {
              this.presentLoading()
              console.log('Stored item!')
            },
            error => {
              console.error('Error storing item', error)
            }
          );
    }

    extractItems(exhibition){
      let items = []
      exhibition.items.forEach(item => {
        items.push(item)
        item.children.forEach(child => {
          items.push(child)
          child.children.forEach(subchild => {
            items.push(subchild)
          })
        })
      })
      setTimeout(()=>{
        this.nativeStorage.setItem(exhibition.id + '-items', items)
        this.downloadMedia(items)
      }, 1500)
    }

    downloadMedia(items) {
      Promise.all(
        items.map((object) => {
          return this.downloader.download(object.video, object.id)
        })
      ).then(() => {
        this.getStoredData()
        this.loading.dismiss();
      })
    }

    delete(exhibition) {
      this.nativeStorage.remove(exhibition.id).then(() => {
        this.presentLoading()
        this.getStoredData()
      })
      this.nativeStorage.getItem(exhibition.id + '-items').then(items => {
        this.downloader.deleteMedia(items)
      })
      this.nativeStorage.remove(exhibition.id + '-items').then(done => {
        this.loading.dismiss();
      })
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
      this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      this.loading.present();
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
