import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient } from '@angular/common/http';
import { CONFIG } from 'src/app/config';
import { Note } from './Note.model';
import { catchError, tap } from 'rxjs/operators';





@Injectable()
export class NoteService  {

    url: string = CONFIG.URL + CONFIG.apiPath + '/note/addnote';
    url1: string = CONFIG.URL + CONFIG.apiPath + '/note/allnotes';

    
  constructor(private _http: Http,private http: HttpClient) {
   
}



ajouternote(Notedto: Note): any {
    //console.log(username);
    let headers = new Headers({'Content-Type': 'application/json'});
    this.createAuthorizationHeader(headers);
    return this._http.post(this.url, Notedto, {headers: headers})
        .map(response => response.json()).catch(this.handleError)
        ;
}




getAllnotes(): Observable<any[]> {
     let headers = new Headers();
     this.createAuthorizationHeader(headers);
     
     console.log(this._http.get(this.url1, {headers: headers})
     .map(res => res.json()));
     return this._http.get(this.url1, {headers: headers})
         .map(res => res.json())
         .catch(this.handleError);
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









}
