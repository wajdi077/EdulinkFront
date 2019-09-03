import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GestionSallesComponent} from "./gestion-salles.component";
import { AddComponent } from './add/add.component';



const routes: Routes = [
    { path: '', component: GestionSallesComponent },
    { path: 'ajouter', component: AddComponent },
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionSalleRoutingModule { }
