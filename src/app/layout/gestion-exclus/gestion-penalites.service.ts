import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as decode from 'jwt-decode';
import { CONFIG } from 'src/app/config';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GestionPenalitesService {
  url5: string = CONFIG.URL + CONFIG.apiPath ;
  constructor(private _http: Http,private http:HttpClient) { }
  createAuthorizationHeader(headers: Headers) {
    var token = localStorage.getItem('token');
    headers.append('Authorization', 'Bearer ' + token);
}
  getAll(): Observable<any[]> {
    let headers = new Headers();
    var decoded = decode(localStorage.getItem('token'));
    let username = decoded.sub;
    
    let url = CONFIG.URL + CONFIG.apiPath + 'penalites/exclusbyetablissement'+'?username='+username;
    this.createAuthorizationHeader(headers);
    return this._http.get(url, {headers: headers})
        .map(res => res.json())
        .catch(this.handleError);
}
getAllretenu(): Observable<any[]> {
  let headers = new Headers();
  var decoded = decode(localStorage.getItem('token'));
  let username = decoded.sub;
  
  let url = CONFIG.URL + CONFIG.apiPath + 'penalites/retenubyetablissement'+'?username='+username;
  this.createAuthorizationHeader(headers);
  return this._http.get(url, {headers: headers})
      .map(res => res.json())
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
/*****************Service pdf retenu */
getPdf(id:number) :Observable<Blob> {
 
  return this.http.get('http://localhost:8080/pdf/pdfretenu'+'?id='+id,{ responseType: 'blob' });
  }

}
