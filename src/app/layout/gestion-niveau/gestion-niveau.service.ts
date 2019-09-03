import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//import { Utilisateur } from './utilisateur';
import {CONFIG} from "../../config";
import {GenericService} from "../../shared/services/GenericService";
import * as decode from 'jwt-decode';
@Injectable()
export class NiveauService {

    niveau: any ;

    urls: any = {
        getByProfil: 'user/profil',
        changeStatutNotif: 'notification/statut',
        getUserNotification:'user/notif/get'

    };
    // We need Http to talk to a remote server.
    constructor(private _http: Http) {
      
    }


    // Get
    getByProfil(profil: string): Observable<any> {
        var decoded = decode(localStorage.getItem('token'));
        let username = decoded.sub;
        let headers = new Headers({'Content-Type': 'application/json'});
        this.createAuthorizationHeader(headers);
       let url =  CONFIG.URL + CONFIG.apiPath + 'user/profil'+'?profil='+profil;;
        return this._http.get(url, {headers: headers},).map(response => response.json()).catch(this.handleError)
        ;
    }


    createAuthorizationHeader(headers: Headers) {
        var token = localStorage.getItem('token');
        headers.append('Authorization', 'Bearer ' + token);
    }


    // Get all salariers
    url: string = CONFIG.URL + CONFIG.apiPath + 'user/getall';

    getNiveau(): Observable<any[]> {
        
        var decoded = decode(localStorage.getItem('token'));
        let username = decoded.sub;
        let url = CONFIG.URL + CONFIG.apiPath + 'niveau/getall'+'?username='+username;
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this._http.get(url, {headers: headers})
            .map(res => res.json())
            .catch(this.handleError);
    }

    addniveautoetab(niveau : any[]): Observable<any[]> {
        console.log(niveau);
        var decoded = decode(localStorage.getItem('token'));
        let usernames = decoded.sub;
        let url =CONFIG.URL + CONFIG.apiPath + 'niveau/affecterniveautoetab'+'?username='+usernames ;
      
      let headers = new Headers({'Content-Type': 'application/json'});
      this.createAuthorizationHeader(headers);
      console.log(url, JSON.stringify({
        niveau}));
      return this._http.post(url,
        niveau,{headers: headers})
        .map(response => response.json()).catch(this.handleError)
        ;
      }
   

    // Add  user
    url2: string = CONFIG.URL + CONFIG.apiPath + 'user/add';

    addUser(username: string, password: string, nom: string, prenom: string, email: string,
            telephone: string, profil: string,  photo: string): Observable<any[]> {
                var decoded = decode(localStorage.getItem('token'));
                let usernames = decoded.sub;
                let url = CONFIG.URL + CONFIG.apiPath + 'user/add'+'?username='+usernames;
        let headers = new Headers({'Content-Type': 'application/json'});
        this.createAuthorizationHeader(headers);
        console.log('user'+' username'+
            username+'password  '+ password+'nom  '+ nom+'prenom   '+
            prenom+'email   '+email+'telephone    '+ telephone+'profil   '+ profil+ ' '+'photo   ' + photo);
        console.log(url, JSON.stringify({
            username: username, password: password, nom: nom,
            prenom: prenom, email: email, telephone: telephone, profil: profil,  photo: photo}));
        return this._http.post(url, JSON.stringify({
                username: username, password: password, nom: nom,
                prenom: prenom, email: email, telephone: telephone, profil: profil,  photo: photo
            } || null)
            , {headers: headers})
            .map(response => response.json()).catch(this.handleError)
            ;
    }


    // block  user
    url3: string = CONFIG.URL + CONFIG.apiPath + 'user/disable';

    blockUser(username: string, disable: boolean): Observable<any[]> {
        let headers = new Headers({'Content-Type': 'application/json'});
        this.createAuthorizationHeader(headers);
        return this._http.post(this.url3, JSON.stringify({username: username, disable: disable}), {headers: headers})
            .map(response => response.json().response)
            .catch(this.handleError);
    }


    // update  user
    url4: string = CONFIG.URL + CONFIG.apiPath + 'user/update';

    editUser(username: string, password: string, email: string, telephone: string): Observable<any[]> {
        let headers = new Headers({'Content-Type': 'application/json'});
        this.createAuthorizationHeader(headers);
        return this._http.post(this.url4, JSON.stringify({
            username: username, password: password, email: email,
            telephone: telephone
        } || null), {headers: headers})
            .map(response => response.json()).catch(this.handleError)
            ;
    }

    // delete  user
    url5: string = CONFIG.URL + CONFIG.apiPath + 'user/remove';

    deleteUser(username: string[]): Observable<any[]> {
        console.log(username);
        let headers = new Headers({'Content-Type': 'application/json'});
        this.createAuthorizationHeader(headers);
        return this._http.post(this.url5, username, {headers: headers})
            .map(response => response.json()).catch(this.handleError)
            ;
    }




    // archive  user
    url6: string = CONFIG.URL + CONFIG.apiPath + 'user/archiver';

    archiverenseignant(username: string[]): Observable<any[]> {
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
