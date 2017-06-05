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
  hasLocation: boolean = false;
  differentRegionCity: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private museumProvider: MuseumProvider) {}

    ionViewDidLoad() {
        this.museumProvider.retrieveList().subscribe(list => {
            this.museum = list[0];
            this.hasLocation = list[0].link;
            this.differentRegionCity = (list[0].city != list[0].region);
        })
    }

}
