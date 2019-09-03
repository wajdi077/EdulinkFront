import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UploadRoutingModule} from './upload-routing.module';
import {UploadComponent} from './upload.component';
import {DetailsUploadComponent} from './details-upload/details-upload.component';
import {ListUploadComponent} from './list-upload/list-upload.component';

import { HttpClient } from '@angular/common/http';


import { FormUploadComponent } from './form-uploadEleve/form-upload.component';
import { UploadsalleComponent } from './uploadsalle/uploadsalle.component';
import { UploadclasseComponent } from './uploadclasse/uploadclasse.component';
import { UploadFileService } from './upload-file.service';
import { UploadsurveillantComponent } from './uploadsurveillant/uploadsurveillant.component';
import { GestionNombreHeurParniveauMatiereComponent } from './gestion-nombre-heur-parniveau-matiere/gestion-nombre-heur-parniveau-matiere.component';




@NgModule({
    imports: [
        CommonModule,
        UploadRoutingModule

    ],
    declarations: [
    UploadComponent,DetailsUploadComponent,ListUploadComponent,FormUploadComponent, UploadsalleComponent, UploadclasseComponent, UploadsurveillantComponent, GestionNombreHeurParniveauMatiereComponent
    ]
    ,providers:[UploadFileService]
})
export class UploadModule {}
