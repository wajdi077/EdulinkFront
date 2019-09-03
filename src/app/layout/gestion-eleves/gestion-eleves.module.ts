import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Eleveservice} from "./gestion-eleves.service";
import {NgbAlertModule, NgbCarouselModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {SharedPipesModule} from '../../shared/pipes/shared-pipes.module';
import { GestionEleveRoutingModule } from './gestion-eleves-routing.module';
import { AddNewEleveComponent } from './add-new-eleve/add-new-eleve.component';
import { GestionElevesComponent } from './gestion-eleves.component';
import { DetailEleveComponent } from './detail-eleve/detail-eleve.component';
import { AddParrainseleveComponent } from './add-parrainseleve/add-parrainseleve.component';
import { MatStepperModule, MatHorizontalStepper } from '@angular/material/stepper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatAutocompleteModule, MatFormFieldModule, MatBadgeModule, MatBottomSheetModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule } from '@angular/material';


@NgModule({
  imports: [
    NgbCarouselModule.forRoot(),
    NgbAlertModule.forRoot(),
    NgbModule.forRoot(),
    CommonModule,  
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,MatAutocompleteModule,MatFormFieldModule,MatStepperModule,  MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    MatInputModule,
    SharedPipesModule,
    GestionEleveRoutingModule,
  ],
  providers: [
    Eleveservice,AddNewEleveComponent,
    NgbModule

],
  declarations: [
    GestionElevesComponent,
    AddNewEleveComponent,
    DetailEleveComponent,
    AddParrainseleveComponent,
  ],
  entryComponents: [AddNewEleveComponent
  
  
],


})
export class GestionElevesModule { }
