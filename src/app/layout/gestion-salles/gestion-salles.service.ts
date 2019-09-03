import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//import { Utilisateur } from './utilisateur';
import {CONFIG} from "../../config";
import * as decode from 'jwt-decode';



@Injectable()
export class SalleService {
    url5: string = CONFIG.URL + CONFIG.apiPath + 'salle/remove';
    deleteSalle(idsalle: any): any {
        //console.log(username);
        let headers = new Headers({'Content-Type': 'application/json'});
        this.createAuthorizationHeader(headers);
        return this._http.post(this.url5, idsalle, {headers: headers})
            .map(response => response.json()).catch(this.handleError)
            ;
    }
    archiver(idsalle: any): any {
        //console.log(username);
        let headers = new Headers({'Content-Type': 'application/json'});
        this.createAuthorizationHeader(headers);
        let url =CONFIG.URL + CONFIG.apiPath + 'salle/archiver';
        return this._http.post(url, idsalle, {headers: headers})
            .map(response => response.json()).catch(this.handleError)
            ;
    }
    constructor(private _http: Http) {
       
    }
    createAuthorizationHeader(headers: Headers) {
        var token = localStorage.getItem('token');
        headers.append('Authorization', 'Bearer ' + token);
    }

     // Add  user
     url2: string = CONFIG.URL + CONFIG.apiPath + 'salle/add';
  
     addSalle(nomSalle: string, type: string, remarque: string,username:any): Observable<any[]> {
    let headers = new Headers({'Content-Type': 'application/json'});
    this.createAuthorizationHeader(headers);
    console.log(this.url2, JSON.stringify({
        nomSalle: nomSalle, type: type, remarque: remarque,username:username}));
    return this._http.post(this.url2, JSON.stringify({
        nomSalle: nomSalle, type: type, remarque: remarque,username:username
        } || null)
        , {headers: headers})
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

    url: string = CONFIG.URL + CONFIG.apiPath + 'salle/all';

    getAllSalles(): Observable<any[]> {
        var decoded = decode(localStorage.getItem('token'));
        let username = decoded.sub;
        
      //  let url = CONFIG.URL + CONFIG.apiPath + 'matiere/all'+'?username='+username;
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        let url =CONFIG.URL + CONFIG.apiPath + 'salle/all/'+'?username='+username;
        return this._http.get(url, {headers: headers})
            .map(res => res.json())
            .catch(this.handleError);
    }

    url4: string = CONFIG.URL + CONFIG.apiPath + 'salle/update';

    editSalle(nomSalle: string, type: string, remarque: string): Observable<any[]> {
        let headers = new Headers({'Content-Type': 'application/json'});
        this.createAuthorizationHeader(headers);
        return this._http.post(this.url4, JSON.stringify({
            nomSalle: nomSalle, type: type, remarque: remarque
        } || null), {headers: headers})
            .map(response => response.json()).catch(this.handleError)
            ;
    }
}