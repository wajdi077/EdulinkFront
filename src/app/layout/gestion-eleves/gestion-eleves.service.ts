import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//import { Utilisateur } from './utilisateur';
import {CONFIG} from "../../config";
import {GenericService} from "../../shared/services/GenericService";
import { Eleve } from './eleve';
import { User } from '../gestion-utilisateurs/user';
import * as decode from 'jwt-decode';

@Injectable()
export class Eleveservice {
    url5: string = CONFIG.URL + CONFIG.apiPath + 'eleve/remove';
    deleteEleve(nomEleve: any): any {
        //console.log(username);
        let headers = new Headers({'Content-Type': 'application/json'});
        this.createAuthorizationHeader(headers);
        return this._http.post(this.url5, nomEleve, {headers: headers})
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
    url2: string = CONFIG.URL + CONFIG.apiPath + 'eleve/add';
    
    addEleve(nom: string, prenom: string,niveauEtude : string ,dateNaissance : Date ,sexe : string, etat :string,cin : number,situationFamiliale : string,remarque: string): Observable<any[]> {
        let headers = new Headers({'Content-Type': 'application/json'});
        var decoded = decode(localStorage.getItem('token'));
        let username = decoded.sub;
        this.createAuthorizationHeader(headers);
        console.log(this.url2, JSON.stringify({
            nom: nom, prenom: prenom,niveauEtude:niveauEtude,dateNaissance:dateNaissance,sexe:sexe,etat:etat,cin:cin,situationFamiliale:situationFamiliale, remarque: remarque,username:username}));
            return this._http.post(this.url2, JSON.stringify({
                nom: nom, prenom: prenom,niveauEtude:niveauEtude,dateNaissance:dateNaissance,sexe:sexe,etat:etat,cin:cin,situationFamiliale:situationFamiliale, remarque: remarque,username:username
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
        
        url: string = CONFIG.URL + CONFIG.apiPath + 'eleve/all';
        
        getAllEleves(): Observable<Eleve[]> {
            let headers = new Headers();
            var decoded = decode(localStorage.getItem('token'));
            let username = decoded.sub;
            let url = CONFIG.URL + CONFIG.apiPath + 'eleve/allbyetablissement'+'?username='+username;
            this.createAuthorizationHeader(headers);
            return this._http.get(url, {headers: headers})
            .map(res => res.json())
            .catch(this.handleError);
        }
        
        url4: string = CONFIG.URL + CONFIG.apiPath + 'eleve/update';
        
        editEleve(nomEleve: string, type: string, remarque: string): Observable<any[]> {
            let headers = new Headers({'Content-Type': 'application/json'});
            this.createAuthorizationHeader(headers);
            return this._http.post(this.url4, JSON.stringify({
                nomEleve: nomEleve, type: type, remarque: remarque
            } || null), {headers: headers})
            .map(response => response.json()).catch(this.handleError)
            ;
        }
        
        url10: string = CONFIG.URL + CONFIG.apiPath + 'eleve/allbyclass';
        
        getAllElevesbyclasse(nomclasse:any): Observable<any[]> {
            console.log('esmliclasse estfi servce '+nomclasse)
            this.url10= CONFIG.URL + CONFIG.apiPath +'eleve/allbyclass/'+'?nomclasse='+nomclasse;
            let headers = new Headers();
            this.createAuthorizationHeader(headers);
            return this._http.get(this.url10, {headers: headers})
            .map(res => res.json())
            .catch(this.handleError);
        }
        url100: string = CONFIG.URL + CONFIG.apiPath + 'eleve/allbyclassnow';
        getAllElevesbyclassenow(username:any): Observable<any[]> {
            console.log('esmliclasse estfi servce '+username)
            this.url100= CONFIG.URL + CONFIG.apiPath +'eleve/allbyclassnow/'+'?username='+username;
            let headers = new Headers();
            this.createAuthorizationHeader(headers);
            return this._http.get(this.url100, {headers: headers})
            .map(res => res.json())
            .catch(this.handleError);
        }
        
        
        url110: string = CONFIG.URL + CONFIG.apiPath + 'eleve/allbyclassencours';
        
        getAllElevesbyclasseEncours(id:any): Observable<any[]> {
            
            this.url110= CONFIG.URL + CONFIG.apiPath +'eleve/allbyclassencours/'+'?id='+id;
            let headers = new Headers();
            this.createAuthorizationHeader(headers);
            return this._http.get(this.url110, {headers: headers})
            .map(res => res.json())
            .catch(this.handleError);
        }
        url111: string = CONFIG.URL + CONFIG.apiPath + 'eleve/bynumInscription/';
        getelevebynumInscription(numInscription:any): Observable<Eleve> {
            
            this.url111= CONFIG.URL + CONFIG.apiPath +'eleve/bynumInscription/'+'?numInscription='+numInscription;
            let headers = new Headers();
            this.createAuthorizationHeader(headers);
            return this._http.get(this.url111, {headers: headers})
            .map(res => res.json())
            .catch(this.handleError);
        }
        
        url112: string = CONFIG.URL + 'api/penalites/getEleveByPenality/';
        getelevebyPenalite(numInscription:any): any {
            
            this.url112= CONFIG.URL +'api/penalites/getEleveByPenality/'+'?numInscription='+numInscription;
            let headers = new Headers();
            this.createAuthorizationHeader(headers);
            return this._http.get(this.url112, {headers: headers})
            .map(res => res.json())
            .catch(this.handleError);
        }
        
        
        
        url22: string = CONFIG.URL + CONFIG.apiPath + 'eleve/addelevewithparrain';
        
        addelevewithparrain(user :User,elevedto :Eleve): Observable<any> {
            console.log(user.email);
            var decoded = decode(localStorage.getItem('token'));
            let username = decoded.sub;
            elevedto.username=username;
            let headers = new Headers({'Content-Type': 'application/json'});
            this.createAuthorizationHeader(headers);
            
            this.url22 = CONFIG.URL + CONFIG.apiPath + 'eleve/addelevewithparrain'+'?elevedto='+elevedto;
            let url = CONFIG.URL + CONFIG.apiPath + 'eleve/addelevewithparrain';
            
            console.log( this._http.post(url,JSON.stringify({elevedto,user
                
            } || null), {headers: headers})
            .map(response => response.json()).catch(this.handleError))
            return this._http.post(url,JSON.stringify({elevedto:elevedto,user:user
                
            } || null), {headers: headers})
            .map(response => response.json()).catch(this.handleError)
            ;
        }



        url113: string =CONFIG.URL + CONFIG.apiPath +'eleve/parraindetailsforeleve/';
        getparrainbyEleve(numInscription:any): any {
            this.url113= CONFIG.URL + CONFIG.apiPath +'eleve/parraindetailsforeleve/'+'?numInscription='+numInscription;
            let headers = new Headers();
            this.createAuthorizationHeader(headers);
            return this._http.get(this.url113, {headers: headers})
            .map(res => res.json())
            .catch(this.handleError);
        }



        url114: string = CONFIG.URL + CONFIG.apiPath + 'eleve/allbyniveau';
        
        getAllElevesbyNiveau(niveau:any): Observable<any[]> {
            console.log('esmliclasse estfi servce '+niveau)
            this.url114= CONFIG.URL + CONFIG.apiPath +'eleve/allbyniveau/'+'?niveau='+niveau;
            let headers = new Headers();
            this.createAuthorizationHeader(headers);
            return this._http.get(this.url114, {headers: headers})
            .map(res => res.json())
            .catch(this.handleError);
        }

        /*Developer : Sara NAIFAR
          Date: 14/08/2019
          Function: get eleve by selected class   
        */
       url115: string = CONFIG.URL + CONFIG.apiPath + 'eleve/allbyclass';
        
       getAllElevesbySelectedClass(nomclasse:string): Observable<any[]> {
          
           this.url115= CONFIG.URL + CONFIG.apiPath +'eleve/allbyclass/'+'?nomclasse='+nomclasse;
           let headers = new Headers();
           this.createAuthorizationHeader(headers);
           return this._http.get(this.url115, {headers: headers})
           .map(res => res.json())
           .catch(this.handleError);
       }



       url33: string = CONFIG.URL + CONFIG.apiPath + 'eleve/elevewithclassnull';
        
       getAllElevesNonAffetedToclasse(): Observable<Eleve[]> {
        let headers = new Headers();
        var decoded = decode(localStorage.getItem('token'));
        let username = decoded.sub;
           console.log('esmliclasse est......... '+username)
           this.url10= CONFIG.URL + CONFIG.apiPath +'eleve/elevewithclassnull/'+'?username='+username;
           
           this.createAuthorizationHeader(headers);
           return this._http.get(this.url10, {headers: headers})
           .map(res => res.json())
           .catch(this.handleError);
       }

    }