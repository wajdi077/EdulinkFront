import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NgbCarouselModule,
    NgbAlertModule,
    NgbDropdownModule,
    NgbModule
} from '@ng-bootstrap/ng-bootstrap';



import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Eleveservice } from '../../layout/gestion-eleves/gestion-eleves.service';

import { SharedPipesModule } from '../../shared/pipes/shared-pipes.module';
import { FlatpickrModule } from 'angularx-flatpickr';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatSidenavModule, MatButtonModule, MatCardModule, MatTableModule, MatIconModule, MatChipsModule, MatPaginatorModule } from '@angular/material';
import { NotesComponent } from './notes.component';
import {  NotesRoutingModule } from './notes-routing.module';
import { AfficherNotesComponent } from './affichernotes.component';






@NgModule({
    imports: [

      NotesRoutingModule,
        CommonModule,
        
      
      
        NgbModule.forRoot(),
    
        FormsModule,
        ReactiveFormsModule,
        MatSidenavModule,
        MatButtonModule,  MatButtonModule,
        MatCardModule,
        MatTableModule,
        MatIconModule,
        MatChipsModule,
        MatPaginatorModule 
        
     
    ],
    declarations: [
        NotesComponent,
        AfficherNotesComponent
    ],
  providers: [
    NgbModule,Eleveservice,

  ],
  entryComponents: [

  
],
})
export class NotesModule { }
