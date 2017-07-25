import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { EnvVariables } from '../../app/environment-variables/environment-variables.token';

@Injectable()
export class ItemsProvider {

  constructor(public http: Http,
              @Inject(EnvVariables) private envVariables) {
  }

  retrieveList(exhibition_id) {
      let headers    = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
      let options    = new RequestOptions({ headers: headers });
      let url = `${this.envVariables.baseUrl}/api/exhibition/items`;
      let payload = {"exhibition_id": exhibition_id}
      return this.http.post(url, payload, options).map(items => items.json())
  }

}
