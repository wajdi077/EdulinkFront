import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//import { Utilisateur } from './utilisateur';
import {CONFIG} from "../../config";

@Injectable()
export class SitesService {


    // We need Http to talk to a remote server.
    constructor(private _http: Http) {
    }


    createAuthorizationHeader(headers: Headers) {
        var token = localStorage.getItem('token');
        headers.append('Authorization', 'Bearer ' + token);
    }


    // Get all salariers
    url: string = CONFIG.URL + CONFIG.apiPath + 'site/getall';

    getSites(): Observable<any[]> {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this._http.get(this.url, {headers: headers})
            .map(res => res.json())
            .catch(this.handleError);
    }

    // Add  user

    url2: string = CONFIG.URL + CONFIG.apiPath + 'user/sites/notused?username=';

    getUsersOutSites(id: string): Observable<any[]> {
        //let params = new HttpParams().set("id",id);
        let headers = new Headers({'Content-Type': 'application/json'});
        this.createAuthorizationHeader(headers);
        return this._http.get(this.url2 + id, {headers: headers/*, params: params*/})
            .map(response => response.json()).catch(this.handleError)
            ;
    }

    // update  site
    url4: string = CONFIG.URL + CONFIG.apiPath + 'user/sites/update';

    updateSiteUsers(username: string, newSites: any[]): Observable<any[]> {
        let headers = new Headers({'Content-Type': 'application/json'});
        this.createAuthorizationHeader(headers);
        return this._http.post(this.url4, JSON.stringify({
            username: username,
            sites: newSites
        } || null), {headers: headers})
            .map(response => response.json().sitesnames).catch(this.handleError)
            ;
    }

    // delete  user's sites
    url5: string = CONFIG.URL + CONFIG.apiPath + 'site/remove';

    deleteUser(username: string[]): Observable<any[]> {
        console.log(username);
        let headers = new Headers({'Content-Type': 'application/json'});
        this.createAuthorizationHeader(headers);
        return this._http.post(this.url5, username, {headers: headers})
            .map(response => response.json()).catch(this.handleError)
            ;
    }


    private handleError(error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
