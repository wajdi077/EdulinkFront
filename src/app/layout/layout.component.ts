import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OnDestroy } from '@angular/core';

import * as decode from 'jwt-decode';
import { User } from '../model/user';
import { LoginService } from '../login/login/login.service';
declare var $:any;
@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    providers:[LoginService]
})
export class LayoutComponent implements OnInit , OnDestroy  {
    public username;
    user:User   = new User();
    public profil :any ;
    u:User   = new User();
    public admin ="Admin";
    public enseignant ="Enseignant";
    public parrain ="Parrain";
    constructor(public router: Router,private loginService: LoginService) { }

    ngOnInit() {
        $('body').layout('fix');
      //  this.getUserbyusername();
        window.dispatchEvent(new Event('resize'));
        document.body.className = 'hold-transition skin-blue sidebar-mini';
       this. getUserbyusername();
              if(this.profil!="Parrain" || this.profil!="Enseignant"){
                return false;
    //  this.router.navigate(['./gestion-utilisateurs']);
}
      else {return false;}
        
    }
    ngOnDestroy(): void {
        document.body.className='';
      }

      getUserbyusername(){
        console.log("lauouuuut111111111111111111111 espace enseignant");
    
        var decoded = decode(localStorage.getItem('token'));
       this.username = decoded.sub;
   this.loginService.getUserbyusername(this.username)
  
        .subscribe((user) => {
            this.user= user;
            this.profil=this.user.profil;
            console.log(this.profil);
            console.log("hello slim");
            if ( this.profil=="Parrain") {
           
                console.log("l ayouuuuut espaceparent");
               // this.router.navigate(['/espaceParent']);
               }
               if( this.profil=="Enseignant"){
                console.log("lauouuuut espace enseignant");
                //  this.router.navigate(['/mon-emplois']);
                 }
                 else {
                  //  this.router.navigate(['./gestion-utilisateurs']);  
                 }
            console.log(user);
        }, error => {
            console.log(error);
        });
  }

  pagemanipulate(){

    if(localStorage.getItem('token') != null){
     var decoded = decode(localStorage.getItem('token'));
 
 this.username = decoded.sub;
this.loginService.getUserbyusername(this.username)
     .subscribe((user) => {
         this.user= user;
       
         if(user.profil=="Parrain"){
          this.router.navigate(['./espaceParent']);
         }
         if(user.profil=="Enseignant"){
            this.router.navigate(['./mon-emplois']);
           }
         else{
              this.router.navigate(['./gestion-utilisateurs']);
         }
     }, error => {
         console.log(error);
     });


}

}
}
