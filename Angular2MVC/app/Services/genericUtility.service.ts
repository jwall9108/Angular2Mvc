import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';


@Injectable()
export class GenericUtilityService<T> {
    constructor(private _http: Http) { }

    get(url: string, id: string): Observable<T> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.get(url + id, options)
            .map((response: Response) => <T>response.json())
            .catch(this.handleError);
    } 

    getArray(url: string, id: string): Observable<T[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.get(url + id, options)
            .map((response: Response) => <T[]>response.json())
            .catch(this.handleError);
    }

    delete(url: string, id: number): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.delete(url + id, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    post(url: string, model: T): Observable<any> {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(url, body, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    put(url: string, id: number, model: any): Observable<any> {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.put(url + id, body, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
