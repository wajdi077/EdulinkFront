import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AsidenavComponent } from './shared/asidenav/asidenav.component';
import { FooternavbarComponent } from './shared/footernavbar/footernavbar.component';
import { TopnavbarComponent } from './shared/topnavbar/topnavbar.component';
import { SettingnavbarComponent } from './shared/settingnavbar/settingnavbar.component';
import { HttpModule} from '@angular/http';
import { AuthGuard } from './shared/guard/auth.guard';
import { LayoutModule } from './layout/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import swal, { SweetAlertOptions } from 'sweetalert2';
import { HttpClientModule } from '@angular/common/http';
import { EspaceParentModule } from './espace-parent/espace-parrain.module';
import { ToastrModule } from 'ngx-toastr';


// For MDB Angular Pro

import {
 MatAutocompleteModule,
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

 MatFormFieldModule,
} from '@angular/material';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SocketService } from './services/socket.service';
import { from } from 'rxjs';
import { ChartsModule } from 'angular-bootstrap-md';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

registerLocaleData(en);

@NgModule({
 declarations: [
   AppComponent,
 ],
 imports: [
   BrowserModule,HttpModule,BrowserAnimationsModule,HttpClientModule
   ,
   MatCardModule, NgbModule.forRoot(),MatButtonModule,MatBadgeModule,
   LayoutModule,
   FormsModule,
   ReactiveFormsModule,
   AppRoutingModule, ToastrModule.forRoot({ timeOut: 3000 }),
   EspaceParentModule,
   MatSidenavModule,
   ChartsModule,
 ],

 providers: [AuthGuard,SocketService],
 bootstrap: [AppComponent],

})
export class AppModule { }
//platformBrowserDynamic().bootstrapModule(AppModule);