import { Injectable } from '@angular/core';
import * as decode from 'jwt-decode';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { CONFIG } from 'src/app/config';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class DirecteurstatistiqueService {


  constructor(private _http: Http, private https : HttpClient) { }

  ngOnInit()
  {


  }

  createAuthorizationHeader(headers: Headers) {
    var token = localStorage.getItem('token');
    headers.append('Authorization', 'Bearer ' + token);
}

getallstatistiques(): Observable<any[]> {
  let headers = new Headers();
  var decoded = decode(localStorage.getItem('token'));
  let username = decoded.sub;
  let url = CONFIG.URL + CONFIG.apiPath + 'dashboard/etat'+'?username='+username;
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





}
