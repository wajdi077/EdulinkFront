import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';

import { CONFIG } from '../../config';
import { map } from 'rxjs/operators';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { catchError } from 'rxjs/operators';
import { User } from '../../model/user';


@Injectable()
export class LoginService {
  private base: string;
    private subject = new Subject<any>();
    public token: string;
//jwtHelper: JwtHelper = new JwtHelper();
    public username;
    public profile ;
    public user :any[];
    public Anneescolaire : any[];
  constructor(public router: Router, private http: Http) {

    this.base = CONFIG.URL + 'auth/login';
   }

   loggedIn() {
    return (localStorage.getItem("token") === null) ? false : true;
    //return tokenNotExpired();
}

getLoggedIn() {
    return this.subject.asObservable();
}


getUserbyid(id: any): Observable<any> {
 
  let url1 = CONFIG.URL + 'api/allbyetab/getbyid';
  
  return  this.http.get(url1, JSON.stringify({id:id }))
  
  .pipe(map(res=>{const u = res.json();
  }));
}
getByUsername(username: any): Observable<any> {
 
   let url1 = CONFIG.URL + 'api/user/getbyusername';
   
   return  this.http.get(url1, JSON.stringify({username:username }))
   
   .pipe(map(res=>{const u = res.json();
}));


    
}

doLogin(credentials) {
  return this.http.post(this.base, credentials).pipe(
    map(res => {
      const data = res.json();
      if (data) {
       // localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
    }));
} 


  login(username: string, password: string): Observable<any> {
      

      let headers = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: headers});
      let url = CONFIG.URL + 'auth/login';
     
   

      return this.http.post(url, JSON.stringify({username: username, password: password} || null), options)
          .pipe(map((response: Response) => {
        
              if ((response.status === 200) || (response.status === 201)) {
                      const data = response.json();
           
       localStorage.setItem('token', data.token);
       console.log("tokeen"+this.token);
       this.user=data;
        localStorage.setItem('user', JSON.stringify(data.user));
         console.log("datauser"+this.user);
        console.log("data"+data);
   
                  let token = response.json().access_token;
                  this.token = token;

                  console.log(this.token);
                   console.log("this.nom");
                  let profile = response.json().profil;
                  this.profile=profile;
                    console.log("ya slim lprofile raho hedha "+this.profile);
              
                  //var decoded = decode(token);
                  //console.log(decoded);
                  localStorage.setItem('token', token);
                    console.log('slim1111111112221111');
           console.log(     this.getByUsername(username));
                console.log('slim1111111111111');
                  this.getByUsername(username);
                  return true;
                  //this.subject.next(true);
                  //this.extractData2;
              }

          })
          ,catchError( error => {
            if (error.status === 500) {
                return Observable.throw(new Error(error.status));
            } else if (error.status === 400) {
                return Observable.throw(new Error(error.status));
            } else if (error.status === 409) {
                return Observable.throw(new Error(error.status));
            } else if (error.status === 406) {
                return Observable.throw(new Error(error.status));
            }
        })
      )}



private extractData2(res: Response) {
  let body = res.json();
  return body.access_token || {};
}


getRoles() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    console.log("role"+user.profil);
    return user.profil;
  }
    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('token');
        //this.subject.next(false);
        window.location.reload();
    }
    url6: string ;
    getUserbyusername(username: string): Observable<User> {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        this.url6=CONFIG.URL + CONFIG.apiPath + 'user/getbyusername'+'?username='+username;
        console.log(this.url6);
        let a :any;
    
                        return a= this.http.get(this.url6, {headers: headers})
            .pipe(map(res => res.json()))
            ;
            console.log(a);

    }
    createAuthorizationHeader(headers: Headers) {
        var token = localStorage.getItem('token');
        headers.append('Authorization', 'Bearer ' + token);
    }


    url10: string = CONFIG.URL + CONFIG.apiPath + 'annee/getanneeactuelle';


   
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
