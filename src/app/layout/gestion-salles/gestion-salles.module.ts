import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SalleService} from "./gestion-salles.service";

import {NgbAlertModule, NgbCarouselModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {GestionSalleRoutingModule} from "./gestion-salles-routing.module";
import { GestionSallesComponent } from './gestion-salles.component';
import {SharedPipesModule} from '../../shared/pipes/shared-pipes.module';
import { AddComponent } from './add/add.component';
import { MatButtonModule, MatBadgeModule } from '@angular/material';

@NgModule({
  imports: [
    NgbCarouselModule.forRoot(),
    NgbAlertModule.forRoot(),
    NgbModule.forRoot(),
    CommonModule,  
    FormsModule,
    ReactiveFormsModule,MatButtonModule,MatBadgeModule,
 
    SharedPipesModule,
    GestionSalleRoutingModule,
  ],
  providers: [
    SalleService,AddComponent,
    NgbModule

],
  declarations: [
    GestionSallesComponent,AddComponent,
  ],
  entryComponents: [
    AddComponent
  
],


})
export class GestionSallesModule { }
