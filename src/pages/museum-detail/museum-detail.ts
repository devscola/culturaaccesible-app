import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MuseumProvider } from '../../providers/museum/museum'
import { DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
    selector: 'page-museum-detail',
    templateUrl: 'museum-detail.html',
})
export class MuseumDetail {
    info: Object = {};
    location: Object = {};
    price: Object = {};
    contact: Object = {};
    schedule: Object = {};
    coordinates;
    searchQuote;
    iosMapLink;
    iosGoogleMapLink;
    validMapLink: boolean = false;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private loadingCtrl: LoadingController,
        private service: MuseumProvider,
        private domSanitizer: DomSanitizer) {

        let loading = this.loadingCtrl.create({
            content: '...'
        });

        loading.present()

        this.service.retrieve(this.navParams.get('id')).subscribe(museum => {
            this.setInfo(museum)
            this.composeMapLinks()
            loading.dismiss()
        });
    }

    setInfo(museum){
        this.info = museum.info;
        this.location = museum.location;
        this.contact = museum.contact;
        this.price = museum.price;
        this.schedule = museum.schedule;
    }

    extractSearchQuote() {
        this.searchQuote = this.location['link'].split('@')[0].split('/')[5];
    }

    extractCoordinates() {
        this.coordinates = this.location['link'].split('@')[1].split(',')[0] + ',' + this.location['link'].split('@')[1].split(',')[1];
    }

    composeMapLinks() {
        if (this.location['link'].substring(0, 27) == "https://www.google.es/maps/") {
            this.extractSearchQuote();
            this.extractCoordinates();
            this.iosMapLink = "http://maps.apple.com/?q=" + this.coordinates;
            this.iosGoogleMapLink = this.domSanitizer.bypassSecurityTrustResourceUrl("comgooglemaps://?q=" + this.searchQuote + "?center=" + this.coordinates + "&zoom=14&views=traffic")
        }
    }

    goToExhibitions() {
        this.navCtrl.push('ExhibitionList');
    }

    hasContent(data) {
            let content = false;
            if (data.constructor.name == 'Object') {
                content = this.objectHasContent(data);
            } else {
                content = data.length !== 0;
            }
            return content;
        }

    objectHasContent(object) {
        let content = false;
        let keys = Object.keys(object)
        keys.forEach(function(key) {
            if (object[key].length > 0) {
                content = true;
            }
        });
        return content;
    }

}
