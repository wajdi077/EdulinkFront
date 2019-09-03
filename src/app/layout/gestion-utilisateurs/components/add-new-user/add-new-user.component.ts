import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {routerTransition} from '../../../../router.animations';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../user';
import {UtilisateursService} from '../../gestion-utilisateurs.service';
import {Router} from "@angular/router";
import {RolesService} from "../../../gestion-roles/gestion-roles.service";
import swal from 'sweetalert2';

@Component({
    selector: 'app-newuser',
    templateUrl: './add-new-user.component.html',
    styleUrls: ['./add-new-user.component.scss'],
    animations: [routerTransition()]
})
export class AddNewUserComponent implements OnInit {

    loginform: FormGroup;
    t = "";
    private list = [];
    private langues = [
        {id: 2, name: 'Français'},
        {id: 3, name: 'Anglais'},
    ];

    constructor(public router: Router,
                private userService: UtilisateursService,
                private formBuilder: FormBuilder,
                private rolesService: RolesService) {
        this.loginform = this.formBuilder.group({
            'username': ['', Validators.required],
            'select': ['', Validators.required],
            'nom': ['', Validators.required],
            'prenom': ['', Validators.required],
           
            //'photo': [''],
            'tel': ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
            'email': ['', [Validators.required, Validators.email]],
            'password': ['', [Validators.required, Validators.minLength(3)]]
            // ,'photo' : ''
        });
    }

    ngOnInit() {
        this.rolesService.getAllAuthorities()
            .subscribe((authorities) => {
                this.list = authorities;
            }, error => {
                console.log(error);
            });
    }

    addUser() {
        this.userService.addUser(this.loginform.controls['username'].value, this.loginform.controls['password'].value, this.loginform.controls['nom'].value,
            this.loginform.controls['prenom'].value, this.loginform.controls['email'].value, this.loginform.controls['tel'].value, this.loginform.controls['select'].value,  '')
            .subscribe(
                (res) => {
                    console.log(res);
                    if (res['response'] == true) {
                        this.router.navigate(['/gestion-utilisateurs']);
                        swal({
                            position: 'top-end',
                            type: 'success',
                            title: 'Ajout effectué avec succes',
                            showConfirmButton: false,
                            timer: 1500
                          })
                    }
                },
                error => {
                    alert(error);
                });

    }

    makePass() {
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        this.t = "";
        for (var i = 0; i < 7; i++) {
            this.t += possible.charAt(Math.floor(Math.random() * possible.length));
        }


    }





}


