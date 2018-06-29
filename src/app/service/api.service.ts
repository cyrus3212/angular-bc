import { SORT, IMPORT_TYPES } from '../common/helper';
import {HttpParams, HttpHeaders,  HttpErrorResponse, HttpClient, HttpResponse, HttpEventType, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
// Constants
import { BCConstants } from '../constants/bc.constants';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiService {
    headers;
    formData;
    authorizationData;

    constructor(private http: Http, private httpClient: HttpClient) {}
    setHeaders (value: Object): void {
        this.headers = new HttpHeaders();
        for (const key in value) {
            if (value[key]) {
                this.headers.set(key, value[key]);
            }
        }
    }
    setFormBodyData(value: Object): void {
        this.formData = new FormData();
        for (const key in value) {
            if (value[key]) {
                this.formData.append(key, value[key]);
            }
        }
    }
    /**
     * set authentication data
     * @param token
     */
    setAuthData(token: any, save: boolean) {
        this.authorizationData = token;
        if (save) {
            localStorage.setItem(BCConstants.USER_DATA, JSON.stringify(token));
        }
        this.setHeaders({
            accept: 'application/json',
            authorization: this.getAuthData().token
        });
    }
    /**
     * get stored authentication data
     */
    getAuthData(): any {
        // TODO: add fallback for picking up empty stored data from localstorage if non exist.
        // console.log('AUTH');
        // console.log(this.authorizationData);
        return this.authorizationData;
    }
    /**
     * Test Api Request via github api
     */
    test(): Promise<any> {
        return Promise.resolve(this.http.get('https://api.github.com')
            .toPromise()
            .then(response => response.json())
            .catch((error) => {
                return Promise.reject(error.message || error);
            }));
    }
    /**
     * @param email
     * @param password
     */
    login(email: string, password: string): Observable<any> {
        const params = {
            email: email,
            password: password
        };
        // 'https://api.github.com'
        const request = new HttpRequest('POST', BCConstants.LOGIN, params, {
            reportProgress: true, responseType: 'json'
        });
        return this.httpClient.request(request);
    }
    createNewPromo(data: any): Promise<any> {
        return Promise.resolve(this.http.post(BCConstants.CREATE_PROMO, data)
            .toPromise()
            .then(response => response.json())
            .catch((error) => {
                return Promise.reject(error.message || error);
            }));
    }
    // tslint:disable-next-line:max-line-length
    getAllPromotions (page: number, pageSize: number, status: number, promoType: number, dateSort: number, promoIdSort: number, promoNameSort: number, typeSort: number): Promise<any> {
        const params = {
            count: pageSize,
            page: page
        };
        let url = BCConstants.GET_PROMOS + '?page=' + page + '&count=' + pageSize + '&status=' + status + '&sort=published_at:desc';
        if (promoType > 0) {
            url += '&type=' + promoType;
        }
        let filter = '';
        if (dateSort === SORT.ASC) {
            filter += 'published_at:asc';
        } else if (dateSort === SORT.DESC) {
            filter += 'published_at:desc';
        }
        if (promoIdSort === SORT.ASC) {
            filter += (filter.length > 0) ? ':promo_id:asc' : 'promo_id:asc';
        } else if (promoIdSort === SORT.DESC) {
            filter += (filter.length > 0) ? ':promo_id:desc' : 'promo_id:desc';
        }
        if (promoNameSort === SORT.ASC) {
            filter += (filter.length > 0) ? ':title:asc' : 'title:asc';
        } else if (promoNameSort === SORT.DESC) {
            filter += (filter.length > 0) ? ':title:desc' : 'title:desc';
        }
        if (typeSort === SORT.ASC) {
            filter += (filter.length > 0) ? ':type:asc' : 'type:asc';
        } else if (typeSort === SORT.DESC) {
            filter += (filter.length > 0) ? ':type:desc' : 'type:desc';
        }
        if (filter.length > 0) {
            url += '&sort=' + filter;
        }
        console.log(url);
        return Promise.resolve(this.http.get(url)
            .toPromise()
            .then(response => response.json())
            .catch((error) => {
                return Promise.reject(error.message || error);
            }));
    }
    getAllRewards(): Observable<any> {
        return this.httpClient.request(new HttpRequest('GET', BCConstants.GET_REWARDS));
    }
    uploadImage(e): Observable<any> {
        if (e.srcElement.files.length) {
            this.setFormBodyData({
                file: e.srcElement.files[0]
            });
            const r = new HttpRequest('POST', BCConstants.UPLOAD_IMAGE, this.formData, {
                headers: this.headers,
                reportProgress: true
            });
            return this.httpClient.request(r);
        }
        return Observable.of({error: 'No file selected.'});
    }
    importCollection(type: string): Observable<any> {
        let params = {};
        switch (type) {
            case IMPORT_TYPES.CARD_PROFILE:
                params = {
                    type: type
                };
                break;
            default:
                return Observable.of({error: 'No file selected.'});
        }
        const req = new HttpRequest('POST', BCConstants.IMPORT, params, {
            headers: this.headers,
            reportProgress: true
        });
        return this.httpClient.request(req);
    }
}
