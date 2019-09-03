import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestionAffecteEleveComponent } from './gestion-affecte-eleve.component';

const routes: Routes = [
    { path: '', component: GestionAffecteEleveComponent },
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AffectationEleveRoutingModule { }
