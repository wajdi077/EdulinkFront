import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestionArchiveComponent } from './gestion-archive/gestion-archive.component';



const routes: Routes = [

{path:'', component:GestionArchiveComponent},


 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionArchiveRoutingModule { }
