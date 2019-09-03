import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardDirecteurComponent } from './dashboard-directeur.component';

const routes: Routes = [

{path:'',component:DashboardDirecteurComponent}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardDirecteurRoutingModule { }
