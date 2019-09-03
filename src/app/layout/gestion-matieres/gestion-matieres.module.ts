import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NgbAlertModule, NgbCarouselModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedPipesModule} from '../../shared/pipes/shared-pipes.module';

import { GestionMatieresComponent } from './gestion-matieres.component';
import { AddmatiereComponent } from './addmatiere/addmatiere.component';
import { GestionMatiereRoutingModule } from './gestion-matieres.routing.module';
import { MatiereService } from './matiereservice';
import { MatButtonModule, MatBadgeModule } from '@angular/material';
@NgModule({
  imports: [
    NgbCarouselModule.forRoot(),
    NgbAlertModule.forRoot(),
    NgbModule.forRoot(),
    CommonModule,  
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,MatBadgeModule,
    SharedPipesModule,
    GestionMatiereRoutingModule,
  ],
  providers: [
    MatiereService,AddmatiereComponent,
    NgbModule

],
  declarations: [
    GestionMatieresComponent,AddmatiereComponent,
  ],
  entryComponents: [
    AddmatiereComponent
  
],


})
export class GestionMatiereModule { }
