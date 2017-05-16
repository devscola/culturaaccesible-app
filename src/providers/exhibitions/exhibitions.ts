import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ExhibitionsProvider {
  exhibitions: Array<Object>;

  constructor(private http: Http) {}

  retrieveList() {
    let url = 'http://localhost:4567/api/exhibition/list';
    return this.http.post(url, '').map(exhibitions => 
      exhibitions.json()
    )
  }
}
