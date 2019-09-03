import { NgModule } from '@angular/core';
import { NavbarParentComponent } from './navbar-parent/navbar-parent.component';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EspaceParrainRoutingModule } from './espace-parrain-routing.module';
import { EspaceParentComponent } from './espace-parent.component';
import { DashboardParrainComponent } from './dashboard-parrain/dashboard-parrain.component';
import { EleveParrainModule } from './eleve-parrain/eleve-parrain.module';
import { FooterBarParrainComponent } from './footer-bar-parrain/footer-bar-parrain.component';
// import { MdCardModule } from '@angular/material';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
    imports: [
        CommonModule,
        EspaceParrainRoutingModule,
        EleveParrainModule,
        MDBBootstrapModule.forRoot(),
        MatSidenavModule,
        MatButtonModule
        //  ,
        //  MdCardModule
    ],
    providers: [
          NgbModule
    ],
    declarations: [
        NavbarParentComponent,
        EspaceParentComponent,
        DashboardParrainComponent,
        FooterBarParrainComponent
    ]
    ,exports:[  
        NavbarParentComponent,
        EspaceParentComponent,
        DashboardParrainComponent,
        FooterBarParrainComponent]
})

export class EspaceParentModule {}
