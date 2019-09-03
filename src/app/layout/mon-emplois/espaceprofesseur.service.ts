import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { CONFIG } from '../../config';
import { Emplois } from './mon-emplois.component';
import { Message } from 'src/app/model/messagesecoket';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { HttpClient } from '@angular/common/http';
//import { Utilisateur } from './utilisateur';





@Injectable()
export class EspaceprofesseurService  {
    messages: Message[] = [];
  constructor(private _http: Http,private http: HttpClient) {
   
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

getAllbyusername(username :string): Observable<any[]> {
  let  urln = CONFIG.URL + CONFIG.apiPath + 'emplois/allbyprof'+'?username='+username;
   let headers = new Headers();
   console.log("username in service"+ username);
   this.createAuthorizationHeader(headers);
   
   console.log(this._http.get(urln, {headers: headers})
   .map(res => res.json()));
   return this._http.get(urln, {headers: headers})
       .map(res => res.json())
       .catch(this.handleError);
}
getemploisbyprofandday(username:string,jour:string ): Observable<any[]> {
  let myParams = new URLSearchParams();
  myParams.set('username',username);
  myParams.set('jour',jour);
  //console.log("le jour est "+p.jour+"le prof est "+p.prof)
  let  urlns = CONFIG.URL + CONFIG.apiPath + 'emplois/allbyprofday'+'?username='+username+"&jour="+jour;

   let headers = new Headers();

   this.createAuthorizationHeader(headers);
   let options = new RequestOptions({ headers: headers, params: myParams });
   console.log(this._http.get(urlns,options)
   .map(res => res.json()));
   
   return this._http.get(urlns, options)
       .map(res => res.json())
       .catch(this.handleError);
}

url1: string = CONFIG.URL + CONFIG.apiPath + 'emplois/allheures';
getAllHeures(): Observable<any[]> {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this._http.get(this.url1, {headers: headers})
        .map(res => res.json())
        .catch(this.handleError);
}


url6 : string = CONFIG.URL + CONFIG.apiPath + 'emplois/getseance';
findSeanceByProf(username:string,jour:string,heure:string):Observable<Emplois>{
    console.log("le username est : "+username+  "->le jour est :"+jour+"->lheure de debut est :"+heure);
   
    let  urlns = CONFIG.URL + CONFIG.apiPath + 'emplois/getseance'+'?username='+username+"&jour="+jour+"&heure="+heure;
   
    let headers = new Headers({'Content-Type': 'application/json'});
    console.log(this._http.get(urlns, {headers: headers}));
    this.createAuthorizationHeader(headers);
    return this._http.get(urlns, {headers: headers})
    .map(res => res.json())
    .catch(this.handleError);
    
}


url20: string;
url10: string = CONFIG.URL + CONFIG.apiPath + 'absence/add';
addAbsence(id:any,num : any[]): Observable<any[]> {
    console.log(num);
    this.url20 =CONFIG.URL + CONFIG.apiPath + 'absence/add'+'?id='+id ;

let headers = new Headers({'Content-Type': 'application/json'});
this.createAuthorizationHeader(headers);
console.log(this.url20, JSON.stringify({
    num}));
return this._http.post(this.url20,
    num,{headers: headers})
    .map(response => response.json()).catch(this.handleError)
    ;
}


exclus(id:any,numInscription: any,remarque : any): Observable<any> {
  
    this.url20 =CONFIG.URL + CONFIG.apiPath + 'penalites/exclus'+'?id='+id ;

let headers = new Headers({'Content-Type': 'application/json'});
this.createAuthorizationHeader(headers);

return this._http.post(this.url20, JSON.stringify({
    numInscription: numInscription, remarque: remarque
} || null)
, {headers: headers})
.map(response => response.json()).catch(this.handleError)
;
   
}
excluswithnotif(id:any,numInscription: any,remarque : any): Observable<any> {
  
    this.url20 =CONFIG.URL + CONFIG.apiPath + 'penalites/exclus'+'?id='+id ;

let headers = new Headers({'Content-Type': 'application/json'});
this.createAuthorizationHeader(headers);

return  this._http.post(this.url20, JSON.stringify({
    numInscription: numInscription, remarque: remarque
} || null)
, {headers: headers})
.map((response :Response) =>
 {
  this.messages.push (response.json());
//this.posts(response.json());
console.log(response.json())
console.log(this.messages)

 } 



).catch(this.handleError)
;
   
}
posts(data: Message) {
    let url = CONFIG.URL + "api/socket";
    return this.http.post(url, data)
      .map((data: Message) => { return data; })
      .catch(error => {
        return new ErrorObservable(error);
      })
      ;
  }
retenu(id:any,numInscription: any,remarque : any): Observable<any[]> {
  
    this.url20 =CONFIG.URL + CONFIG.apiPath + 'penalites/retenu'+'?id='+id ;

let headers = new Headers({'Content-Type': 'application/json'});
this.createAuthorizationHeader(headers);

return this._http.post(this.url20, JSON.stringify({
    numInscription: numInscription, remarque: remarque
} || null)
, {headers: headers})
.map(response => response.json()).catch(this.handleError)
;
   
}
}
