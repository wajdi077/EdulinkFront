import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login/login/login.service';
import * as decode from 'jwt-decode';
import { User } from '../../model/user';
@Component({
  selector: 'app-asidenav',
  templateUrl: './asidenav.component.html',
  styleUrls: ['./asidenav.component.scss'],
  providers:[LoginService]
})
export class AsidenavComponent implements OnInit {
  public username;
  user:User   = new User();
  public profil :any ;
  u:User   = new User();
  public admin ="Admin";
  public enseignant ="Enseignant";
  constructor(   private loginService: LoginService) { }

  ngOnInit() {
      this.getUserbyusername();

  
   
  }


  getUserbyusername(){

    
      var decoded = decode(localStorage.getItem('token'));
     this.username = decoded.sub;
 this.loginService.getUserbyusername(this.username)

      .subscribe((user) => {
          this.user= user;
          this.profil=this.user.profil;
          console.log(this.profil);
          console.log("hello slim");
          console.log(user);
      }, error => {
          console.log(error);
      });
}
}