import {Component, OnInit, ViewChild} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {RolesService} from "./gestion-roles.service";
import {Subject} from "rxjs/Subject";
import {debounceTime} from 'rxjs/operator/debounceTime';

import * as decode from 'jwt-decode';
import { SelectionComponent } from '../../shared/generic-components/selection.component';
import { User } from '../../model/user';
import { UtilisateursService } from '../gestion-utilisateurs/gestion-utilisateurs.service';
@Component({
    selector: 'app-gestion-roles',
    templateUrl: './gestion-roles.component.html',
    styleUrls: ['./gestion-roles.component.scss'],
    animations: [routerTransition()],
    providers: [UtilisateursService],
    entryComponents: []
})
export class GestionRolesComponent extends SelectionComponent implements OnInit {
    access: Access = new Access;
    public username;
    user:User   = new User();
    currentPage: number = 1;
    roles: Role[] = [];
    newRole: Role = new Role();
    adding: boolean;
    editing: number;
    addingUsers: boolean;

    private _success = new Subject<string>();
    private _error = new Subject<string>();

    staticAlertClosed = false;
    successMessage: string;
    errorMessage: string;

    objectName = 'role'; // used for messages
    messages: any = {
        delete: 'Voulez vous vraiment supprimer les ' + this.objectName + 's selectionnées ?',
    };


    constructor(private rolesService: RolesService) {
        super();
    }

    getRoles() {
        this.rolesService.getAllAuthorities()
            .subscribe((authorities) => {
                this.roles = authorities;
            }, error => {
                console.log(error);
            });
    }

    ngOnInit() {
        setTimeout(() => this.staticAlertClosed = true, 2000);
        this._success.subscribe((message) => this.successMessage = message);
        debounceTime.call(this._success, 2000).subscribe(() => this.successMessage = null);

        setTimeout(() => this.staticAlertClosed = true, 2000);
        this._error.subscribe((message) => this.errorMessage = message);
        debounceTime.call(this._error, 2000).subscribe(() => this.errorMessage = null);
        this.getRoles();
        if(localStorage.getItem('token') != null){
            var decoded = decode(localStorage.getItem('token'));
           this.username = decoded.sub;}

           console.log('add role'+this.user.profil);
           this.accessdenied();
    }


    chek(event,newRole) {
        if (event.keyCode == 13) {
           console.log('add role');
        }
    }

    save(newRole) {
        let newName = newRole.description.split(' ').join('_');
        newRole.setName('ROLE_' + newName);
        this.rolesService.addAuthority(newRole)
            .subscribe((data) => {
                if (data) {
                    this.getRoles();
                    this._success.next(`Role enregistré avec succés`);
                }
                else {
                    this._error.next(`Role déja existant`);
                }
                this.newRole = new Role();
            });
        this.adding = false;
    }


    saveEditRole(GroupeToEdit) {
        let newName = GroupeToEdit.description.split(' ').join('_');
        GroupeToEdit.name = 'ROLE_' + newName;
        this.rolesService.editAuthority(GroupeToEdit)
            .subscribe((res) => {
                if (res['response']) {
                    this.editing = -1;
                }
                else {
                    this.getRoles();
                    this._error.next(`Role déja existant`);
                }
            });
    }


    deleteRole() {
        console.log(this._selected);
        if (confirm(this.messages.delete)) {
            console.log(this._selected);
            this.rolesService.deleteRole(this._selected).subscribe((res) => {
                console.log(res);
                if (res['response']) {
                    this.getRoles();
                }
            })
        }
    }

    // getuserByUsername

    getUserbyusername(){

        this.rolesService.getUserbyusername(this.username)
                 .subscribe((user) => {
                     this.user= user;
                     console.log("hello slim1111111111");
                     console.log(user);
                 }, error => {
                     console.log(error);
                 });
         }

         //getAccess
         getAccess(profil:any){
            console.log(" getAccess()");
            console.log(this.user.profil);
            this.rolesService.getAccess('Gestion des roles',this.user.profil)
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
}
export class Role {
    public id: number;
    public name: string;
    public description: string;

    public constructor() {
    }

    setName(name: string) {
        this.name = name;
    }

}
export class Access {
    public id: number;
  
    public addop: Boolean;
    public getbyidop: Boolean;
    public getallop: Boolean;
    public updateop: Boolean;
    
    public removeop: Boolean;
    public gestion :string ;
    public constructor() {
    }

  

}
