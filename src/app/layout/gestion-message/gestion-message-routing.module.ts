import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestionMessageComponent } from './gestion-message.component';
import { SendComponent } from './send/send.component';
import { MessageEnvoyeComponent } from './message-envoye/message-envoye.component';




const routes: Routes = [
    { path: '', component: GestionMessageComponent },
    { path: 'message-envoye', component: MessageEnvoyeComponent },
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionMessageRoutingModule { }
