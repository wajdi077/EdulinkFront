import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//import { Utilisateur } from './utilisateur';
import {CONFIG} from "../../config";
import {GenericService} from "../../shared/services/GenericService";

@Injectable()
export class SemaineService {
    url5: string = CONFIG.URL + CONFIG.apiPath + 'salle/remove';
    deleteSalle(nomSalle: any): any {
        //console.log(username);
        let headers = new Headers({'Content-Type': 'application/json'});
        this.createAuthorizationHeader(headers);
        return this._http.post(this.url5, nomSalle, {headers: headers})
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
     url2: string = CONFIG.URL + CONFIG.apiPath + 'annee/add';
  
     addsemaine(semaine: string, datedebut: any, datefin: any): Observable<any[]> {
    let headers = new Headers({'Content-Type': 'application/json'});
    this.createAuthorizationHeader(headers);
    console.log(this.url2, JSON.stringify({
        semaine: semaine, datedebut: datedebut, datefin: datefin}));
    return this._http.post(this.url2, JSON.stringify({
        semaine: semaine, datedebut: datedebut, datefin: datefin
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

    url: string = CONFIG.URL + CONFIG.apiPath + 'annee/allsemaine';

    getAllSemaine(): Observable<any[]> {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this._http.get(this.url, {headers: headers})
            .map(res => res.json())
            .catch(this.handleError);
    }

    url4: string = CONFIG.URL + CONFIG.apiPath + 'annee/allsemaine';

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