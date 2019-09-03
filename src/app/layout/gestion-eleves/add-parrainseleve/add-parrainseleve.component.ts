import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RolesService } from '../../gestion-roles/gestion-roles.service';
import { UtilisateursService } from '../../gestion-utilisateurs/gestion-utilisateurs.service';
import { Router } from '@angular/router';
import { Eleveservice } from '../gestion-eleves.service';
import { parseHttpResponse } from 'selenium-webdriver/http';
import swal from 'sweetalert2';
import { Eleve } from '../eleve';
import { User } from 'src/app/model/user';
@Component({
  selector: 'app-add-parrainseleve',
  templateUrl: './add-parrainseleve.component.html',
  styleUrls: ['./add-parrainseleve.component.scss'],providers:[UtilisateursService,RolesService,Eleveservice]
})
export class AddParrainseleveComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isOptional = false;
  list: any[];
  parrain :User = new User();
  eleve :Eleve = new Eleve();
  constructor(private _formBuilder: FormBuilder,public router: Router,
    private userService: UtilisateursService,
   
    private rolesService: RolesService,private eleveservice:Eleveservice) { }

  ngOnInit() {

    

    this.firstFormGroup = this._formBuilder.group({
      nom: ['', Validators.required],
    prenom: ['', Validators.required],
      adresse: ['', Validators.required],
      sexe:['', Validators.required],
      niveau: ['', Validators.required],
      date: ['', Validators.required]
      
    });

    this.secondFormGroup = this._formBuilder.group({
     
 
      'nom': ['', Validators.required],
      'prenom': ['', Validators.required],
     
      //'photo': [''],
      'tel': ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      'email': ['', [Validators.required, Validators.email]],
  
      // ,'photo' : ''
  });
  }
  addelevewithparrain() {
if (this.eleve.sexe=='1'){
  this.eleve.sexe='Masculin';
}
else this.eleve.sexe='Feminin';
    this.eleveservice.addelevewithparrain(this.parrain,this.eleve )
        .subscribe(
            (res) => {
                console.log(res);
                if (res['response'] == true) {
                    this.router.navigate(['/gestion-eleves']);
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

}
