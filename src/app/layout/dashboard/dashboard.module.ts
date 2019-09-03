import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {ChartsModule} from 'ng2-charts'
import { BrowserModule } from '@angular/platform-browser';
import { ClassesService } from '../gestion-classes/gestion-classes.service';
import { StatistiqueServiceService } from './statistique-service.service';
import { HisFilterPipe } from './dashboard/historique-filter.pipe';
import { RapportJournalierComponent } from './rapport-journalier/rapport-journalier.component';

@NgModule({
  declarations: [DashboardComponent,HisFilterPipe, RapportJournalierComponent],
  imports: [
    CommonModule,ChartsModule,
    DashboardRoutingModule,
    FormsModule,
    
  ],
  providers: [
    StatistiqueServiceService
  ],
  exports:[DashboardComponent]
})
export class DashboardModule { }
