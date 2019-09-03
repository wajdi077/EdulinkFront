import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {routerTransition} from '../../../../router.animations';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {Role, Access} from "../../gestion-roles.component";
import { SelectionComponent } from '../../../../shared/generic-components/selection.component';
import { RolesService } from '../../gestion-roles.service';
import swal from 'sweetalert2';
import  { SweetAlertOptions } from 'sweetalert2';
import { User } from 'src/app/model/user';
import { LoginService } from 'src/app/login/login/login.service';
import * as decode from 'jwt-decode';
@Component({
    selector: 'app-access-url',
    templateUrl: './access-url.component.html',
    styleUrls: ['./access-url.component.scss'],
    animations: [routerTransition()], providers:[LoginService]
})
export class AccessUrlComponent extends SelectionComponent implements OnInit {
    addRoleForm:FormGroup;
    show=console.log;
    role:Role=new Role();
    id:number;
    modules: any ;
public username :any ;
user:User   = new User();
  public profil :any ;
    constructor(public router: Router,
                private formBuilder:FormBuilder,
                private route: ActivatedRoute,
                private rolesService: RolesService,private loginService: LoginService){
        super();
        this.addRoleForm=this.formBuilder.group({
            'nom': ['', Validators.required],
            'description': ['', Validators.required],
            });
    }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.rolesService.getAAuthoritieById(this.id).subscribe(data=>{
           this.role=data;
        });

        this.rolesService.getGestion(this.id).subscribe(data=>{
           this.modules=data;
        });
        this.getUserbyusername();
    }

    addRole(){
        console.log('role added ')
    }

    UpdateUrl(module){
        this.rolesService.updateGestion(module).subscribe(data=>{
           console.log(data);
        });
        swal({
            position: 'top-end',
            type: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })
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


