import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MuseumProvider } from '../../providers/museum/museum'

@IonicPage()
@Component({
  selector: 'page-museum-detail',
  templateUrl: 'museum-detail.html',
})
export class MuseumDetail {
    museum: Object = {};
    coordinates;
    iosMapLink;
    hasLocation: boolean = false;
    fakeMuseum = {
        "name": "MUVIM",
        "street": "Quevedo 10",
        "postal": "46001",
        "city": "Valencia",
        "region": "Valencia",
        "link": "https://www.google.es/maps/place/MuVIM,+Museu+Valenci%C3%A0+de+la+Il%C2%B7lustraci%C3%B3+i+la+Modernitat/@39.4698131,-0.383297,17z/data=!3m1!4b1!4m5!3m4!1s0xd604f4f615718bb:0xccd4cfd7781d3a4f!8m2!3d39.4698131!4d-0.3811083",
        "schedule": [
        {
           "day": "MON",
           "hours": ["09:00-20:00", "09:00-20:00"]
        },
        {
           "day": "TUE",
           "hours": ["09:00-20:00", "09:00-20:00"]
        },
        {
           "day": "WED",
           "hours": ["09:00-20:00", "09:00-20:00"]
        },
        {
           "day": "THU",
           "hours": ["09:00-20:00", "09:00-20:00"]
        },
        {
           "day": "FRI",
           "hours": ["09:00-20:00", "09:00-20:00"]
        },
        {
            "day": "SAT",
            "hours": ["09:00-22:00", "09:00-22:00"]
        }
        ],
        "freeEntrance": ["Niños", "Sabados y festivos"],
        "general": ["10 euros"],
        "reduced": ["7 euros"],
        "phone": ["964001122", "964003344"],
        "email": ["muvim@museum.com"],
        "web": ["http://www.google.com"],
        "description": "Exposición permanente. Precisa de reserva previa."
    };

    constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private museumProvider: MuseumProvider) {
        this.museumProvider.retrieveList().subscribe(list => {
            this.museum = this.fakeMuseum;
            this.hasLocation = this.fakeMuseum.link.length > 0;
            this.coordinates = this.fakeMuseum.link.split('@')[1].split(',')[0] + ',' + this.fakeMuseum.link.split('@')[1].split(',')[1];
            this.iosMapLink = "http://maps.apple.com/?q=" + this.coordinates;
        })
    }

}
