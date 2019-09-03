import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { NgbActiveModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilisateursService } from '../../gestion-utilisateurs/gestion-utilisateurs.service';
import { Router } from '@angular/router';
import { MessageService } from '../gestion-message.service';
import * as decode from 'jwt-decode';

import {Observable, Subject} from 'rxjs';


import { User } from '../../gestion-utilisateurs/user';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';


@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss'],animations: [routerTransition()]
  ,
  providers:[UtilisateursService]
})
export class SendComponent implements OnInit {
  users: any[];
  sendform: FormGroup;
  public username;
  public model: any;


  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  
  private _success = new Subject<string>();
  constructor(private formBuilder: FormBuilder,
    private cdr:ChangeDetectorRef,
    public activeModal: NgbActiveModal,public router: Router,
    private userService: UtilisateursService,private messageservice :MessageService
   ) { 


    this.sendform = this.formBuilder.group({
 
      'reciever': ['', [Validators.required, Validators.email]],
      'sujet': ['', Validators.required],
      'message': ['', Validators.required ]
   
  });
   }

  ngOnInit() {
    if(localStorage.getItem('token') != null){
      var decoded = decode(localStorage.getItem('token'));
  this.username = decoded.sub;
  this.getAlluser();
  }
  }
  getAlluser(){



    this.userService.getAllUtilisateurs().subscribe((data)=>{


      this.users=data;
    })
  }
  sendmessage(){

this.messageservice.sendmessage(this.sendform.controls['reciever'].value,this.sendform.controls['sujet'].value, this.sendform.controls['message'].value, this.username  )
.subscribe(
  (res) => {
      console.log(res);
      this._success.next(`Message envoyé avec succes`);
      if (res['response'] == true) {
        this._success.next(`Message envoyé avec succes`);
         
      }
  },
  error => {
      alert(error);
  });

  this._success.next(`Message envoyé avec succes`);
  }


/*  search = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    map(term => term === '' ? []
      : this.users.filter(v => v.email.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  )
*/
formatter = (x: {email: string}) => x.email;








}
