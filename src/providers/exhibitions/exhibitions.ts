import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
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

    retrieve(id) {
        let headers    = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let options    = new RequestOptions({ headers: headers });
        let url = `${this.envVariables.baseUrl}/api/exhibition/retrieve`;
        let payload = {"id": id}
        return this.http.post(url, payload, options).map(exhibitions =>
            exhibitions.json()
        )
    }

    download(id, isoCode) {
        let headers    = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let options    = new RequestOptions({ headers: headers });
        let url = `${this.envVariables.baseUrl}/api/exhibition/download`;
        let payload = {"id": id, "iso_code": isoCode}
        return this.http.post(url, payload, options).map(exhibitions =>
            exhibitions.json()
        )
    }
}
