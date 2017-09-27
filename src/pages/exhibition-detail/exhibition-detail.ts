import { Component, NgZone, ChangeDetectorRef } from '@angular/core';
import { Platform, IonicPage, NavController, AlertController, NavParams, Events } from 'ionic-angular';
import { ExhibitionsProvider } from '../../providers/exhibitions/exhibitions';
import { ItemsProvider } from '../../providers/items/items'
import { BeaconProvider } from '../../providers/beacons/beacons'
import { NativeStorage } from '@ionic-native/native-storage';

@IonicPage()
@Component({
    selector: 'page-exhibition-detail',
    templateUrl: 'exhibition-detail.html',
})
export class ExhibitionDetail {
    exhibition;
    hasItems: boolean;
    items: Array<Object>;
    locked: boolean;

    constructor(public navCtrl: NavController,
                public alertCtrl: AlertController,
                public platform: Platform,
                public beaconProvider: BeaconProvider,
                public events: Events,
                public zone: NgZone,
                public changeDetector: ChangeDetectorRef,
                public navParams: NavParams,
                private service: ExhibitionsProvider,
                private storage: NativeStorage,
                private itemService: ItemsProvider ) {
    }

    ionViewDidLoad() {
      let exhibition = this.navParams.get('exhibition')

      this.platform.ready().then(() => {
        this.beaconProvider.initialise().then((isInitialised) => {
          if (isInitialised) {
            this.beaconProvider.listenToBeaconEvents(exhibition);
          }
        });
      });

      this.events.subscribe('goToItemDetail', (data) => {
        console.log('go to item detail se ha llamado')
        this.goToItemView(data.index)
      })

      this.events.subscribe('exhibitionUnlocked', (data) => {
        this.getExhibition(exhibition)
      })

      this.getExhibition(exhibition)
    }

    getExhibition(exhibition) {
      this.storage.getItem(exhibition.id).then(exhibition => {
        this.itemService.retrieveList(exhibition.id).subscribe(items => {
          this.hasItems = true
          this.items = items
        })
        this.zone.run(() => {
          setTimeout(() => {
            this.exhibition = exhibition
          }, 500)
        })
      })
    }

    goToMuseum(){
        this.navCtrl.push('MuseumDetail')
    }

    goToItemView(index) {
        let activePage = this.navCtrl.getActive().component.name
        if('ItemDetail' == activePage){
          this.events.publish('refreshItemPage', {index: index})
        }else{
          this.navCtrl.push('ItemDetail', {index: index, exhibitionId: this.exhibition.id})
        }
    }
}
