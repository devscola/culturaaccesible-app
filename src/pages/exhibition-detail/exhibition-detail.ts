import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, AlertController, NavParams, Events } from 'ionic-angular';
import { ExhibitionsProvider } from '../../providers/exhibitions/exhibitions';
import { ItemsProvider } from '../../providers/items/items'
import { BeaconProvider } from '../../providers/beacons/beacons'

@IonicPage()
@Component({
    selector: 'page-exhibition-detail',
    templateUrl: 'exhibition-detail.html',
})
export class ExhibitionDetail {
    exhibition;
    hasItems: boolean;
    items: Array<Object>;

    constructor(public navCtrl: NavController,
                public alertCtrl: AlertController,
                public platform: Platform,
                public beaconProvider: BeaconProvider,
                public events: Events,
                public navParams: NavParams,
                private service: ExhibitionsProvider,
                private itemService: ItemsProvider ) {
        this.exhibition = navParams.get("exhibition")

        itemService.retrieveList(this.exhibition.id).subscribe(items => {
          this.hasItems = true
          this.items = items
        })
    }

    ionViewDidLoad() {
      this.events.subscribe('goToItemDetail', (data) => {
        this.goToItemView(data.index)
      })
      this.platform.ready().then(() => {
        this.beaconProvider.initialise().then((isInitialised) => {
          if (isInitialised) {
            this.beaconProvider.listenToBeaconEvents(this.exhibition.id);
          }
        });
      });
    }

    goToMuseum(){
        this.navCtrl.push('MuseumDetail')
    }

    goToItemView(index) {
        let activePage = this.navCtrl.getActive().component.name
        if('ItemDetail' == activePage){
          this.navCtrl.pop()
        }
        this.navCtrl.push('ItemDetail', {index: index, exhibitionId: this.exhibition.id})
    }
}
