import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { BCConstants } from '../constants/bc.constants';

@Injectable()
export class LoginService {

    accessToken = '';

    constructor(private http: Http) {}

    setAccessToken(token: string) {
        this.accessToken = token;
    }

    login(): Promise<any> {
        return Promise.resolve(this.http.get('https://api.github.com')
            .toPromise()
            .then(response => response.json())
            .catch((error) => {
                return Promise.reject(error.message || error);
            }));
    }
    loginUser(username: string, password: string): Promise<any> {
        return Promise.resolve(this.http.get(BCConstants.LOGIN)
            .toPromise()
            .then(response => response.json())
            .catch((error) => {
                return Promise.reject(error.message || error);
            }));
    }
}
