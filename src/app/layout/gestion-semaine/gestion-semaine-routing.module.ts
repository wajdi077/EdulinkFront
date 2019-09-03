import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestionSemaineComponent } from './gestion-semaine.component';



const routes: Routes = [
    { path: '', component: GestionSemaineComponent },

    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionSemaineRoutingModule { }
