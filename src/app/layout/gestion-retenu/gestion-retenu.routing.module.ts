import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GesionRetenuComponent } from './gesion-retenu/gesion-retenu.component';







const routes: Routes = [
    { path: '', component: GesionRetenuComponent },

    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionRetenuRoutingModule { }
