import { Injectable } from '@angular/core';
import * as decode from 'jwt-decode';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { CONFIG } from 'src/app/config';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Classes } from '../mon-emplois/mon-emplois.component';
import { Utilisateur } from '../gestion-utilisateurs/utilisateur';
@Injectable({
  providedIn: 'root'
})
export class StatistiqueServiceService {
  constructor(private _http: Http) {

  }
  createAuthorizationHeader(headers: Headers) {
    var token = localStorage.getItem('token');
    headers.append('Authorization', 'Bearer ' + token);
}
  getNumPenaltiesByClass () {
    let url = CONFIG.URL + CONFIG.apiPath + 'statistique/getNmbrePenaltByClasse';
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.createAuthorizationHeader(headers);
    return this._http.get(url, { headers: headers })
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
//************Afficher historique etab */
getAllHistEtab(): Observable<any[]> {
  let headers = new Headers();
  var decoded = decode(localStorage.getItem('token'));
  let username = decoded.sub;
  
  let url = CONFIG.URL + CONFIG.apiPath + 'historique/allHisEtab';
  this.createAuthorizationHeader(headers);
  return this._http.get(url, {headers: headers})
      .map(res => res.json())
      .catch(this.handleError);
}
getAllHistClasse():Observable<any[]> {
  let headers = new Headers();
  var decoded = decode(localStorage.getItem('token'));
  let username = decoded.sub;
  
  let url = CONFIG.URL + CONFIG.apiPath + 'historique/allHisClass';
  this.createAuthorizationHeader(headers);
  return this._http.get(url, {headers: headers})
      .map(res => res.json())
      .catch(this.handleError);
}
getAllHisUser():Observable<any[]> {
  let headers = new Headers();
  var decoded = decode(localStorage.getItem('token'));
  let username = decoded.sub;
  
  let url = CONFIG.URL + CONFIG.apiPath + 'historique/allHisUsers';
  this.createAuthorizationHeader(headers);
  return this._http.get(url, {headers: headers})
      .map(res => res.json())
      .catch(this.handleError);
}
}
export class Etablissement {
  id:number;
  libelle:string;
  description:string;
  adresse:string;
  email:string;
  photo:string;
  telephone:number;
  
 

  constructor(){}
}
export class Historique{
  id: number;
  description: string;
  date: Date;
  userConnect: string;
  archiver: boolean;
  etab: Etablissement;
  constructor(){}
}
export class HistoriqueClasse{
  id: number;
  description: string;
  date: Date;
  userConnect: string;
  archiver: boolean;
  classe: Classes;
  constructor(){}
}
export class HistoriqueUser{
  id: number;
  description: string;
  date: Date;
  userConnect: string;
  archiver: boolean;
  user: Utilisateur;
  constructor(){}
}


