import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EleveParrainRoutingModule } from './eleve-parrain-routing.module';
import { ListEleveComponent } from './list-eleve/list-eleve.component';
import { EmploiTempsComponent } from './emploi-temps/emploi-temps.component';
import { EspaceParentComponent } from '../espace-parent.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListAbsenceComponent } from './list-absence/list-absence.component';
import { ListPenaliteComponent } from './list-penalite/list-penalite.component';

import {
  MatButtonModule,
  MatCardModule,
  MatTableModule,
  MatIconModule,
  MatChipsModule,
  MatPaginatorModule 
} 
from '@angular/material';

@NgModule({
  declarations: [
  ListEleveComponent,
  EmploiTempsComponent,
  ListAbsenceComponent,
  ListPenaliteComponent,
],
  imports: [
    CommonModule,
    EleveParrainRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatChipsModule,
    MatPaginatorModule 
  ],
  providers: [
        NgbModule
  ]
})
export class EleveParrainModule { }
