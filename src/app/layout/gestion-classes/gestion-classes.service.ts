import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//import { Utilisateur } from './utilisateur';
import {CONFIG} from "../../config";
import {GenericService} from "../../shared/services/GenericService";

import { Eleve } from '../gestion-eleves/eleve';
import { ClassesDesEleves } from './gestion-affectationeleves/classedeseleve';
import { Classes } from './classes';
import * as decode from 'jwt-decode';
@Injectable()
export class ClassesService {
    url5: string = CONFIG.URL + CONFIG.apiPath + 'class/remove';

    // delete object 
    delete(nomclasse: string[]): Observable<any[]>{

        let headers = new Headers({'Content-Type': 'application/json'});
        this.createAuthorizationHeader(headers);
        return this._http.post(this.url5, nomclasse, {headers: headers})
            .map(response => response.json()).catch(this.handleError)
            ;
    }
    findById(id:any):Observable<Classes>{
     
        let url6=  CONFIG.URL + CONFIG.apiPath + 'class/byid' +'?id='+id
           let headers = new Headers({'Content-Type': 'application/json'});
           this.createAuthorizationHeader(headers);
           return this._http.get(url6, {headers: headers})
           .map(res => res.json())
           .catch(this.handleError);
           
       }
    archiver(nomclasse: string[]): Observable<any[]>{
        var decoded = decode(localStorage.getItem('token'));
        let username = decoded.sub;
       let  url5= CONFIG.URL + CONFIG.apiPath + 'class/archiver'+'?username='+username;
        let headers = new Headers({'Content-Type': 'application/json'});
        this.createAuthorizationHeader(headers);
        return this._http.post(this.url5, nomclasse, {headers: headers})
            .map(response => response.json()).catch(this.handleError)
            ;
    }
    constructor(private _http: Http) {
     
    }
    createAuthorizationHeader(headers: Headers) {
        var token = localStorage.getItem('token');
        headers.append('Authorization', 'Bearer ' + token);
    }

     // **************Service Add  Classe******************
     url2: string = CONFIG.URL + CONFIG.apiPath + 'class/add';
    add(nomclasse: string, niveau: string, remarque: string): Observable<any[]> {
        var decoded = decode(localStorage.getItem('token'));
        let username = decoded.sub;
    let headers = new Headers({'Content-Type': 'application/json'});
    this.createAuthorizationHeader(headers);
    console.log(this.url2, JSON.stringify({
        nomclasse: nomclasse, niveau: niveau, remarque: remarque}));
    return this._http.post(this.url2, JSON.stringify({
        nomclasse: nomclasse, niveau: niveau, remarque: remarque,username:username
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
//*****get all from rest api  
getAllbyniveau(niveau :string): Observable<any[]> {
    console.log(niveau);
   let  urln = CONFIG.URL + CONFIG.apiPath + 'class/allbyniveau'+'?niveau='+niveau;
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this._http.get(urln, {headers: headers})
        .map(res => res.json())
        .catch(this.handleError);
}
    url: string = CONFIG.URL + CONFIG.apiPath + 'class/all';
//*****get all from rest api  
    getAll(): Observable<any[]> {
        let headers = new Headers();
        var decoded = decode(localStorage.getItem('token'));
        let username = decoded.sub;
        
        let url = CONFIG.URL + CONFIG.apiPath + 'class/alls'+'?username='+username;
        this.createAuthorizationHeader(headers);
        return this._http.get(url, {headers: headers})
            .map(res => res.json())
            .catch(this.handleError);
    }
// edit object 
    url4: string = CONFIG.URL + CONFIG.apiPath + 'class/update';
    edit(nomclasse: string, niveau: string, remarque: string): Observable<any[]> {
        let headers = new Headers({'Content-Type': 'application/json'});
        this.createAuthorizationHeader(headers);
        return this._http.post(this.url4, JSON.stringify({
            nomclasse: nomclasse, niveau: niveau, remarque: remarque
        } || null), {headers: headers})
            .map(response => response.json()).catch(this.handleError)
            ;
    }
    url6 : string = CONFIG.URL + CONFIG.apiPath + 'class/bynomclasse';
    findBynomclasse(nomclasses:string):Observable<Classes>{
     
     this.url6=  CONFIG.URL + CONFIG.apiPath + 'class/bynomclasse' +'?nomclasses='+nomclasses
        let headers = new Headers({'Content-Type': 'application/json'});
        this.createAuthorizationHeader(headers);
        return this._http.get(this.url6, {headers: headers})
        .map(res => res.json())
        .catch(this.handleError);
        
    }
   // fonction d'affectation des eleve au classe dedié
    url20: string;
    url10: string = CONFIG.URL + CONFIG.apiPath + 'classedeseleves/add';
    addEleveToClass(nomclasse:string,num : any[]): Observable<any[]> {
        console.log(num);
        this.url20 =CONFIG.URL + CONFIG.apiPath + 'classedeseleves/add'+'?nomclasse='+nomclasse ;

    let headers = new Headers({'Content-Type': 'application/json'});
    this.createAuthorizationHeader(headers);
    console.log(this.url20, JSON.stringify({
        num}));
    return this._http.post(this.url20,
        num,{headers: headers})
        .map(response => response.json()).catch(this.handleError)
        ;
}
/*****get all from rest api  */
    getClassesArchiver(): Observable<any[]> {
        let headers = new Headers();
        var decoded = decode(localStorage.getItem('token'));
        let username = decoded.sub;
        
        let url = CONFIG.URL + CONFIG.apiPath + 'class/GetAllClassesArchiver'+'?username='+username;
        this.createAuthorizationHeader(headers);
        return this._http.get(url, {headers: headers})
            .map(res => res.json())
            .catch(this.handleError);
    }

}