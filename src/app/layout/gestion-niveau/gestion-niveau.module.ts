import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbAlertModule, NgbCarouselModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';





import {SharedPipesModule} from '../../shared/pipes/shared-pipes.module';
import { MatButtonModule, MatBadgeModule } from '@angular/material';
import { GestionNiveauComponent } from './gestion-niveau.component';
import { GestionNiveauRoutingModule } from './gestion-niveau-routing.module';
import { NiveauService } from './gestion-niveau.service';
import { EditNiveauComponent } from './edit-niveau/edit-niveau.component';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),MatButtonModule,MatBadgeModule,
        NgbModule.forRoot(),
        GestionNiveauRoutingModule,
        
        FormsModule,
        ReactiveFormsModule,
        SharedPipesModule,
    ],
    declarations: [
        GestionNiveauComponent,
        EditNiveauComponent,
        
       
        // MakeFilterPipe

    ],

   

    providers: [
        NiveauService,
                NgbModule

    ],
    exports:[GestionNiveauComponent]
})
export class GestionNiveauModule {
}
