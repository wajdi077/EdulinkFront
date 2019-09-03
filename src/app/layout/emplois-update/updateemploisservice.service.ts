import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { CONFIG } from '../../config';
import { Heures } from '../gestion-emplois/heures';

@Injectable()
export class UpdateemploisserviceService {

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
  getemploisbyprof(username:string ): Observable<any[]> {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    //console.log("le jour est "+p.jour+"le prof est "+p.prof)
    let  urlns = CONFIG.URL + CONFIG.apiPath + 'emplois/allbyprof'+'?username='+username;
    return this._http.get(urlns, {headers: headers})
        .map(res => res.json())
        .catch(this.handleError);
}
getemploisbyid(id:any ): Observable<any[]> {
  let headers = new Headers();
  this.createAuthorizationHeader(headers);
  //console.log("le jour est "+p.jour+"le prof est "+p.prof)
  let  urlns = CONFIG.URL + CONFIG.apiPath + 'emplois/getbyid'+'?id='+id;
  return this._http.get(urlns, {headers: headers})
      .map(res => res.json())
      .catch(this.handleError);
}
delete(id:any ): Observable<any[]> {
  let headers = new Headers();
  this.createAuthorizationHeader(headers);
  //console.log("le jour est "+p.jour+"le prof est "+p.prof)
  let  urlns = CONFIG.URL + CONFIG.apiPath + 'emplois/delete'+'?id='+id;
  return this._http.get(urlns, {headers: headers})
      .map(res => res.json())
      .catch(this.handleError);
}
   // delete object 
   remove(id: any): Observable<any>{
    let  urlns = CONFIG.URL + CONFIG.apiPath + 'emplois/delete'+'?id='+id;
    let headers = new Headers({'Content-Type': 'application/json'});
    this.createAuthorizationHeader(headers);
    return this._http.post(urlns, id, {headers: headers})
        .map(response => response.json()).catch(this.handleError)
        ;
}
url2: string = CONFIG.URL + CONFIG.apiPath + 'emplois/update';
updateseanceEnseignant(id,salle: any, classe: any, typeprog: any,matiere : any): Observable<any[]> {
let headers = new Headers({'Content-Type': 'application/json'});
this.createAuthorizationHeader(headers);
console.log(this.url2, JSON.stringify({id:id,
  nomsalle: salle, nomclasse: classe, typeprog: typeprog,nommatiere:matiere}));
return this._http.post(this.url2, JSON.stringify({id:id,
  nomsalle: salle, nomclasse: classe, typeprog: typeprog,nommatiere:matiere
    } || null)
    , {headers: headers})
    .map(response => response.json()).catch(this.handleError)
    ;
}
}