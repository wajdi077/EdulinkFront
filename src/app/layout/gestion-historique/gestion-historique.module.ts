import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionHistoriqueComponent } from './gestion-historique/gestion-historique.component';
import { GestionHistoriqueService } from './gestion-historique.service';
import { GestionHistoriqueRoutingModule } from './gestion-historique.routing.module';

@NgModule({
  declarations: [GestionHistoriqueComponent],
  imports: [
    CommonModule,GestionHistoriqueRoutingModule
  ],
  providers:[GestionHistoriqueService]
})
export class GestionHistoriqueModule { }
