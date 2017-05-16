import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ExhibitionsProvider {

  constructor(public http: Http) {
    console.log('PROVIDER');
  }

  retrieveList() {
    [{name: 'some exhibition'}, {name: 'some other exhibition'}]
  }
}
