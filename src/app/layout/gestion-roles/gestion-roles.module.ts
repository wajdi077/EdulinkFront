import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbAlertModule, NgbCarouselModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedPipesModule} from '../../shared/pipes/shared-pipes.module';
import {GestionRolesRoutingModule} from "./gestion-roles-routing.module";
import {GestionRolesComponent} from "./gestion-roles.component";
import {RolesService} from "./gestion-roles.service";
import {AccessUrlComponent} from "./components/access-url/access-url.component";





@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        NgbModule.forRoot(),
        GestionRolesRoutingModule,
        
        FormsModule,
        ReactiveFormsModule,
        SharedPipesModule,

    ],
    declarations: [
        GestionRolesComponent,
        AccessUrlComponent,

    ],

    entryComponents: [

    ],

    providers: [
        RolesService,
        NgbModule

    ]
})
export class GestionRolesModule {
}
