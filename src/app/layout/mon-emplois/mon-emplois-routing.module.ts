import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonEmploisComponent } from './mon-emplois.component';
import { ClasseEncoursComponent } from './classe-encours/classe-encours.component';




const routes: Routes = [
    { path: '', component: MonEmploisComponent },
    {path:'list-eleves',component:ClasseEncoursComponent},

    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonEmploisRoutingModule { }
