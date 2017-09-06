import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, AlertController, NavParams, Events } from 'ionic-angular';
import { ExhibitionsProvider } from '../../providers/exhibitions/exhibitions';
import { ItemsProvider } from '../../providers/items/items'
import { BeaconProvider } from '../../providers/beacons/beacons'

import { Beacon } from '../../models/beacon';


@IonicPage()
@Component({
    selector: 'page-exhibition-detail',
    templateUrl: 'exhibition-detail.html',
})
export class ExhibitionDetail {
    exhibition;
    hasItems: boolean;
    items: Array<Object>;
    beacons: Beacon[] = [];
    lastTriggeredBeaconNumber: number;

    constructor(public navCtrl: NavController,
                public alertCtrl: AlertController,
                public platform: Platform,
                public beaconProvider: BeaconProvider,
                public events: Events,
                public navParams: NavParams,
                private service: ExhibitionsProvider,
                private itemService: ItemsProvider ) {
        this.exhibition = navParams.get("exhibition")

        itemService.retrieveList(this.exhibition.id).subscribe(items => {
          this.hasItems = true
          this.items = items
        })

        events.subscribe('goToItemDetail', (data) => {
          this.goToItemView(data.item, data.index)
        })
    }

    ionViewDidLoad() {
      this.platform.ready().then(() => {
        this.beaconProvider.initialise().then((isInitialised) => {
          if (isInitialised) {
            this.listenToBeaconEvents();
          }
        });
      });
    }

    listenToBeaconEvents() {
      this.events.subscribe('didRangeBeaconsInRegion', (data) => {

        this.beacons = [];

        let beaconList = data.beacons;
        beaconList.forEach((beacon) => {
          let beaconObject = new Beacon(beacon);
          this.beacons.push(beaconObject);
        });

        let closestBeacon = this.beacons.filter(beacon => beacon.proximity == 'ProximityImmediate')[0]
        if(closestBeacon && closestBeacon.minor != this.lastTriggeredBeaconNumber){
          this.lastTriggeredBeaconNumber = closestBeacon.minor
          let alert = this.alertCtrl.create({
            title: 'You are close to artwork ' + closestBeacon.minor,
            message: 'Do you want to know more?',
            buttons: [
              {
                text: 'No',
                role: 'cansel',
                handler: () => {
                  this.events.publish('startRanging')
                  console.log('Cancel clicked');
                  }
                },
                {
                text: 'Yes',
                handler: () => {
                  this.retrieveItemByBeacon(closestBeacon.minor)
                  this.events.publish('startRanging')
                }
              }
            ]
          });
          alert.present();
          this.events.publish('stopRanging')
        }
      });
    }

    retrieveItemByBeacon(beaconNumber) {
      this.events.publish('retrieveItemByBeacon', {beaconNumber: beaconNumber, exhibitionId: this.exhibition.id})
    }

    goToMuseum(){
        this.navCtrl.push('MuseumDetail')
    }

    goToItemView(item, index) {
        this.navCtrl.push('ItemDetail', {index: index, exhibitionId: this.exhibition.id})
    }
}
