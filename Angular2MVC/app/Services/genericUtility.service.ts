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
        return this._http.get(url+id)
            .map((response: Response) => <T>response.json())
            .catch(this.handleError);
    }

    getArray(url: string, id: string): Observable<T[]> {
        return this._http.get(url + id)
            .map((response: Response) => <T[]>response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
