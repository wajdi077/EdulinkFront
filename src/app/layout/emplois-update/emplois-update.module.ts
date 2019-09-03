import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnseignantComponent } from './enseignant/enseignant.component';
import { UpdateEmploisRoutingModule } from './updateemplois.routing.module';
import { NgbCarouselModule, NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';
import { ModifierEmploisComponent } from './modifier-emplois/modifier-emplois.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { DateAdapter } from '@angular/material';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { FlatpickrModule } from 'angularx-flatpickr';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { ModalwindowComponent } from 'src/app/modalwindow/modalwindow/modalwindow.component';
import { MatButtonModule, MatSidenavModule, MatCardModule, MatTableModule, MatIconModule, MatChipsModule, MatPaginatorModule } from '@angular/material';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { EmploisClassesComponent } from './emplois-classes/emplois-classes.component';
registerLocaleData(localeFr);
@NgModule({
  declarations: [EnseignantComponent,ModifierEmploisComponent,ModalwindowComponent,EmploisClassesComponent ],
  imports: [
    NgbCarouselModule.forRoot(),
    FlatpickrModule.forRoot(),
    NgbAlertModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    MatSidenavModule,
    MatButtonModule,  MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatChipsModule,
    MatPaginatorModule ,
   
    CommonModule, FormsModule, CalendarModule,
    NgbModule.forRoot(),
    CommonModule, 
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    FormsModule,
    ReactiveFormsModule,
   
    SharedPipesModule, CommonModule,UpdateEmploisRoutingModule
  ],
  entryComponents:[ModalwindowComponent]
  ,providers:[ { provide: LOCALE_ID, useValue: 'fr-FR'},]
})
export class EmploisUpdateModule { }
