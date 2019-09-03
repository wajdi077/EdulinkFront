import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestionParrainComponent } from './gestion-parrain/gestion-parrain.component';
import { AffecterEleveComponent } from './gestion-parrain/affecter-eleve/affecter-eleve.component';



const routes: Routes = [
    { path: '', component: GestionParrainComponent },
    { path: 'affecter', component: AffecterEleveComponent },
  
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionParainRoutingModule { }
