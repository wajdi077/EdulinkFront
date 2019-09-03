import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoriqueComponent } from './historique.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [

  {path:'historique',component:HistoriqueComponent}
  
  
   
  ];
@NgModule({
 
  imports: [CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HistoriqueRoutingModule { }
