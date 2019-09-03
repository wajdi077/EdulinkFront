import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { SendComponent } from './send/send.component';
import { routerTransition } from '../../router.animations';
import { UtilisateursService } from '../gestion-utilisateurs/gestion-utilisateurs.service';
import * as decode from 'jwt-decode';
import { MessageService } from './gestion-message.service';
import { Subject } from 'rxjs/Subject';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { SelectionComponent } from '../../shared/generic-components/selection.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
const states = ['admin'];
@Component({
  selector: 'app-gestion-message',
  templateUrl: './gestion-message.component.html',
  styleUrls: ['./gestion-message.component.scss'],animations: [routerTransition()],
  providers:[MessageService,UtilisateursService]
 
})
export class GestionMessageComponent extends SelectionComponent implements OnInit {
  messages: any = {
    delete: 'Voulez vous vraiment supprimer les Objet  selectionnées ?',
};
private _success = new Subject<string>();
  messagerecu: any;
  username: any;
  users: User[];
  sendform: FormGroup;
  //ddddd

  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  public model: any;
  public  usernames: Array<String> = [];
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 20))
    )
  message: any;

  constructor(private userService: UtilisateursService,private formBuilder: FormBuilder,
    private messageservice:MessageService,private modalService: NgbModal,private cdr: ChangeDetectorRef) {
    super();
    
    this.sendform = this.formBuilder.group({
 
      'reciever': ['', [Validators.required]],
      'sujet': ['', Validators.required],
      'message': ['', Validators.required ]
   
  });

  }
  getlistofusername(){


    for (var i=1 ;i<this.users.length;i++)
    {

break;


    }
  }
  getAlluser(){



    this.userService.getAllUtilisateurs().subscribe((data)=>{

     
      this.users=data;
      for (var i=0 ;i<this.users.length;i++)
      {
    
this.usernames.push(this.users[i].username);
states.push(this.users[i].username);
  
  
  
  
      }
    });
    
  }
  ngOnInit() {
    this.userService.getAllUtilisateurs().subscribe((data)=>{

     
      this.users=data;
      for (var i=0 ;i<this.users.length;i++)
      {
    
this.usernames.push(this.users[i].username);
states.push(this.users[i].username);
  console.log(this.users[i].username);
  
  
  
      }
    });
    this.getAlluser();
    if(localStorage.getItem('token') != null){
      var decoded = decode(localStorage.getItem('token'));
  this.username = decoded.sub;
 
  }
  this.getmessagerecu() ;
 // this.getlistofusername();
  }
  getmessagerecu(){


this.messageservice.getmessagerecu(this.username).subscribe((data)=>{


  this.messagerecu=data;

 
})


  }
  compose(u, n: any, modal) {

    let options: NgbModalOptions = {size: 'lg'};
    const modalRef = this.modalService.open(SendComponent, options);
    modalRef.componentInstance.salle = u;
}


deletemessage() {
  console.log(this._selected);
  if (confirm(this.messages.delete)) {
    //  console.log(this._selected);
      this.messageservice.deletemessage(this._selected).subscribe((res) => {
          //console.log(res);
          this._success.next(`Message supprimé avec succes`);
          if (res['response']) {
              this.getmessagerecu();
              this._success.next(`Message supprimee avec succes`);
          }
      })
  }
}

sendmessage(reciever,sujet,message){
  console.log("reciever");
console.log(this.sendform.controls['reciever'].value);

console.log("message"+message);
console.log("sujet"+sujet);
console.log("username"+this.username);
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
  
  getmessage(m){

    this.message=m;
  }
  
  
  
  
  

}
