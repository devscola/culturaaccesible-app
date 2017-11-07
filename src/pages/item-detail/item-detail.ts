import { Component, NgZone } from '@angular/core';
import { Platform, Events, IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';
import { ItemsProvider } from '../../providers/items/items'
import { BeaconProvider } from '../../providers/beacons/beacons'
import { NativeStorage } from '@ionic-native/native-storage';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html',
})
export class ItemDetail {
  position = 0;
  previousButton;
  nextButton;
  exhibitionId;
  items;
  item;
  fromExhibitionItem;
  video;
  action = 'play';
  ngZone;

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public platform: Platform,
              public events: Events,
              public storage: NativeStorage,
              public beaconProvider: BeaconProvider,
              public navParams: NavParams,
              private service: ItemsProvider) {
    this.ngZone = new NgZone({enableLongStackTrace: false})

    events.subscribe('refreshItemPage', (data) => {
      this.item = null

      this.ngZone.run(() => {
        setTimeout(() => {
          this.position = data.index
          this.item = this.items[this.position]
          this.enableNavButtons()
          this.disableIfFirstItem()
          this.disableIfLastItem()
        }, 100)
      })
    })

    events.subscribe('stopVideo', (data) => {
      this.viewCtrl.dismiss()
    })
  }

  ionViewDidLoad() {
    this.exhibitionId = this.navParams.get("exhibitionId")
    let index = this.navParams.get("index")

    if(index){
      this.position = index
    }

    this.storage.getItem(this.exhibitionId).then(exhibition => {
      if(exhibition.items.length > 0){
        this.items = exhibition.items
        this.item = this.items[this.position]
        this.item.video = 'file:///var/mobile/Containers/Data/Application/F6A9497A-3862-46BA-A7F4-80AE3F85554B/Library/NoCloud/video-fasfd.mp4'
        this.disableIfFirstItem()
        this.disableIfLastItem()
      }
    })

    this.video = document.getElementsByTagName("video")[0];
    this.previousButton = document.getElementsByClassName('previous')[0]
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

  enableNavButtons() {
    this.previousButton.disabled = false
    this.nextButton.disabled = false
  }

  disableIfLastItem() {
    if(this.items.length - 1 == this.position) {
      this.nextButton.disabled = true
    }
  }

  disableIfFirstItem(){
    if(this.position == 0)  {
      this.previousButton.disabled = true
    }
  }

  goToNextItem(){
    this.position += 1
    this.previousButton.disabled = false
    this.disableIfLastItem()
    this.action = 'play'
    this.item = this.items[this.position]
    this.video.load()
  }

  goToPreviewItem(){
    this.position -= 1
    this.nextButton.disabled = false
    this.disableIfFirstItem()
    this.action = 'play'
    this.item = this.items[this.position]
    this.video.load()
  }

}
