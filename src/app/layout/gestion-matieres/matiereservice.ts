import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//import { Utilisateur } from './utilisateur';
import {CONFIG} from "../../config";
import {GenericService} from "../../shared/services/GenericService";
import { Matiere } from './matiere';
import { Access } from '../gestion-roles/gestion-roles.component';
import { User } from '../gestion-utilisateurs/user';

import * as decode from 'jwt-decode';
@Injectable()
export class MatiereService {
    url5: string = CONFIG.URL + CONFIG.apiPath + 'matiere/remove';
 
    constructor(private _http: Http) {
        
    }
    createAuthorizationHeader(headers: Headers) {
        var token = localStorage.getItem('token');
        headers.append('Authorization', 'Bearer ' + token);
    }

     // Add  user
     url2: string = CONFIG.URL + CONFIG.apiPath + 'matiere/add';
  
     addMatiere(nommatiereFR): Observable<any[]> {
        var decoded = decode(localStorage.getItem('token'));
        let username = decoded.sub;
    let headers = new Headers({'Content-Type': 'application/json'});
    this.createAuthorizationHeader(headers);
    console.log(this.url2, JSON.stringify({
        nommatiereFR: nommatiereFR}));
        return this._http.post(this.url2, JSON.stringify({nommatiereFR : nommatiereFR,username:username}) , {headers: headers} )
        .map(response => response.json().response)
        .catch(this.handleError);
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

    url: string = CONFIG.URL + CONFIG.apiPath + 'matiere/all';

    getAllMatieres(): Observable<any[]> {
        var decoded = decode(localStorage.getItem('token'));
        let username = decoded.sub;
        
        let url = CONFIG.URL + CONFIG.apiPath + 'matiere/alls'+'?username='+username;
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this._http.get(url, {headers: headers})
            .map(res => res.json())
            .catch(this.handleError);
    }

    url4: string = CONFIG.URL + CONFIG.apiPath + 'matiere/update';

   
    editMatiere(matiere: Matiere): Observable<any[]> {
        let headers = new Headers({'Content-Type': 'application/json'});
        this.createAuthorizationHeader(headers);
        return this._http.post(this.url4, JSON.stringify( matiere|| null), {headers: headers})
            .map(response => response.json()).catch(this.handleError)
            ;
    }

    deleteMatiere(nomMatiere: any): any {
        //console.log(username);
        let headers = new Headers({'Content-Type': 'application/json'});
        this.createAuthorizationHeader(headers);
        return this._http.post(this.url5, nomMatiere, {headers: headers})
            .map(response => response.json()).catch(this.handleError)
            ;
    }
    archiver(nomMatiere: any): any {
        var decoded = decode(localStorage.getItem('token'));
        let username = decoded.sub;
        let url6=CONFIG.URL + CONFIG.apiPath + 'matiere/archiver'+'?username='+username;
        let headers = new Headers({'Content-Type': 'application/json'});
        this.createAuthorizationHeader(headers);
        return this._http.post(url6, nomMatiere, {headers: headers})
            .map(response => response.json()).catch(this.handleError)
            ;
    }
    getUserbyusername(username: string): Observable<User> {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        let url6=CONFIG.URL + CONFIG.apiPath + 'user/getbyusername'+'?username='+username;
        console.log(url6);
        let a :any;
        console.log(this._http.get(url6, {headers: headers})
            .map(res => res.json()));
                        return a= this._http.get(url6, {headers: headers})
            .map(res => res.json())
            ;
           

    }
      getAccess(gestion:string,role:string): Observable<Access> {
          
        console.log('bhim ya slim00 ');
        console.log('le role est : '+role)
         let url1 = CONFIG.URL + 'api/role/getaccess'+'?gestion='+gestion+"&role="+role;
         let headers = new Headers();
         this.createAuthorizationHeader(headers);
         return this._http.get(url1, {headers: headers})
         .map(res => res.json())
         .catch(this.handleError);
}
}