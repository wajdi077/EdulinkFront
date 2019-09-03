
import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//import { Utilisateur } from './utilisateur';
import {CONFIG} from "../../config";
@Injectable({
  providedIn: 'root'
})
export class GestionParrainService {

  constructor(private _http: Http) { }

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

  createAuthorizationHeader(headers: Headers) {
    var token = localStorage.getItem('token');
    headers.append('Authorization', 'Bearer ' + token);
}
getAllParrain(){
  let  url = CONFIG.URL + CONFIG.apiPath + 'Parrain/allParrain';
  let headers = new Headers();
  this.createAuthorizationHeader(headers);
  return this._http.get(url, {headers: headers})
      .map(res => res.json())
      .catch(this.handleError);



}

addeleveToParrain(username:string,num : any[]): Observable<any[]> {
  console.log(num);
  let url20 =CONFIG.URL + CONFIG.apiPath + 'eleve/affecter'+'?username='+username ;

let headers = new Headers({'Content-Type': 'application/json'});
this.createAuthorizationHeader(headers);
console.log(url20, JSON.stringify({
  num}));
return this._http.post(url20,
  num,{headers: headers})
  .map(response => response.json()).catch(this.handleError)
  ;
}

}
