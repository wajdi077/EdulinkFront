import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestionEmploisComponent } from './gestion-emplois.component';
import { AddprogrammeComponent } from './addprogramme/addprogramme.component';





const routes: Routes = [
    { path: '', component: GestionEmploisComponent },
    { path: 'ajouter', component: AddprogrammeComponent },
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionEmploisRoutingModule { }
