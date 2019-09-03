import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { CONFIG } from 'src/app/config';
import { map } from 'rxjs/operators';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

import * as decode from 'jwt-decode';

@Injectable()
export class AuthGuard implements CanActivate {
    public username;
    user:User   = new User();
    public profil :any ;
    u:User   = new User();
    public admin ="Admin";
    public enseignant ="Enseignant";
    public parrain ="Parrain";
    constructor(public router: Router,private http: Http) { }

    canActivate() {
        if (localStorage.getItem('token')!=null) {
      //    this.getUserbyusername();
            return true;
        }
else{  this.router.navigate(['/login']);
return false;}
      
    }
    createAuthorizationHeader(headers: Headers) {
        var token = localStorage.getItem('token');
        headers.append('Authorization', 'Bearer ' + token);
    }
    servicegetUserbyusername(username: string): Observable<User> {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        let url6=CONFIG.URL + CONFIG.apiPath + 'user/getbyusername'+'?username='+username;
        console.log(url6);
        let a :any;
    
                        return a= this.http.get(url6, {headers: headers})
            .pipe(map(res => res.json()))
            ;
            console.log(a);

    }
    getUserbyusername(){

        if(localStorage.getItem('token') != null){
        var decoded = decode(localStorage.getItem('token'));
       this.username = decoded.sub;
       this.servicegetUserbyusername(this.username)
      
        .subscribe((user) => {
            this.user= user;
            this.profil=this.user.profil;
        
         
            if ( this.profil=="Parrain") {
           
                console.log("app espaceparent");
                this.router.navigate(['/espaceParent']);
               }
               if( this.profil=="Enseignant"){
                console.log("app espace enseignant");
                  this.router.navigate(['/mon-emplois']);
                 }
                else {
                    this.router.navigate(['/gestion-utilisateurs']);  
                 }
       
        }, error => {
            console.log(error);
        });
      }
      else
      this.router.navigate(['/login']);
      }
}
