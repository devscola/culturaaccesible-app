import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { EnvVariables } from '../../app/environment-variables/environment-variables.token';


@Injectable()
export class MuseumProvider {
  museums: Array<Object>;

  constructor(public http: Http,
              @Inject(EnvVariables) private envVariables) {}

  retrieveList() {
      let headers    = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
      let options    = new RequestOptions({ headers: headers });
      let url = `${this.envVariables.baseUrl}/api/museum/list`;
      let isoCode = navigator.language.split('-')[0]
      let payload = {"iso_code": isoCode}
      return this.http.post(url, payload,options).map(museums => museums.json())
  }

  retrieve(id, iso_code = navigator.language.split('-')[0]) {
      let url = `${this.envVariables.baseUrl}/api/museum/retrieve-translated`;
      let headers    = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
      let options    = new RequestOptions({ headers: headers });
      let payload = {"id": id, "iso_code": iso_code}
      return this.http.post(url, payload, options).map(museums => museums.json())
  }


}
