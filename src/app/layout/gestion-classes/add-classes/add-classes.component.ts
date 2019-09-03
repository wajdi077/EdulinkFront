
import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {routerTransition} from '../../../router.animations';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ClassesService} from "../gestion-classes.service";
import {Subject} from "rxjs/Subject";
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {debounceTime} from 'rxjs/operator/debounceTime';

@Component({
  selector: 'app-add-classes',
  templateUrl: './add-classes.component.html',
  styleUrls: ['./add-classes.component.scss'],  animations: [routerTransition()]
})
export class AddClassesComponent implements OnInit {
  loginform: FormGroup;
  constructor(public router: Router,
    private classeService: ClassesService,
    private formBuilder: FormBuilder) { 
      this.loginform = this.formBuilder.group({
        'nomclasse': ['', Validators.required],
       // 'select': ['', Validators.required],
        'niveau': ['', Validators.required],
        'remarque': ['', Validators.required]
      

    });
    }



  ngOnInit() {
  }
  addClasse() {
    this.classeService.add(this.loginform.controls['nomclasse'].value, this.loginform.controls['niveau'].value,
        this.loginform.controls['remarque'].value)
        .subscribe(
            (res) => {
                console.log(res);
                if (res['response'] == true) {
                    this.router.navigate(['/gestion-classes']);
                }
            },
            error => {
                alert(error);
            });

}
}
