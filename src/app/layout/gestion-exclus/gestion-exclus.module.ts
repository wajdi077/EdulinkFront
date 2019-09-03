import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionExclusComponent } from './gestion-exclus/gestion-exclus.component';
import { GestionExclusRoutingModule } from './gestion-exclus.routing.module';
import { GestionPenalitesService } from './gestion-penalites.service';
import { NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatBadgeModule } from '@angular/material';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';

@NgModule({
  declarations: [GestionExclusComponent],
  imports: [
    CommonModule,GestionExclusRoutingModule,  NgbAlertModule.forRoot(),
    NgbModule.forRoot(),

    FormsModule,
    ReactiveFormsModule, MatButtonModule,MatBadgeModule,
   
    SharedPipesModule,
  ]
  ,providers:[GestionPenalitesService]
})
export class GestionExclusModule { }
