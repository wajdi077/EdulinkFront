import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { EmploisService } from '../../gestion-emplois/emploisservice';
import { ClassesService } from '../../gestion-classes/gestion-classes.service';
import { MatiereService } from '../../gestion-matieres/matiereservice';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SalleService } from '../../gestion-salles/gestion-salles.service';
import { SelectionComponent } from 'src/app/shared/generic-components/selection.component';
import { FormBuilder } from '@angular/forms';
import * as decode from 'jwt-decode';
import { RolesService } from '../../gestion-roles/gestion-roles.service';
import { Access } from '../../gestion-roles/gestion-roles.component';
import { UpdateemploisserviceService } from '../updateemploisservice.service';
@Component({
  selector: 'app-enseignant',
  templateUrl: './enseignant.component.html',
  styleUrls: ['./enseignant.component.scss'],
  providers: [ClassesService,EmploisService,MatiereService, NgbModal,SalleService,RolesService,UpdateemploisserviceService]
})
export class EnseignantComponent extends SelectionComponent implements OnInit  {
  utilisateurs: any[];
  user: any;
  access: Access = new Access;  username: any;
  classes: any[];
 show = true ;
  constructor(private updateservice : UpdateemploisserviceService,private rolesService: RolesService,private formBuilder: FormBuilder,private emploisservice :EmploisService,private cdr: ChangeDetectorRef,private modalService: NgbModal,private salleservice: SalleService ,private classeService: ClassesService ,private matiereservice:MatiereService) {
    super();
  }

  ngOnInit() {
    this.accessdenied();
    this.getprof();
    this.getallaclasebyetablissement();
  }
  showOrHide(){
    if (this.show == true )
    {
      this.show = false;
      console.log(this.show)
    }
else {
  this.show = true ;
}
console.log(this.show)
  }
  getAccess(profil:any){
    console.log(" getAccess()");
    console.log(this.user.profil);
    this.rolesService.getAccess('Gestion des salle',this.user.profil)
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
 
 this.username = decoded.sub;
this.rolesService.getUserbyusername(this.username)
     .subscribe((user) => {
         this.user= user;
         
              this.getAccess(user.profil);

     
     }, error => {
         console.log(error);
     });


}}
  getprof() {
 
    this.emploisservice.getAllProf()
        .subscribe((prof) => {
            this.utilisateurs = prof;
            console.log(prof);
        }, error => {
            console.log(error);
        });
  }
getallaclasebyetablissement()
{



  this.classeService.getAll()
  .subscribe((classes) => {
      this.classes = classes;
      console.log(classes);
  }, error => {
      console.log(error);
  });
}
}
