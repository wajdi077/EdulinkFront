import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { GestionPenalitesService } from '../gestion-penalites.service';
import { routerTransition } from 'src/app/router.animations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RolesService } from '../../gestion-roles/gestion-roles.service';
import * as decode from 'jwt-decode';
import { SelectionComponent } from 'src/app/shared/generic-components/selection.component';
import { Access } from '../../gestion-roles/gestion-roles.component';
import { User } from 'src/app/model/user';
import { LoginService } from 'src/app/login/login/login.service';

@Component({
  selector: 'app-gestion-exclus',
  templateUrl: './gestion-exclus.component.html',
  styleUrls: ['./gestion-exclus.component.scss'] , animations: [routerTransition()], providers: [NgbModal,RolesService,LoginService],
})
export class GestionExclusComponent extends SelectionComponent implements OnInit {
  exclus: any[];
  count: any;
  enabled: boolean = false;
  statut: any;
  user: User;
  access: Access = new Access;
  public username;
  profil: string;
  
  constructor( private penalitesservice :GestionPenalitesService,private rolesService: RolesService, private cdr: ChangeDetectorRef,private loginService: LoginService) {
    super();
  }

  ngOnInit() {
  //  this. getUserbyusername( );
   // this.accessdenied();
   this.getExclus();
  }
  getExclus() {
    this.penalitesservice.getAll()
        .subscribe((classes) => {
            this.exclus = classes;
            console.log(classes);
        }, error => {
            console.log(error);
        });
}

checkboxes()
      {
        //this.eleve=u;
    
        var inputElems = document.getElementsByTagName("input");
        var tr = document.getElementsByTagName("tr");
        this.count = 0;

        for (var i=0; i<=this.exclus.length; i++) {       
           if (inputElems[i].type == "checkbox" && inputElems[i].checked == true){
              this.count++;
              
              tr[i].style.backgroundColor='lightblue';
             // alert(this.count);
           }
         else if(inputElems[i].type == "checkbox" && inputElems[i].checked == false){
          tr[i].style.backgroundColor='';
         }
        }
     }

     getAccess(profil:any){
      console.log(" getAccess()");
      console.log(this.user.profil);
      this.rolesService.getAccess('Gestion des classes',this.profil)
               .subscribe((access) => {
                   this.access= access;
                   console.log("hello slim");
                   console.log(this.access.gestion);
                   console.log(access.gestion);
               }, error => {
                   console.log(error);
               });
       }
       accessdenied(){
  
          if(localStorage.getItem('token') != null){
           var decoded = decode(localStorage.getItem('token'));
           this.getAccess(this.profil);
       this.username = decoded.sub;
     
  
  
  }



  
       }
      
      
      
      
      
       getUserbyusername( ){
     
    
        var decoded = decode(localStorage.getItem('token'));
       this.username = decoded.sub;
   this.loginService.getUserbyusername(this.username)
  
        .subscribe((user) => {
            this.user= user;
            this.profil=this.user.profil;
      
        
          
           
            console.log(user);
        }, error => {
            console.log(error);
        });
  }

      
      
      }
