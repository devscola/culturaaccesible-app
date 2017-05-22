import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ExhibitionsProvider } from '../../providers/exhibitions/exhibitions';
import { ExhibitionDetail } from '../exhibition-detail/exhibition-detail'

@IonicPage()
@Component({
    selector: 'page-exhibition-list',
    templateUrl: 'exhibition-list.html',
})
export class ExhibitionList {
    exhibitions: Array<Object>
    allExhibitions: Array<Object>

    constructor(public navCtrl: NavController, public navParams: NavParams, private service: ExhibitionsProvider) {
        this.service.retrieveList().subscribe(exhibitions => {
            this.allExhibitions = exhibitions
            this.filterExhibitions()
        })
    }

    filterExhibitions() {
        let activeExhibitions: Array<Object> = []

        for (let exhibition of this.allExhibitions) {
            if (exhibition['show']) {
                activeExhibitions.push(exhibition)
            }
        }
        this.exhibitions = activeExhibitions
    }

    goToDetail(exhibition) {
        this.navCtrl.push(ExhibitionDetail, {exhibition: exhibition})
    }
}
