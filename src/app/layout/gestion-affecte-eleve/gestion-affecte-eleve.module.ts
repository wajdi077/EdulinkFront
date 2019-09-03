import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbAlertModule, NgbCarouselModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedPipesModule} from '../../shared/pipes/shared-pipes.module';
import { MatButtonModule, MatBadgeModule } from '@angular/material';
import { GestionAffecteEleveComponent } from './gestion-affecte-eleve.component';
import { AffectationEleveRoutingModule } from './gestion-affecte-eleve-routing.module';
import { AffectationEleveService } from './gestion-affecte-eleve.service';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),MatButtonModule,MatBadgeModule,
        NgbModule.forRoot(),
        AffectationEleveRoutingModule,
        
        FormsModule,
        ReactiveFormsModule,
        SharedPipesModule,
    ],
    declarations: [
        GestionAffecteEleveComponent,
       
        // MakeFilterPipe

    ],

   

    providers: [
        AffectationEleveService,
                NgbModule

    ],
    exports:[GestionAffecteEleveComponent]
})
export class GestionAffecteEleveModule {
}
