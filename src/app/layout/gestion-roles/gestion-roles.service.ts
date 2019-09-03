import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//import { Utilisateur } from './utilisateur';
import {CONFIG} from "../../config";
import * as decode from 'jwt-decode';
import {GenericService} from "../../shared/services/GenericService";
import {AccessUrl} from "./role";
import { Role, Access } from './gestion-roles.component';
import { User } from '../../model/user';


@Injectable()
export class RolesService  {


    // We need Http to talk to a remote server.
    constructor(private _http: Http) {
      
    }

    urls: any = {
        getAll: 'role/getall',
        getById: 'role/getbyid',
        add: 'role/add',
        update: 'role/update',
        delete: 'role/remove',
        getGestion: 'role/getgestion',
        updateGestion:'role/updategestion',

    };

    deleteRole(arr: any[]): Observable<any[]> {
        console.log("arr " + arr);
        let headers = new Headers({'Content-Type': 'application/json'});
        this.createAuthorizationHeader(headers);
        let url6=CONFIG.URL + CONFIG.apiPath + 'role/remove';
        return this._http.post(url6,arr ,{headers: headers} ) .map(response => response.json()).catch(this.handleError)
        ;
    }

    getGestion(id: any): Observable<any> {
        let headers = new Headers({'Content-Type': 'application/json'});
        this.createAuthorizationHeader(headers);
        let url6=CONFIG.URL + CONFIG.apiPath + 'role/getgestion'+'?id='+id;
        return this._http.get(url6,{headers: headers} ).map(response => response.json()).catch(this.handleError);
    }

    updateGestion(obj: AccessUrl): Observable<any[]> {
        let headers = new Headers({'Content-Type': 'application/json'});
        this.createAuthorizationHeader(headers);
        let url6=CONFIG.URL + CONFIG.apiPath + 'role/updategestion';
        return this._http.post(url6,JSON.stringify(obj), {headers: headers}).map(response => response.json()).catch(this.handleError)
        ;
    }






    createAuthorizationHeader(headers: Headers) {
        var token = localStorage.getItem('token');
        headers.append('Authorization', 'Bearer ' + token);
    }


    // Get all salariers
    url: string = CONFIG.URL + CONFIG.apiPath + 'role/getall';

    getAllAuthorities(): Observable<any[]> {
        var decoded = decode(localStorage.getItem('token'));
        let username = decoded.sub;
        let url =CONFIG.URL + CONFIG.apiPath + 'role/getallbyetablissement'+'?username='+username;
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this._http.get(url, {headers: headers})
            .map(res => res.json())
            .catch(this.handleError);
    }

    url6: string = CONFIG.URL + CONFIG.apiPath + 'role/getbyid';
    getAAuthoritieById(id:number): Observable<Role> {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);

        this.url6=CONFIG.URL + CONFIG.apiPath + 'role/getbyid'+'?id='+id;
        console.log(this.url6);
        return this._http.get(this.url6, {headers: headers})
            .map(res => res.json())
            .catch(this.handleError);
    }

    // Add  user
    url2: string = CONFIG.URL + CONFIG.apiPath + 'role/add';
    addAuthority(role: Role): Observable<any[]>
    {
        var decoded = decode(localStorage.getItem('token'));
        let username = decoded.sub;
        let url =CONFIG.URL + CONFIG.apiPath + 'role/add'+'?username='+username;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        this.createAuthorizationHeader(headers);
        console.log(url);
        console.log(JSON.stringify({ name: name}));
        return this._http.post(url, JSON.stringify(role) , {headers: headers} )
            .map(response => response.json().response)
            .catch(this.handleError);
    }

    /*addAuthority(username: string, password: string, nom: string, prenom: string, email: string,
            telephone: string, profil: string, langue: string, photo: string): Observable<any[]> {
        let headers = new Headers({'Content-Type': 'application/json'});
        this.createAuthorizationHeader(headers);
        return this._http.post(this.url2, JSON.stringify({
                username: username, password: password, nom: nom,
                prenom: prenom, email: email, telephone: telephone, profil: profil, langue: langue, photo: photo
            } || null)
            , {headers: headers})
            .map(response => response.json()).catch(this.handleError)
            ;
    }*/




    // update  user
    url4: string = CONFIG.URL + CONFIG.apiPath + 'role/update';

    /*editAuthority(username: string, password: string, email: string, telephone: string): Observable<any[]> {
        let headers = new Headers({'Content-Type': 'application/json'});
        this.createAuthorizationHeader(headers);
        return this._http.post(this.url4, JSON.stringify({
            username: username, password: password, email: email,
            telephone: telephone
        } || null), {headers: headers})
            .map(response => response.json()).catch(this.handleError)
            ;
    }*/

    editAuthority(role: Role): Observable<any[]> {
        let headers = new Headers({'Content-Type': 'application/json'});
        this.createAuthorizationHeader(headers);
        return this._http.post(this.url4, JSON.stringify( role|| null), {headers: headers})
            .map(response => response.json()).catch(this.handleError)
            ;
    }



    // delete  user
    url5: string = CONFIG.URL + CONFIG.apiPath + 'role/remove';

    deleteAuthority(username: string[]): Observable<any[]> {
        console.log(username);
        let headers = new Headers({'Content-Type': 'application/json'});
        this.createAuthorizationHeader(headers);
        return this._http.post(this.url5, username, {headers: headers})
            .map(response => response.json()).catch(this.handleError);

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


    getUserbyusername(username: string): Observable<User> {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        this.url6=CONFIG.URL + CONFIG.apiPath + 'user/getbyusername'+'?username='+username;
        console.log(this.url6);
        let a :any;
        console.log(this._http.get(this.url6, {headers: headers})
            .map(res => res.json()));
                        return a= this._http.get(this.url6, {headers: headers})
            .map(res => res.json())
            ;
           

    }
      getAccess(gestion:string,role:string): Observable<Access> {
        var decoded = decode(localStorage.getItem('token'));
        let username = decoded.sub;
        console.log('bhim ya slim00 ');
        console.log('le role est : '+role)
         let url1 = CONFIG.URL + 'api/role/getaccess'+'?gestion='+gestion+"&role="+role+'&username='+username;
         let headers = new Headers();
         this.createAuthorizationHeader(headers);
         return this._http.get(url1, {headers: headers})
         .map(res => res.json())
         .catch(this.handleError);
}
}