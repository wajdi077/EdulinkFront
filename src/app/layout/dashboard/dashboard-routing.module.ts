import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RapportJournalierComponent } from './rapport-journalier/rapport-journalier.component';

const routes: Routes = [

{path:'',component:DashboardComponent},
{path:'rapport',component:RapportJournalierComponent},

 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
