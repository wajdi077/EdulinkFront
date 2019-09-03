import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';

import {routerTransition} from '../../../router.animations';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ClassesService } from '../gestion-classes.service';
@Component({
  selector: 'app-edit-classes',
  templateUrl: './edit-classes.component.html',
  styleUrls: ['./edit-classes.component.scss']
})
export class EditClassesComponent implements OnInit {
  @Input() classe;
  editform: FormGroup;
	t: string;
  constructor(private salleService: ClassesService,
    private formBuilder: FormBuilder,
    private cdr:ChangeDetectorRef,
    public activeModal: NgbActiveModal) { 

      this.editform = this.formBuilder.group({
        'nomclasse': ['', [Validators.minLength(1), Validators.maxLength(20)]],
        'niveau': ['',],
        'remarque': ['', Validators.minLength(1)]
      
      });

    }
    editClasse( nomclasse, niveau, remarque) {
      this.salleService.edit(nomclasse, niveau, remarque)
        .subscribe((res) => {
        }),
        error => {
          alert(error);
        };
      this.activeModal.close();
  
    }
  ngOnInit() {
  }

}
