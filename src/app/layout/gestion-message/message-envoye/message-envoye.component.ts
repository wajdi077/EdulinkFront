import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { MessageService } from '../gestion-message.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as decode from 'jwt-decode'

@Component({
  selector: 'app-message-envoye',
  templateUrl: './message-envoye.component.html',
  styleUrls: ['./message-envoye.component.scss'],animations: [routerTransition()],
  providers:[MessageService]
})
export class MessageEnvoyeComponent implements OnInit {
  messagerecu: any;
  username: any;
  message: any;
  constructor(private messageservice:MessageService,private modalService: NgbModal,private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    if(localStorage.getItem('token') != null){
      var decoded = decode(localStorage.getItem('token'));
  this.username = decoded.sub;
 
  }
  this.getmessageEnvoyee() ;
  }
  getmessage(m){

    this.message=m;
  }
  
  
  getmessageEnvoyee(){


    this.messageservice.getmessageenvoye(this.username).subscribe((data)=>{
    
    
      this.messagerecu=data;
    
      console.log(data);
    })
    
    
      }
}
