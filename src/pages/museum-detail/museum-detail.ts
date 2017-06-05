import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MuseumProvider } from '../../providers/museum/museum'

@IonicPage()
@Component({
  selector: 'page-museum-detail',
  templateUrl: 'museum-detail.html',
})
export class MuseumDetail {
  museum;
  coordinates;
  iosMapLink;
  hasLocation: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private museumProvider: MuseumProvider) {
    this.museumProvider.retrieveList().subscribe(list => {
      this.museum = list[0]
      this.hasLocation = this.museum.link
      this.coordinates = this.museum.link.split('@')[1].split(',')[0] + this.museum.link.split('@')[1].split(',')[1]
      this.iosMapLink = "http://maps.apple.com/?q=" + this.coordinates
      console.log(this.coordinates)
    })
  }

}
