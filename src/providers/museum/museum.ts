import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { EnvVariables } from '../../app/environment-variables/environment-variables.token';

@Injectable()
export class MuseumProvider {
  museums: Array<Object>;

  constructor(public http: Http,
              @Inject(EnvVariables) private envVariables) {}

  retrieveList() {
      let url = `${this.envVariables.baseUrl}/api/museum/list`;
      return this.http.post(url, '').map(museums => museums.json())
  }

}
