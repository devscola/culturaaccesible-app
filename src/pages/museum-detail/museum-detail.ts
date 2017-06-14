import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MuseumProvider } from '../../providers/museum/museum'
import { DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
    selector: 'page-museum-detail',
    templateUrl: 'museum-detail.html',
})
export class MuseumDetail {
    allMuseums: Array<Object>;
    info: Object = {};
    location: Object = {};
    price: Object = {};
    contact: Object = {};
    schedule: Object = {};
    coordinates;
    searchQuote;
    iosMapLink;
    iosGoogleMapLink;
    hasLocation: boolean = false;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private service: MuseumProvider,
        private domSanitizer: DomSanitizer) {

        this.service.retrieveList().subscribe( museums => {
            this.allMuseums = museums
            this.info = museums[0].info;
            this.location = museums[0].location;
            this.contact = museums[0].contact;
            this.price = museums[0].price;
            this.schedule = museums[0].schedule;

            this.hasLocation = this.location['link'].length > 0;
            this.composeMapLinks();
        });
    }

    extractSearchQuote() {
        this.searchQuote = this.location['link'].split('@')[0].split('/')[5];
    }

    extractCoordinates() {
        this.coordinates = this.location['link'].split('@')[1].split(',')[0] + ',' + this.location['link'].split('@')[1].split(',')[1];
    }

    composeMapLinks() {
        if (this.hasLocation) {
            this.extractSearchQuote();
            this.extractCoordinates();
        }
        this.iosMapLink = "http://maps.apple.com/?q=" + this.coordinates;
        this.iosGoogleMapLink = this.domSanitizer.bypassSecurityTrustResourceUrl("comgooglemaps://?q=" + this.searchQuote + "?center=" + this.coordinates + "&zoom=14&views=traffic")
    }

    goToExhibitions() {
        this.navCtrl.push('ExhibitionList');
    }

    hasContent(data) {
        if(typeof(data) == 'object') {
            var keys = Object.keys(data)
            keys.forEach(function(key) {
                if (data[key] !== '' && data[key] !== []) {
                    return true;
                }
            });
            return false;
        }
        return (data.length !== 0);
    }

}
