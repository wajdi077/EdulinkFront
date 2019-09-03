import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbAlertModule, NgbCarouselModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import {UtilisateursService} from './gestion-utilisateurs.service';
import {SitesService} from './sites.service';

import {GestionUtilisateursRoutingModule} from './gestion-utilisateurs-routing.module';
import {GestionUtilisateursComponent} from './gestion-utilisateurs.component';
import {AddNewUserComponent} from './components/add-new-user/add-new-user.component';
import {MailUserComponent} from './components/mail-user/mail-user.component';
import {UserSitesComponent} from './components/user-sites/user-sites.component';


import {SharedPipesModule} from '../../shared/pipes/shared-pipes.module';
import {RolesService} from "../gestion-roles/gestion-roles.service";
import { MatButtonModule, MatBadgeModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),MatButtonModule,MatBadgeModule,
        NgbModule.forRoot(),
        GestionUtilisateursRoutingModule,
        
        FormsModule,
        ReactiveFormsModule,
        SharedPipesModule,
    ],
    declarations: [
        GestionUtilisateursComponent,
        AddNewUserComponent,
        MailUserComponent,
        UserSitesComponent,
        // MakeFilterPipe

    ],

    entryComponents: [
        AddNewUserComponent,
        MailUserComponent,
        UserSitesComponent
    ],

    providers: [
        UtilisateursService,
        SitesService,
        RolesService,
        NgbModule

    ],
    exports:[GestionUtilisateursComponent]
})
export class GestionUtilisateursModule {
}
