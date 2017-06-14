import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ExhibitionsProvider } from '../../providers/exhibitions/exhibitions';

@IonicPage()
@Component({
    selector: 'page-exhibition-detail',
    templateUrl: 'exhibition-detail.html',
})
export class ExhibitionDetail {
    exhibition;

    constructor(public navCtrl: NavController, public navParams: NavParams, private service: ExhibitionsProvider) {
        this.exhibition = navParams.get("exhibition")
    }

    goToMuseum(){
        this.navCtrl.push('MuseumDetail')
    }
}
