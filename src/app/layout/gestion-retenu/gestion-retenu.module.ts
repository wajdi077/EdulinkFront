import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GesionRetenuComponent } from './gesion-retenu/gesion-retenu.component';
import { GestionRetenuRoutingModule } from './gestion-retenu.routing.module';
import { NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatBadgeModule } from '@angular/material';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';

@NgModule({
  declarations: [GesionRetenuComponent],
  imports: [GestionRetenuRoutingModule,    CommonModule,  NgbAlertModule.forRoot(),
    NgbModule.forRoot(),

    FormsModule,
    ReactiveFormsModule, MatButtonModule,MatBadgeModule,
   
    SharedPipesModule,
    CommonModule
  ]
})
export class GestionRetenuModule { }
