import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionHistoriqueComponent } from './gestion-historique/gestion-historique.component';

const routes: Routes = [
    { path: '', component: GestionHistoriqueComponent },
  
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionHistoriqueRoutingModule { }
