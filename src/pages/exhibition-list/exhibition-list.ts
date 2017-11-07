import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams, LoadingController, Events } from 'ionic-angular';
import { ExhibitionsProvider } from '../../providers/exhibitions/exhibitions';
import { NativeStorage } from '@ionic-native/native-storage';
import { TranslateService } from '@ngx-translate/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

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
                private transfer: FileTransfer,
                private file: File) {
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
        exhibition.items.map((item) => {
          this.downloadMedia(item.name, item.video).then((entry) => {
            console.log('download complete: ' + entry.toURL());
            item.video = entry.toURL()
          }, (error) => {
            console.log(error)
          });
          return item
        })

        // this.downloadAllMedia(exhibition)
        setTimeout(() => {
          console.log("exhibition.items[0].video")
          console.log(exhibition.items[0].video)
          this.saveInLocal(exhibition)
        }, 3000)
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

    downloadAllMedia(exhibition){
      exhibition.items.forEach(function(item, index){
        this.downloadMedia(item.name, item.video)

        // item.children.forEach(function(child){
        //   this.downloadMedia(item.name, child.video)
        //   child.children.forEach(function(subchild){
        //     this.downloadMedia(item.name, subchild.video)
        //   })
        // })
      }.bind(this))
    }

    downloadMedia(name, source) {
      console.log('he entrado en download media souuuuuuuurce - ' + source)
      let fileTransfer: FileTransferObject = this.transfer.create();
      return fileTransfer.download(source, this.file.dataDirectory + 'video-' + name + '.mp4')
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
