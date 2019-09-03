import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NgbCarouselModule,
    NgbAlertModule,
    NgbDropdownModule,
    NgbModule
} from '@ng-bootstrap/ng-bootstrap';


import { MonEmploisComponent } from './mon-emplois.component';
import { MonEmploisRoutingModule } from './mon-emplois-routing.module';

import { ClasseEncoursComponent } from './classe-encours/classe-encours.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Eleveservice } from '../../layout/gestion-eleves/gestion-eleves.service';

import { SharedPipesModule } from '../../shared/pipes/shared-pipes.module';
import { FlatpickrModule } from 'angularx-flatpickr';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatSidenavModule, MatButtonModule, MatCardModule, MatTableModule, MatIconModule, MatChipsModule, MatPaginatorModule } from '@angular/material';






@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(), NgbDropdownModule.forRoot(),
        MonEmploisRoutingModule,
        
      
      
        NgbModule.forRoot(),
    
        FormsModule,
        ReactiveFormsModule,
      
        SharedPipesModule,  
        FlatpickrModule.forRoot(),
       
        MDBBootstrapModule.forRoot(),
        MatSidenavModule,
        MatButtonModule,  MatButtonModule,
        MatCardModule,
        MatTableModule,
        MatIconModule,
        MatChipsModule,
        MatPaginatorModule 
    ],
    declarations: [
MonEmploisComponent,ClasseEncoursComponent,
    ],
  providers: [
    NgbModule,Eleveservice,
  ],
  entryComponents: [

  
],
})
export class MonEmploisModule { }
