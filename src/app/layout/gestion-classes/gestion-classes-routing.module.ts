import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GestionClassesComponent} from "./gestion-classes.component";
import { AddClassesComponent } from './add-classes/add-classes.component';
import { GestionAffectationelevesComponent } from './gestion-affectationeleves/gestion-affectationeleves.component';
import { ClasseElevesComponent } from './classe-eleves/classe-eleves.component';

 


const routes: Routes = [
    { path: '', component: GestionClassesComponent },
    { path: 'ajouter', component: AddClassesComponent },
    {path: 'ajouterdeseleve',component:GestionAffectationelevesComponent},
    {path: 'classeseleves',component:ClasseElevesComponent},
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionClassesRoutingModule { }
