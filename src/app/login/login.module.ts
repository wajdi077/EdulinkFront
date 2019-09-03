import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';

import { FormsModule, ReactiveFormsModule }         from '@angular/forms';
import { WarningComponent } from './warning/warning.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [LoginComponent, WarningComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,  FormsModule,NgbModule.forRoot(),
    ReactiveFormsModule
  ],
  entryComponents: [WarningComponent]
})
export class LoginModule { }
