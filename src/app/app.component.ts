import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login/login/login.service';

import * as decode from 'jwt-decode';
import { User } from './model/user';

declare var $:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[LoginService]
})
export class AppComponent {
  public username;
  user:User   = new User();
  public profil :any ;
  u:User   = new User();
  public admin ="Admin";
  public enseignant ="Enseignant";
  public parrain ="Parrain";
  constructor(
   public router: Router,private loginService: LoginService) {

} 

ngOnInit() {
  //this.getUserbyusername();
 if(localStorage.getItem('token') != null){
 // this.router.navigate(['/']);
return true ;
 }
 else {
  this.router.navigate(['/login']);
 }
 
 /* if (this.router.url === '/') {
     
  }*/
}
getUserbyusername(){

  if(localStorage.getItem('token') != null){
  var decoded = decode(localStorage.getItem('token'));
 this.username = decoded.sub;
this.loginService.getUserbyusername(this.username)

  .subscribe((user) => {
      this.user= user;
      this.profil=this.user.profil;
      console.log(this.profil);
      console.log("hello slim");
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
      console.log(user);
  }, error => {
      console.log(error);
  });
}
this.router.navigate(['/login']);
}
}
