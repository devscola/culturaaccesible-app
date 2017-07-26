import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemsProvider } from '../../providers/items/items'

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html',
})
export class ItemDetail {
  index = 0;
  items;
  item;
  fromExhibitionItem;
  video;
  action = 'play';

  constructor(public navCtrl: NavController, public navParams: NavParams, private service: ItemsProvider) {
    this.fromExhibitionItem = navParams.get("item")
    if(this.fromExhibitionItem) {
      this.item = this.fromExhibitionItem
    } else {
      service.retrieveList('fakeExhibitionId').subscribe(items => {
        this.items = items
        this.item = items[this.index]
      })

    }
  }

  ionViewDidLoad() {
    this.video = document.getElementById("video");
  }

  play() {
    this.video.play()
    this.action = 'pause'
  }

  pause() {
    this.video.pause()
    this.action = 'play'
  }

  togglePlay() {
    if(this.video.paused === true){
      this.play()
    } else {
      this.pause()
    }
  }

  goToNextItem(){
    this.index += 1
    this.item = this.items[this.index]
  }

  goToPreviewItem(){
    this.index -= 1
    this.item = this.items[this.index]
  }

}
