import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, Platform, Events } from 'ionic-angular';
import { NgZone } from "@angular/core";

import { BeaconProvider } from '../../providers/beacons/beacons'

import { Beacon } from '../../models/beacon';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  beacons: Beacon[] = [];
  lastTriggeredBeaconNumber: number;
  zone: any;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public platform: Platform,
              public beaconProvider: BeaconProvider,
              public events: Events) {
    // required for UI update
    this.zone = new NgZone({ enableLongStackTrace: false });
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

      // update the UI with the beacon list
      this.zone.run(() => {

        this.beacons = [];

        let beaconList = data.beacons;
        beaconList.forEach((beacon) => {
          let beaconObject = new Beacon(beacon);
          this.beacons.push(beaconObject);
        });

        let closestBeacon = this.beacons.filter(beacon => beacon.proximity == 'ProximityNear' && beacon.rssi <= 45 && beacon.accuracy <= 2 )[0]
        if(closestBeacon && closestBeacon.minor != this.lastTriggeredBeaconNumber){
          console.log(closestBeacon.accuracy)
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
                  this.events.publish('startRanging')
                }
              }
            ]
          });
          alert.present();
          this.events.publish('stopRanging')
        }
      });

    });
  }

}
