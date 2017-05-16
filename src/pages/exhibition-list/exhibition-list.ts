import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ExhibitionsProvider } from '../../providers/exhibitions/exhibitions'


@IonicPage()
@Component({
  selector: 'page-exhibition-list',
  templateUrl: 'exhibition-list.html',
})
export class ExhibitionList {
  exhibitions: Array<Object>

  constructor(public navCtrl: NavController, public navParams: NavParams, private service: ExhibitionsProvider) {
    this.exhibitions = this.service.retrieveList();
  }
}
