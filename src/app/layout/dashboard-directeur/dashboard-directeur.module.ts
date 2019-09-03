import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { DashboardDirecteurComponent } from './dashboard-directeur.component';
import { DashboardDirecteurRoutingModule } from './dashboarddirecteur-routing.module';





@NgModule({
  declarations: [DashboardDirecteurComponent],
  imports: [
    CommonModule,
   DashboardDirecteurRoutingModule,

   
  ]
})
export class DashboarddirecteurModule { }
