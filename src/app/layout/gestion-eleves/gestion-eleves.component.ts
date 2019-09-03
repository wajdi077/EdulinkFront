import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

import {Eleveservice} from './gestion-eleves.service';

import * as decode from 'jwt-decode';

import { AddNewEleveComponent } from './add-new-eleve/add-new-eleve.component';
import { debounceTime } from 'rxjs/operator/debounceTime';
import { Subject } from 'rxjs/Subject';
import { RolesService } from '../gestion-roles/gestion-roles.service';
import { User } from '../gestion-utilisateurs/user';
import { Access } from '../gestion-roles/gestion-roles.component';
import { DetailEleveComponent } from './detail-eleve/detail-eleve.component';
import { SelectionComponent } from '../../shared/generic-components/selection.component';

@Component({
    changeDetection: ChangeDetectionStrategy.Default,
    selector: 'app-gestion-eleves',
    templateUrl: './gestion-eleves.component.html',
    styleUrls: ['./gestion-eleves.component.scss'],
    animations: [routerTransition()],
    providers: [Eleveservice, NgbModal,RolesService],
    entryComponents: [AddNewEleveComponent,DetailEleveComponent]
})
export class GestionElevesComponent extends SelectionComponent implements OnInit {
    private _success = new Subject<string>();
    private _error = new Subject<string>();
    user: User;
    access: Access = new Access;
    public username;
    staticAlertClosed = false;
    successMessage: string;
    errorMessage: string;
    enabled: boolean = false;
    statut: any;
    eleves: any[];
    niveauEtude: any;
    currentPage: number = 1;
    sites: any[] = [];
  

    listniveau = [
        {id: 1, name: '---Tous---'},
        {id: 2, name: '7eme'},
        {id: 3, name: '8eme'},
        {id: 4, name: '9eme'},
        {id: 5, name: '1ere'},
       
    ];
    //sorting
    key: string = 'nom'; //set default
    reverse: boolean = false;
    i: number;
    private current: number;


    constructor( private rolesService: RolesService,private eleveService: Eleveservice,
                private cdr: ChangeDetectorRef,
                private modalService: NgbModal) {
        super();

    }

    sort(key) {
        this.key = key;
        this.reverse = !this.reverse;
    }

    ngOnInit() {


        
     this.accessdenied();
        this.getAllEleve();
    }
  //getAccess
  getAccess(profil:any){
    console.log(" getAccess()");
    console.log(this.user.profil);
    this.rolesService.getAccess('Gestion des eleves',this.user.profil)
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

 

  getAllEleve(){  this.eleveService.getAllEleves()
    .subscribe((eleves) => {
            this.eleves = eleves;
            console.log(this.eleves);
        },
        error => {
            alert(error);
        });

this.cdr.detectChanges();}

   

   

    

}
