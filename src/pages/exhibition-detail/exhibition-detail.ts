import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ExhibitionsProvider } from '../../providers/exhibitions/exhibitions';
import { ItemsProvider } from '../../providers/items/items'

@IonicPage()
@Component({
    selector: 'page-exhibition-detail',
    templateUrl: 'exhibition-detail.html',
})
export class ExhibitionDetail {
    exhibition;
    hasItems: boolean;
    items: Array<Object>;

    constructor(public navCtrl: NavController, public navParams: NavParams, private service: ExhibitionsProvider, private itemService: ItemsProvider ) {
        this.exhibition = navParams.get("exhibition")
        itemService.retrieveList(this.exhibition.id).subscribe(items => {
          this.hasItems = true
          this.items = items
        })
    }

    goToMuseum(){
        this.navCtrl.push('MuseumDetail')
    }

    goToItemView(item, index) {
        this.navCtrl.push('ItemDetail', {index: index, exhibitionId: this.exhibition.id})
    }
}
