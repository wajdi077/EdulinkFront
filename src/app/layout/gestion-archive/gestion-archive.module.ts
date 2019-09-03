

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionArchiveService } from './gestion-archive.service';

import { GestionArchiveComponent } from './gestion-archive/gestion-archive.component';
import { GestionArchiveRoutingModule } from './gestion-archive.routing.module';

@NgModule({
  declarations: [GestionArchiveComponent],
  imports: [
    CommonModule,GestionArchiveRoutingModule
  ],
  providers: [GestionArchiveService]
})
export class GestionArchiveModule { }
