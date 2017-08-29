import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, Events } from 'ionic-angular';
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
  zone: any;

  constructor(public navCtrl: NavController, public platform: Platform, public beaconProvider: BeaconProvider, public events: Events) {
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

      });

    });
  }

}
