import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionParrainComponent } from './gestion-parrain/gestion-parrain.component';
import { GestionParainRoutingModule } from './gestion-parrain-routing.module';
import { GestionParrainService } from './gestion-parrain.service';
import { NgbCarouselModule, NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';
import { AffecterEleveComponent } from './gestion-parrain/affecter-eleve/affecter-eleve.component';
@NgModule({
  declarations: [GestionParrainComponent, AffecterEleveComponent],
  imports: [
    CommonModule,GestionParainRoutingModule,NgbCarouselModule.forRoot(),
    NgbAlertModule.forRoot(),
    NgbModule.forRoot(),
    CommonModule,  
    FormsModule,
    ReactiveFormsModule,
    
    SharedPipesModule,
  ],
  providers:[GestionParrainService]
})
export class GestionParrainModule { }
