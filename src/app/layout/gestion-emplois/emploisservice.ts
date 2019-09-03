import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//import { Utilisateur } from './utilisateur';
import {CONFIG} from "../../config";
import {GenericService} from "../../shared/services/GenericService";
import { Classes } from '../gestion-classes/classes';
import { Heures } from './heures';
import { Jour } from './jour';
import { User } from '../gestion-utilisateurs/user';
import { Matiere } from '../gestion-matieres/matiere';

@Injectable()
export class EmploisService {


    constructor(private _http: Http) {
   
    }
    createAuthorizationHeader(headers: Headers) {
        var token = localStorage.getItem('token');
        headers.append('Authorization', 'Bearer ' + token);
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
    url: string = CONFIG.URL + CONFIG.apiPath + 'emplois/allJours';
    getAllJours(): Observable<any[]> {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this._http.get(this.url, {headers: headers})
            .map(res => res.json())
            .catch(this.handleError);
    }
    urlsemaine: string = CONFIG.URL + CONFIG.apiPath + 'emplois/allsemaine';
    getAllSemaine(): Observable<any[]> {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this._http.get(this.urlsemaine, {headers: headers})
            .map(res => res.json())
            .catch(this.handleError);
    }
    url1: string = CONFIG.URL + CONFIG.apiPath + 'emplois/allheures';
    getAllHeures(): Observable<any[]> {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this._http.get(this.url1, {headers: headers})
            .map(res => res.json())
            .catch(this.handleError);
    }
    url10: string = CONFIG.URL + CONFIG.apiPath + 'user/prof';
    getAllProf(): Observable<any[]> {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this._http.get(this.url10, {headers: headers})
            .map(res => res.json())
            .catch(this.handleError);
    }




    url2: string = CONFIG.URL + CONFIG.apiPath + 'emplois/add';
    add(nomclasse: string, nomsalle: string, nommatiere: string,heure : Heures,jour :string,prof :any,typeprog : any,semaine:any): Observable<any[]> {
    let headers = new Headers({'Content-Type': 'application/json'});
    this.createAuthorizationHeader(headers);
    console.log(this.url2, JSON.stringify({
        nomclasse: nomclasse, nomsalle: nomsalle, nommatiere: nommatiere,heure :heure ,jour :jour ,prof :prof,typeprog:typeprog,semaine:semaine}));
    return this._http.post(this.url2, JSON.stringify({
        nomclasse: nomclasse, nomsalle: nomsalle, nommatiere: nommatiere,heure :heure ,jour :jour ,prof :prof,typeprog:typeprog,semaine:semaine
        } || null)
        , {headers: headers})
        .map(response => response.json()).catch(this.handleError)
        ;
}
}