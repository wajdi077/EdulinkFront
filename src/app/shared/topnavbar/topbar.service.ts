import {Injectable} from '@angular/core';
import {Headers, RequestOptions, Http} from '@angular/http';
import {HttpClient, HttpRequest, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {CONFIG} from "../../config";

// import {THROW_ERROR} from './error.handle';

@Injectable()
export class TopbarService {


    constructor(private http: HttpClient,private _http: Http) {
    }

 
    getnotifsbyday(): Observable<any[]> {
        let headers = new Headers();
        let url = CONFIG.URL + CONFIG.apiPath + 'note/allnotesbynow';
      
        return this._http.get(url, {headers: headers})
        .map(res => res.json())
        .catch(this.handleError);
        
          
      }

  

  
    protected handleError(error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || error || '';
            const err = body['error'] || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
