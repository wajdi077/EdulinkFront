import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NgbAlertModule, NgbCarouselModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {SharedPipesModule} from '../../shared/pipes/shared-pipes.module';
import { GestionEmploisRoutingModule } from './gestion-emplois.routing.module';
import { GestionEmploisComponent } from './gestion-emplois.component';
import { EmploisService } from './emploisservice';
import { AddprogrammeComponent } from './addprogramme/addprogramme.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    NgbCarouselModule.forRoot(),
    NgbAlertModule.forRoot(),
    NgbModule.forRoot(),
    CommonModule, 
    
    FormsModule,
    ReactiveFormsModule,

    SharedPipesModule,
    GestionEmploisRoutingModule,
  ],
  providers: [

    NgbModule,EmploisService

],
  declarations: [
    GestionEmploisComponent,AddprogrammeComponent,
 
  ],
  entryComponents: [AddprogrammeComponent
  
  
],


})
export class GestionEmploisModule {


 }
