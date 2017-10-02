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
    hasItems: boolean = false;
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

        let exhibition = navParams.get('exhibition')

        platform.ready().then(() => {
          if(!beaconProvider.isInitialized){
            beaconProvider.initialise().then((isInitialised) => {
              if (isInitialised) {
                beaconProvider.listenToBeaconEvents(exhibition);
                beaconProvider.isInitialized = true
              }
            });
          }
        });
    }

    ionViewWillEnter() {
      let exhibition = this.navParams.get('exhibition')
      this.events.subscribe('goToItemDetail', (data) => {
        this.goToItemView(data.index)
      })

      this.events.subscribe('exhibitionUnlocked', (data) => {
        this.unlockExhibition(exhibition)
      })

      this.getExhibition(exhibition)
    }

    ionViewWillLeave() {
      this.events.unsubscribe('goToItemDetail')
      this.events.unsubscribe('exhibitionUnlocked')
    }

    getExhibition(exhibition) {
      this.storage.getItem(exhibition.id).then(exhibition => {
        this.exhibition = exhibition
        if(exhibition.items.length > 0){
          this.items = exhibition.items
          this.hasItems = true
        }
      })
    }

    unlockExhibition(exhibition) {
      this.storage.getItem(exhibition.id).then(exhibition => {
        this.zone.run(() => {
          this.exhibition = null
          this.exhibition = exhibition
          if(exhibition.items.length > 0){
            this.items = exhibition.items
            this.hasItems = true
          }
          this.beaconProvider.exhibition = exhibition
        });
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
