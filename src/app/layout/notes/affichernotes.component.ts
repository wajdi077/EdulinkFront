import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { EmploisService } from '../../layout/gestion-emplois/emploisservice';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as decode from 'jwt-decode';
import {Location, DatePipe} from '@angular/common';
import { Jour } from '../../layout/gestion-emplois/jour';
import { EleveEmploi } from 'src/app/espace-parent/service/eleve-emploi';
import { EspaceParrainService } from 'src/app/espace-parent/service/espace-parrain.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Eleveservice } from '../gestion-eleves/gestion-eleves.service';
import { SelectionComponent } from 'src/app/shared/generic-components/selection.component';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { CONFIG } from 'src/app/config';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { SocketService } from 'src/app/services/socket.service';
import { Message } from 'src/app/model/messagesecoket';
import { EspaceprofesseurService } from '../mon-emplois/espaceprofesseur.service';
import { NoteService } from './note.service';
import { Note } from './Note.model';



@Component({
  selector: 'app-notes',
  templateUrl: './affichernotes.component.html',
  animations: [routerTransition()],
  providers: [NoteService],
  styleUrls: ['./notes.component.scss']
})
export class AfficherNotesComponent implements OnInit {

    constructor (private noteservice:NoteService){

    }

  datasource: any ;
    ngOnInit() {
        this.getNotes();
    
}
itemsToIterate:any ;
getNotes() {
    this.noteservice.getAllnotes().subscribe(res => {
       this.datasource = res;
       this.itemsToIterate = this.datasource.slice(0).reverse();

       console.log(this.datasource);
      },
     error2 => {
        console.log(error2);
     });
}

 
  
  
   
  
  
    
  
   
    
 







  }
 
 
  
  
  
  
  
  
  
  
  