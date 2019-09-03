import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {routerTransition} from '../../../router.animations';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Eleve} from '../eleve';
import {Eleveservice} from '../gestion-eleves.service';
import {Router} from "@angular/router";


@Component({
  selector: 'app-add-new-eleve',
templateUrl: './add-new-eleve.component.html',
styleUrls: ['./add-new-eleve.component.scss'],
    animations: [routerTransition()]
})
export class AddNewEleveComponent implements OnInit {

    loginform: FormGroup;
    t = "";
    private list = [];
    private niveau = [
        {id: 2, name: '7eme'},
        {id: 3, name: '8eme'},
        {id: 4, name: '9eme'},
        {id: 4, name: '1ere'},
    ];

    constructor(public router: Router,
                private eleveservice: Eleveservice,
                private formBuilder: FormBuilder
             ) {
        this.loginform = this.formBuilder.group({
            'nom': ['', Validators.required],
          
            'prenom': ['', Validators.required],
            'dateNaissance': ['', Validators.required],
            'niveauEtude': ['', Validators.required],
           
           // 'situationFamiliale': ['', Validators.required],
            'sexe': ['', [Validators.required, Validators.maxLength(11)]],
            'cin': ['', [Validators.required, Validators.maxLength(8),Validators.minLength(8)]],
            'remarque': ['', [Validators.required,Validators.maxLength(100)]],
            'etat': ['', [Validators.required, Validators.minLength(3)]]
            // ,'photo' : ''
        });
    }

    ngOnInit() {
     
    }

    addEleve() {
        this.eleveservice.addEleve(this.loginform.controls['nom'].value, this.loginform.controls['prenom'].value,this.loginform.controls['niveauEtude'].value, this.loginform.controls['dateNaissance'].value,
             this.loginform.controls['sexe'].value ,this.loginform.controls['etat'].value, this.loginform.controls['cin'].value,"",this.loginform.controls['remarque'].value)
            .subscribe(
                (res) => {
                    console.log(res);
                    if (res['response'] == true) {
                        this.router.navigate(['/gestion-eleves']);
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


