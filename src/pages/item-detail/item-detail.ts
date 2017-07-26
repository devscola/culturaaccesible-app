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
  previousButton;
  nextButton;
  items;
  item;
  video;
  action = 'play';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private service: ItemsProvider) {
    service.retrieveList('fakeExhibitionId').subscribe(items => {
      if(items.length > 1){
        items[1].media_file = "https://s3.amazonaws.com/pruebas-cova/more3minutes.mp4"
      }
      this.items = items
      this.item = items[this.index]
      if(items.length <= 1)  {
        this.nextButton.disabled = true
      }
    })
  }

  ionViewDidLoad() {
    this.video = document.getElementsByTagName("video")[0];
    this.previousButton = document.getElementsByClassName('previous')[0]
    if(this.index == 0)  {
      this.previousButton.disabled = true
    }
    this.nextButton = document.getElementsByClassName('next')[0]
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
    this.previousButton.disabled = false
    if (this.items.length - 1 == this.index) {
      this.nextButton.disabled = true
    }
    this.action = 'play'
    this.item = this.items[this.index]
    this.video.load()
  }

  goToPreviewItem(){
    this.index -= 1
    this.nextButton.disabled = false
    if (this.index == 0) {
      this.previousButton.disabled = true
    }
    this.action = 'play'
    this.item = this.items[this.index]
    this.video.load()
  }

}
