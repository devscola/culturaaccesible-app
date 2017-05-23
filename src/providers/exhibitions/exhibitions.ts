import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { EnvVariables } from '../../app/environment-variables/environment-variables.token';

@Injectable()
export class ExhibitionsProvider {
    exhibitions: Array<Object>;

    constructor(private http: Http,
                @Inject(EnvVariables) private envVariables) {}

    retrieveList() {
        let url = `${this.envVariables.baseUrl}/api/exhibition/list`;
        return this.http.post(url, '').map(exhibitions =>
            exhibitions.json()
        )
    }
}
