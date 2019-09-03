import {Component, OnInit, ViewChild,ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import {routerTransition} from '../../router.animations';
import {SalleService} from "./gestion-salles.service";
import {Subject} from "rxjs/Subject";
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {debounceTime} from 'rxjs/operator/debounceTime';
import * as decode from 'jwt-decode';
import { AddComponent } from './add/add.component';
import { User } from '../../model/user';
import { SelectionComponent } from '../../shared/generic-components/selection.component';
import { Access } from '../gestion-roles/gestion-roles.component';
import { Salle } from './salle';
import { RolesService } from '../gestion-roles/gestion-roles.service';
import swal from 'sweetalert2';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
@Component({
    changeDetection: ChangeDetectionStrategy.Default,
  selector: 'app-gestion-salles',
  templateUrl: './gestion-salles.component.html',
  styleUrls: ['./gestion-salles.component.scss'],
  animations: [routerTransition()], providers: [SalleService, NgbModal,RolesService],
  entryComponents: [AddComponent]
})
export class GestionSallesComponent extends SelectionComponent implements OnInit  {
    user: User;
    access: Access = new Access;
    public username;
    statut: any;
    editform: FormGroup;
  currentPage: number = 1;
  salles: Salle[] = [];
  newSalle: Salle = new Salle();
  adding: boolean;
  private _success = new Subject<string>();
    private _error = new Subject<string>();
    staticAlertClosed = false;
    successMessage: string;
    errorMessage: string;
   
    key: string = 'nom'; //set default
    reverse: boolean = false;
    i: number;
    messages: any = {
        delete: 'Voulez vous vraiment supprimer les Objet  selectionnées ?',
    };


    salledecours : Salle = new Salle();
  count: any;
  constructor( private formBuilder: FormBuilder,private rolesService: RolesService,private salleService: SalleService ,   private cdr: ChangeDetectorRef,
    private modalService: NgbModal)  { super();
        this.editform = this.formBuilder.group({
            'nomSalle': ['', [Validators.minLength(1), Validators.maxLength(20)]],
            'type': ['',],
            'remarque': ['', Validators.minLength(1)]
            // ,'photo' : ''
          });
  }

  getSalle(salle : Salle){

this.salledecours=salle;


  }
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
}
  getSalles() {
    if(localStorage.getItem('token') != null){
      var decoded = decode(localStorage.getItem('token'));
     this.username = decoded.sub;
    this.salleService.getAllSalles()
        .subscribe((salles) => {
            this.salles = salles;
        }, error => {
            console.log(error);
        });}
}

  ngOnInit() {
    setTimeout(() => this.staticAlertClosed = true, 2000);
        this._success.subscribe((message) => this.successMessage = message);
        debounceTime.call(this._success, 2000).subscribe(() => this.successMessage = null);
this.accessdenied();
        setTimeout(() => this.staticAlertClosed = true, 2000);
        this._error.subscribe((message) => this.errorMessage = message);
        debounceTime.call(this._error, 2000).subscribe(() => this.errorMessage = null);
        this.getSalles();

  }
  chek(event,newSalle) {
    if (event.keyCode == 13) {
       console.log('add Salle');
    }
}


  

  //getAccess
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


}
}

checkboxes()
{
  //this.eleve=u;

  var inputElems = document.getElementsByTagName("input");
  var tr = document.getElementsByTagName("tr");
  this.count = 0;

  for (var i=0; i<=this.salles.length; i++) {       
     if (inputElems[i].type == "checkbox" && inputElems[i].checked == true){
        this.count++;
        
      //  tr[i].style.backgroundColor='lightblue';
       
     }
   else if(inputElems[i].type == "checkbox" && inputElems[i].checked == false){
   // tr[i].style.backgroundColor='white';
   }
  }
}
deleteSalle() {
    console.log(this._selected);
    if (this._selected.length==0){ swal(
      '<h2 >il faut que tu selectionne au minimum une salle !</h2>', 
                 'warning'
    )}
    else{ swal({
        title: 'Êtes-vous sûr?',
        text: "Vous ne pouvez pas revenir en arrière!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, supprimez-le(s)!'
      }).then((result) => {
        if (result.value) {
          swal(
            'Supprimé!',
            'Vos données  ont  été supprimé.',
            'success'
          )
          this.count=null;
            console.log(this._selected);
            this.salleService.archiver(this._selected).subscribe((res) => {
                console.log(res);
                if (res['response']) {
                    this.getSalles();
                }
            })
        
        }
      })
  
    }
}



editSalle( nomSalle, type, remarque) {

      
   
  
    this.salleService.editSalle(nomSalle, type, remarque)
      .subscribe((res) => {
        swal({
            position: 'top-end',
            type: 'success',
            title: 'Modifcation effectué avec succes',
            showConfirmButton: false,
            timer: 1500
          })
      }),
      error => {
        alert(error);
      };


  }
}
