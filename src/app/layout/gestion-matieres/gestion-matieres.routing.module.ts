import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddmatiereComponent } from './addmatiere/addmatiere.component';
import { GestionMatieresComponent } from './gestion-matieres.component';




const routes: Routes = [
    { path: '', component: GestionMatieresComponent },
    { path: 'ajouter', component: AddmatiereComponent },
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionMatiereRoutingModule { }
