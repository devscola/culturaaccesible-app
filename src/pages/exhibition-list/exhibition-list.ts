import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ExhibitionsProvider } from '../../providers/exhibitions/exhibitions';

@IonicPage()
@Component({
    selector: 'page-exhibition-list',
    templateUrl: 'exhibition-list.html',
})
export class ExhibitionList {
    exhibitions: Array<Object>
    allExhibitions: Array<Object>
    hasExhibitions: boolean

    constructor(public navCtrl: NavController, public navParams: NavParams, private service: ExhibitionsProvider) {
        this.service.retrieveList().subscribe(exhibitions => {
            if(exhibitions.length > 0){
                this.hasExhibitions = true
                this.allExhibitions = exhibitions
                this.filterExhibitions()
            }else {
                this.showNoExhibitionMessage()
            }
        })
    }

    showNoExhibitionMessage() {
        this.hasExhibitions = false
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
        this.navCtrl.push('ExhibitionDetail', {exhibition: exhibition})
    }
}
