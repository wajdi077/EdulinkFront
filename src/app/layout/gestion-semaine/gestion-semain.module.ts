import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NgbAlertModule, NgbCarouselModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { GestionSemaineRoutingModule } from './gestion-semaine-routing.module';
import { SemaineService } from './gestion-semaine.service';
import { GestionSemaineComponent } from './gestion-semaine.component';
import { SharedPipesModule } from '../../shared/pipes/shared-pipes.module';
import { MatButtonModule, MatCardModule, MatTableModule, MatIconModule, MatChipsModule, MatPaginatorModule, MatTooltipModule } from '@angular/material';

@NgModule({
  imports: [
    NgbCarouselModule.forRoot(),
    NgbAlertModule.forRoot(),
    NgbModule.forRoot(),
    CommonModule,  
    FormsModule,
    ReactiveFormsModule, MatButtonModule,
    MatCardModule,
    MatTableModule,MatTooltipModule,
    MatIconModule,
    MatChipsModule,
    MatPaginatorModule ,
    
    SharedPipesModule,
    GestionSemaineRoutingModule,
  ],
  providers: [
    SemaineService,
    NgbModule

],
  declarations: [
    GestionSemaineComponent,

  ],
  entryComponents: [
   
  
  
],


})
export class GestionSemaineModule { }
