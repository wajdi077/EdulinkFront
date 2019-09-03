import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LoginService } from './login.service';
import { routerTransition } from '../../router.animations';
import { User } from '../../model/user';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import * as decode from 'jwt-decode';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { WarningComponent } from '../warning/warning.component';
import swal, { SweetAlertOptions } from 'sweetalert2';
@Component({
  selector: 'app-login', 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()],
  providers: [LoginService,NgbModal]
})
export class LoginComponent implements OnInit {
   
  public username;
  user:User   = new User();
  u:User   = new User();
  loginform: FormGroup;
  error: any;
  token: any;
  Profile :any ;
    profil: string;
  constructor(private formBuilder: FormBuilder, private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    public router: Router,
    private loginService: LoginService) {
this.loginform = this.formBuilder.group({
'username': ['', Validators.required],
'password': ['', [Validators.required, Validators.minLength(3)]]
// ,'photo' : ''
});
if (this.loginService.loggedIn()) {
this.router.navigate(['/'])
}
}
warning( ) {

    swal({
        title: 'Error!',
        text: 'identifiant ou mot de passe incorrect',
        type: 'error',
        confirmButtonText: 'OK'
      })
}
login(event, username, password) {
 
  event.preventDefault();
  this.loginService.login(username, password)
                    .subscribe( (result) => {
                      if(localStorage.getItem('token') != null){
                          var decoded = decode(localStorage.getItem('token'));
                         this.username = decoded.sub;
                     this.loginService.getUserbyusername(this.username)
                    
                          .subscribe((user) => {
                              this.user= user;
                              console.log("hello slim");
                              console.log(user);
                              console.log(this.user);
                              console.log(this.user.profil);
                              if (this.user.profil=="Parrain") {
     
                                console.log("login espaceparent");
                                console.log("espace parrain")
                                this.router.navigate(['/espaceParent']);
                               }
                            else if(this.user.profil=="Enseignant"){
                                console.log("login espace enseignant");
                                  this.router.navigate(['./mon-emplois']);
                                 }
                                 else {
                                    console.log("login espace admin");
                                    this.router.navigate(['./gestion-utilisateurs']);  
                                 }
                          }, error => {
                              console.log(error);
                          });
                  
              
              
              }
              
                     this.pagemanipulate();
                        },
                        (err) => {
                          
                            this.error = err;
                           this.warning();
                          //  alert('identifiant ou mot de passe incorrect');
                        });
                       
  this.router.navigate(['/login']);
}

ngOnInit() {


}

onLoggedin() {
  localStorage.setItem('isLoggedin', 'true');

}
getUserbyusername(username :any){

  this.loginService.getUserbyusername(username)
           .subscribe((user) => {
               this.user= user;
               console.log("hello slim");
               console.log(user);
           }, error => {
               console.log(error);
           });
   }
   pagemanipulate(){

          if(localStorage.getItem('token') != null){
      

             this.user.profil
              
      

}

 }

}
