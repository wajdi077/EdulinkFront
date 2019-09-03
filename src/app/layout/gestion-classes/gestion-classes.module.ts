import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClassesService} from "./gestion-classes.service";
import {NgbAlertModule, NgbCarouselModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GestionClassesRoutingModule} from "./gestion-classes-routing.module";
import { GestionClassesComponent } from './gestion-classes.component';
import {SharedPipesModule} from '../../shared/pipes/shared-pipes.module';
import { AddClassesComponent } from './add-classes/add-classes.component';
import { EditClassesComponent } from './edit-classes/edit-classes.component';
import { GestionAffectationelevesComponent } from './gestion-affectationeleves/gestion-affectationeleves.component';
import { Eleveservice } from '../gestion-eleves/gestion-eleves.service';
import { ClasseElevesComponent } from './classe-eleves/classe-eleves.component';
import { MatButtonModule } from '@angular/material';
import {MatBadgeModule} from '@angular/material/badge';
@NgModule({
  imports: [
    NgbCarouselModule.forRoot(),
    NgbAlertModule.forRoot(),
    NgbModule.forRoot(),
    CommonModule, 
    FormsModule,
    ReactiveFormsModule, MatButtonModule,MatBadgeModule,
   
    SharedPipesModule,
    GestionClassesRoutingModule,
  ],
  providers: [
    ClassesService,Eleveservice,
    NgbModule

],
  declarations: [
    GestionClassesComponent,
    AddClassesComponent,
    EditClassesComponent,
    GestionAffectationelevesComponent,
    ClasseElevesComponent,
  ],
  entryComponents: [   EditClassesComponent,  AddClassesComponent
    
],


})
export class GestionClassesModule { }
