import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbAlertModule, NgbCarouselModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



import {SharedPipesModule} from '../../shared/pipes/shared-pipes.module';
import { MatButtonModule, MatBadgeModule } from '@angular/material';
import { GestionEnseignantComponent } from './gestion-enseignant.component';
import { GestionEnseignantRoutingModule } from './gestion-enseignant-routing.module';
import { EnseignantService } from './gestion-enseignant.service';
import { GestionaffectationniveauComponent } from './gestionaffectationniveau/gestionaffectationniveau.component';
import { NiveauService } from '../gestion-niveau/gestion-niveau.service';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),MatButtonModule,MatBadgeModule,
        NgbModule.forRoot(),
        GestionEnseignantRoutingModule,

        
        FormsModule,
        ReactiveFormsModule,
        SharedPipesModule,
    ],
    declarations: [
        GestionEnseignantComponent,
        GestionaffectationniveauComponent,
    
    ],

   
    providers: [
        EnseignantService ,
        NiveauService,
        NgbModule
    ],
    exports:[GestionEnseignantComponent]
})
export class GestionEnseignantModule {
}
