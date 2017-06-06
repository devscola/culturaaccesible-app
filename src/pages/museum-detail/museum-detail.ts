import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MuseumProvider } from '../../providers/museum/museum'

@IonicPage()
@Component({
  selector: 'page-museum-detail',
  templateUrl: 'museum-detail.html',
})
export class MuseumDetail {
  museum: Object = {};
  coordinates;
  iosMapLink;
  hasLocation: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private museumProvider: MuseumProvider) {
    this.museumProvider.retrieveList().subscribe(list => {
      this.museum = list[0]
      this.hasLocation = list[0].link
      this.coordinates = list[0].link.split('@')[1].split(',')[0] + ',' + list[0].link.split('@')[1].split(',')[1]
      this.iosMapLink = "http://maps.apple.com/?q=" + this.coordinates
    })
  }

}
