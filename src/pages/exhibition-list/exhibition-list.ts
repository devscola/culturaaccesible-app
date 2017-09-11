import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams } from 'ionic-angular';
import { ExhibitionsProvider } from '../../providers/exhibitions/exhibitions';

@IonicPage()
@Component({
    selector: 'page-exhibition-list',
    templateUrl: 'exhibition-list.html',
})
export class ExhibitionList {
    exhibitions: Array<Object>
    allExhibitions: Array<Object>
    hasExhibitions: boolean

    constructor(public navCtrl: NavController,
                public alertCtrl: AlertController,
                public navParams: NavParams,
                private service: ExhibitionsProvider) {
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

    filterExhibitions() {
        let activeExhibitions: Array<Object> = []

        for (let exhibition of this.allExhibitions) {
            if (exhibition['show']) {
                activeExhibitions.push(exhibition)
            }
        }
        this.exhibitions = activeExhibitions
    }

    isDownloaded(exhibition) {
      return false
    }

    askLenguaje(exhibition) {
      exhibition.lenguajes = ['es', 'cat', 'en']
      let alert = this.alertCtrl.create({
        title: 'Choose lenguaje',
        message: 'in which lenguaje do you want to listen',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
              }
            },
            {
            text: 'Yes',
            handler: () => {
              this.download(exhibition)
            }
          }
        ]
      });
      exhibition.lenguajes.forEach((locale) => {
        alert.addInput({type: 'radio', label: locale, value: locale})
      })
      alert.present();
    }

    download(exhibition) {
      console.log('starting download')
    }

    goToDetail(exhibition) {
        if(this.isDownloaded(exhibition)){
            this.navCtrl.push('ExhibitionDetail', {exhibition: exhibition})
        }else{
            this.askLenguaje(exhibition)
        }
    }
}
