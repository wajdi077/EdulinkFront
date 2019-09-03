import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GestionElevesComponent} from "./gestion-eleves.component";
import { AddNewEleveComponent } from './add-new-eleve/add-new-eleve.component';
import { DetailEleveComponent } from './detail-eleve/detail-eleve.component';
import { AddParrainseleveComponent } from './add-parrainseleve/add-parrainseleve.component';




const routes: Routes = [
    { path: '', component: GestionElevesComponent },
    { path: 'ajouter', component: AddNewEleveComponent },
    { path: 'detail', component: DetailEleveComponent },
    { path: 'inscrire', component: AddParrainseleveComponent },
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionEleveRoutingModule { }
