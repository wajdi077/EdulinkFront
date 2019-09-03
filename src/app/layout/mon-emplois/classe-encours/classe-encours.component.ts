import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Eleveservice } from '../../../layout/gestion-eleves/gestion-eleves.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { SocketService } from 'src/app/services/socket.service';
import { SelectionComponent } from '../../../shared/generic-components/selection.component';
import { routerTransition } from '../../../router.animations';
import { EspaceprofesseurService } from '../espaceprofesseur.service';
import { CONFIG } from 'src/app/config';
import { Message } from 'src/app/model/messagesecoket';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
@Component({
  selector: 'app-classe-encours',
  templateUrl: './classe-encours.component.html',
  styleUrls: ['./classe-encours.component.scss'],
    animations: [routerTransition()],
    providers:[ NgbModal,EspaceprofesseurService]
  
  
})
export class ClasseEncoursComponent extends SelectionComponent implements OnInit {
  //sorting
  items = [];
  @ViewChild('script') script: ElementRef;
  messagess: any = {
    delete: 'Voulez vous vraiment affecter les absences à  ces eleves  selectionnées ?',
};
private serverUrl = CONFIG.URLsocket  + 'socket'
isLoaded: boolean = true;
isCustomSocketOpened = false;
private stompClient;
private form: FormGroup;
private userForm: FormGroup;
messages: Message[] = [];
messagesretenu: Message[] = [];
exclusform: FormGroup;
  static $inject = ['$q', '$timeout', '$window'];
  key: string = 'nom'; //set default
  reverse: boolean = false;
  i: number;
  enabled: boolean = false;
  nomclasse :any ;
  readonly = false; 
  id : any ;  
  k : number ;
  elevess: Eleves[];
  private _isEnabled: boolean = false;
  count: any;
  eleve: Eleves;
  value: boolean;
  
  constructor(private socketService: SocketService ,private formBuilder:FormBuilder,
    private modalService: NgbModal,private eleveService: Eleveservice,
    public router: Router,private route: ActivatedRoute,private absenceservice:EspaceprofesseurService ) {
    super();
    this.exclusform = this.formBuilder.group({
      'remarque': ['', [Validators.minLength(1), Validators.maxLength(20)]]
     
    
    });

  }

  ngOnInit() {
   // this.nomclasse = this.route.snapshot.params['nomclasse'];
    this.id = this.route.snapshot.params['id'];
    console.log('esmliclasse est '+this.id)
  //this.getAllElevebyclasse();
  this.getAllElevesbyclasseEncours();
  this.initializeWebSocketConnection();
  }

color() {
    var element = this.script.nativeElement;
    var script = document.createElement("script");
   // script.style.color="red";
    document.getElementById("script");
  
    
    // document.getElementById("script").style.color = "red";
  }
  getAllElevesbyclasseEncours(){  
    this.eleveService.getAllElevesbyclasseEncours(this.id)
    .subscribe((elevess) => {
            this.elevess = elevess;
            console.log(this.elevess);
        },
        error => {
            alert(error);
        });

}
  getAllElevebyclasse(){  this.eleveService.getAllElevesbyclasse(this.nomclasse)
    .subscribe((elevess) => {
            this.elevess = elevess;
            console.log(this.elevess);
        },
        error => {
            alert(error);
        });

}

sort(key) {
  this.key = key;
  this.reverse = !this.reverse;
}
addAbsence(){
  this.k = 0 ;
    console.log(this._selected);
     
    this.absenceservice.addAbsence(this.id,this._selected)
      .subscribe((res) => {
             console.log(res);
             if (res['response']) {
                 this.getAllElevebyclasse();
             }
         })
     
  

      
  }

//modal 

checkboxes(u:Eleves)
      {
        this.eleve=u;
    
       var inputElems = document.getElementsByTagName("input");
       var tr = document.getElementsByTagName("tr");
       this.eleve.absent=true;
        this.count = 0;

        for (var i=0; i<this.elevess.length; i++) {      
           if (inputElems[i].type == "checkbox" && inputElems[i].checked == true){
              this.count++;
            //  tr[i].style.backgroundColor='Gray';
           
             
  
          
           }
         else if(inputElems[i].type == "checkbox" && inputElems[i].checked == false){
         // tr[i].style.backgroundColor='White';
        // this.eleve.absent=false;
        
         }
        }
     }
     
checkboxesExclus()
{
 var inputElems = document.getElementsByTagName("input");
 var inputCheck =document.getElementById("bexclus");
 var tr = document.getElementsByTagName("tr");
 var button = document.getElementsByTagName("button");

  this.count = 0;

  for (var i=0; i<inputElems.length; i++) {       
     if (inputElems[i].type == "checkbox" && inputElems[i].checked == true){
      this.count++;
        tr[i].style.backgroundColor='Gray';
       
        
       // button[i].disabled=true;
    
     }
   else if(inputElems[i].type == "checkbox" && inputElems[i].checked == false){
    tr[i].style.backgroundColor='';
   // button[i].disabled=false;
   }
  }
}
geteleveexclus(u:Eleves) {

  this.eleve=u;
 
}
geteleve(u:Eleves) {

  this.eleve=u;
  this.eleve.retenu=true;
}
retenu() {
  let date = new Date();
  this.sendMessageUsingSocket(this.eleve.nom+"  "+" "+this.eleve.prenom+" "+"a pris une retenu" +" ",date,"retenu"); 
    this.absenceservice.retenu(this.eleve.id,this.eleve.numInscription,this.exclusform.controls['remarque'].value)
      .subscribe((res) => {
       console.log("test retenu "+this.id);
         })

 
 
 
    }

    exclus(){

let date = new Date();


      this.eleve.exclus=true;
      this.sendMessageUsingSocket(this.eleve.nom+"  "+" "+this.eleve.prenom+" "+"est exclus" +" ",date,"exclus"); 
     this.absenceservice.exclus(this.id,this.eleve.numInscription,this.exclusform.controls['remarque'].value)
       .subscribe((res) => {
      //  date = res.date_Penalites ;
        console.log(res);
        console.log(res.id_penalites);
        console.log(this.messages);
   
          })
    } 
    sendMessageUsingSocket(object,from,to) {
      let a,b,c;
        let message: Message = { message: object, fromId: from, toId: to};
        this.stompClient.send("/socket-subscriber/send/message", {}, JSON.stringify(message));
      
    }
    sendMessageUsingSocketretenu(object,from,to) {
      let a,b,c;
        let message: Message = { message: object, fromId: from, toId: to};
        this.stompClient.send("/socket-subscriber/send/messageretenu", {}, JSON.stringify(message));
      
    }



    sendMessageUsingRest(object,from,to) {
      let a,b,c;
        let message: Message = {  message: a, fromId: b, toId: c };
        this.socketService.post(message).subscribe(res => {
          console.log(res);
        })
      
    }
    
    initializeWebSocketConnection() {
      let ws = new SockJS(this.serverUrl);
      this.stompClient = Stomp.over(ws);
      let that = this;
      this.stompClient.connect({}, function (frame) {
        that.isLoaded = true;
        that.openGlobalSocket()
        that.openGlobalSocketretenu()

      });
    }
    
    openGlobalSocket() {
      this.stompClient.subscribe("/socket-publisher", (message) => {
        this.handleResult(message);
      });
    }
    openGlobalSocketretenu() {
      this.stompClient.subscribe("/socket-publisher", (message) => {
        this.handleResultretenu(message);
      });
    }
    
    
    handleResult(message){
      if (message.body) {
        let messageResult: Message = JSON.parse(message.body);
        console.log(messageResult);
        this.messages.push(messageResult);
       
      }
    }
    handleResultretenu(messageretenu){
      if (messageretenu.body) {
        let messageResult: Message = JSON.parse(messageretenu.body);
        console.log(messageResult);
        this.messagesretenu.push(messageResult);
    
       
      }
    }
}
export class Exclus {
  private idEleve :any ;
  private remarque :any ;


	constructor(){}

	

}
export class Eleves {
   
  public id : any ;
  public nom: string;
  public prenom : string ;
  public niveauEtude : string ;
public dateNaissance : Date ;
  public sexe : string ; 
  public etat :string ;
  public cin : number ; 
public situationFamiliale : string ; 
  public remarque: string;
  public numInscription :string ;
  public exclus :any;
  public retenu:any;
public absent :any;
  public constructor(retenu,exclus) {
    this.retenu=false;
    this.exclus=false;
    this.absent=true;
  }}