import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NgbAlertModule, NgbCarouselModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {SharedPipesModule} from '../../shared/pipes/shared-pipes.module';

import { GestionMessageComponent } from './gestion-message.component';
import { GestionMessageRoutingModule } from './gestion-message-routing.module';
import { MessageService } from './gestion-message.service';
import { SendComponent } from './send/send.component';
import { MessageEnvoyeComponent } from './message-envoye/message-envoye.component';
@NgModule({
  imports: [
    NgbCarouselModule.forRoot(),
    NgbAlertModule.forRoot(),
    NgbModule.forRoot(),
    CommonModule,  
    FormsModule,
    ReactiveFormsModule,
    
    SharedPipesModule,
    ReactiveFormsModule,
    SharedPipesModule,GestionMessageRoutingModule,
 
  ],
  providers: [MessageService,
   
    NgbModule

],
  declarations: [
    GestionMessageComponent,
    SendComponent,
    MessageEnvoyeComponent,
  ],
  entryComponents: [
    SendComponent
  
],


})
export class GestionMessageModule { }
