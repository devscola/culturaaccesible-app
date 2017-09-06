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
  zone: any;
  lastTriggeredBeaconNumber: number;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public platform: Platform,
              public beaconProvider: BeaconProvider,
              public events: Events) {
    // required for UI update
    this.zone = new NgZone({ enableLongStackTrace: false });
  }

}
