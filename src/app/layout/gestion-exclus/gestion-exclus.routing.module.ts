import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestionExclusComponent } from './gestion-exclus/gestion-exclus.component';






const routes: Routes = [
    { path: '', component: GestionExclusComponent },

    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionExclusRoutingModule { }
