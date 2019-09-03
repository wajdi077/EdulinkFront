
import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {routerTransition} from '../../../router.animations';
import {Router} from "@angular/router";
import * as decode from 'jwt-decode';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SalleService} from "../gestion-salles.service";
import {Subject} from "rxjs/Subject";
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {debounceTime} from 'rxjs/operator/debounceTime';
import swal from 'sweetalert2';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  animations: [routerTransition()]
})
export class AddComponent implements OnInit {
  loginform: FormGroup;
  private list = [
    { name: 'salle de cours'},
    { name: 'salle de permanance'},
    { name: 'laboratoire sciences'},
    { name: 'laboratoire technique'},
];
  username: any;

  constructor(public router: Router,
    private salleService: SalleService,
    private formBuilder: FormBuilder) { 
      this.loginform = this.formBuilder.group({
        'nomSalle': ['', Validators.required],
       
        'type': ['', Validators.required],
        'remarque': ['', Validators.required]
      

    });
    }

  ngOnInit() {
    if(localStorage.getItem('token') != null){
      var decoded = decode(localStorage.getItem('token'));
     this.username = decoded.sub;}
  }
  addSalle() {
    this.salleService.addSalle(this.loginform.controls['nomSalle'].value, this.loginform.controls['type'].value,
        this.loginform.controls['remarque'].value,this.username)
        .subscribe(
            (res) => {
                console.log(res);
                if (res['response'] == true) {
                    
                    this.router.navigate(['/gestion-salles']);
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
