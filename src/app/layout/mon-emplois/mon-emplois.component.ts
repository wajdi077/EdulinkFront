import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { EmploisService } from '../../layout/gestion-emplois/emploisservice';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as decode from 'jwt-decode';
import {Location, DatePipe} from '@angular/common';
import { Jour } from '../../layout/gestion-emplois/jour';
import { EspaceprofesseurService } from './espaceprofesseur.service';
import { EleveEmploi } from 'src/app/espace-parent/service/eleve-emploi';
import { EspaceParrainService } from 'src/app/espace-parent/service/espace-parrain.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Eleveservice } from '../gestion-eleves/gestion-eleves.service';
import { SelectionComponent } from 'src/app/shared/generic-components/selection.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CONFIG } from 'src/app/config';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { SocketService } from 'src/app/services/socket.service';
import { Message } from 'src/app/model/messagesecoket';

@Component({
  selector: 'app-mon-emplois',
  templateUrl: './mon-emplois.component.html'
  ,animations: [routerTransition()],providers: [EspaceprofesseurService,EspaceParrainService,Eleveservice,DatePipe],
  styleUrls: ['./mon-emplois.component.scss']
})
export class MonEmploisComponent  extends SelectionComponent implements OnInit {
//new declaration 
items = [];
@ViewChild('script') script: ElementRef;
displayedColumns: string[] = ['heureJour','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
jour: any;
heure: any;
lundi = 'Lundi';
mardi = 'Mardi';
mercredi = 'Mercredi';
jeudi = 'Jeudi';
vendredi = 'Vendredi';
samedi = 'Samedi';
heures: any[]=[];
jours= [
  {id: 1, jour:'Lundi'},
  {id: 2, jour:'Mardi'},
  {id: 3, jour:'Mercredi'},
  {id: 4, jour:'Jeudi'},
  {id: 5, jour:'Vendredi'},
  {id: 6, jour:'Samedi'}
];
id:string;
mySubscription: any;
programme: EleveEmploi[];
programmes:any[] =[];

pg_test: EleveEmploi;
nomclasse: string;
  elevess: any[];
  checklentgh=0;
  classencours: Classes;
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

  readonly = false; 

  k : number ;

  private _isEnabled: boolean = false;
  count: any;
  eleve: Eleves;
  value: boolean;
  heurenows: string;
getheuress() {
    
  this.emploisservicenew.getAllHeures()
    .subscribe((heuress) => {
      this.heures = heuress;
    }, error => {
      console.log(error);
    });
}
getEmploiprof() {
 
  this.emploisservicenew.getEmploiProf(this.username)
    .subscribe(pg =>{this.programme = pg
    this.programmes=pg;
    });
}
ngOnDestroy() {
  if (this.mySubscription) {
    this.mySubscription.unsubscribe();
  }
}
getPg1()  {
  this.emploisservicenew.getAllHeures()
  .subscribe((heuress) => {
    this.heures = heuress;
    console.log(heuress)
  this.emploisservicenew.getEmploiProf(this.username)
    .subscribe(pg =>{this.programme = pg
    this.programmes=pg;


  console.log("entry 1")
  for ( let i = 0;i<this.jours.length;i++ ){
    console.log("entry 2")
    for ( let j = 0;j<this.heures.length;j++ ){
      console.log("entry 3")
      if(this.programme!=undefined){
        console.log("entry 4")
        let s= this.programme.find(pg=> pg.jour.id=== (this.jours[i].id as number));
        this.pg_test = this.programme.find(pg=> pg.jour.id===this.jours[i].id && pg.heure.id===this.heures[i].id);
      
        if(this.pg_test!=undefined)

        if(this.pg_test.prof!=undefined){
          console.log("entry 5")
         let date = new Date();
         let heure = this.datePipe.transform(date, 'yyyy-MM-dd:HH');
         let a = this.datePipe.transform(this.pg_test.dateprog, 'yyyy-MM-dd:HH');
         console.log("entry 5"+a)
         console.log("entry 5"+heure)
         if(heure!=a)
         {
          console.log("entry 6")
         break;
         }
         else if(heure==a) {
          console.log("entry 7")
          console.log(this.pg_test.id)
          this.getAllElevesbyclasseEncours(this.pg_test.id );
          this.classencours = this.pg_test.classe;
         }
         return this.pg_test;
        }
           
            
            //this.pg_test.heure.id +'/'+this.pg_test.jour.id;
     
          }
    }
  }
});
}, error => {
  console.log(error);
});
   }
getPg(h: any, j: any)  {
  if(this.programme!=undefined){
   let s= this.programme.find(pg=> pg.jour.id=== (j.id as number));
   this.pg_test = this.programme.find(pg=> pg.jour.id===j.id && pg.heure.id===h.id);
   this.programmes
   if(this.pg_test!=undefined)
   if(this.pg_test.prof!=undefined){
    let date = new Date();
    let heure = this.datePipe.transform(date, 'yyyy-MM-dd:HH');
    let a = this.datePipe.transform(this.pg_test.dateprog, 'yyyy-MM-dd:HH');
    if(heure==a)
    {
      console.log(this.pg_test.id)
     this.getAllElevesbyclasseEncours(this.pg_test.id );
      this.classencours = this.pg_test.classe;
    }
    return this.pg_test;
   }
      
       
       //this.pg_test.heure.id +'/'+this.pg_test.jour.id;

     }
   }
   getlisteleve(){
    let date = new Date();
    let heure = this.datePipe.transform(date, 'yyyy-MM-dd:HH');
    this.heures.forEach(function(p) {
      let s= this.programme.find(pg=>pg.heure.id===p.id);
      let a = this.datePipe.transform(s.dateprog, 'yyyy-MM-dd:HH');
      if( a==heure )
      { console.log(p.dateprog);
      
        this.getAllElevesbyclasseEncours(p.classe.id );
      }
    });
   
   }
   getClasseELEVE()  {
    let date = new Date();
    let heure = this.datePipe.transform(date, 'yyyy-MM-dd:HH');
    let d = new Date();
    console.log(heure);
  console.log(this.programmes);
  for (let i =0;i<this.programmes.length;i++)
  {console.log(i);
    let a = this.datePipe.transform(this.programme[0].dateprog, 'yyyy-MM-dd:HH');
    console.log(a);
  }
  this.programme.forEach(p=> {
    let a = this.datePipe.transform(p.dateprog, 'yyyy-MM-dd:HH');
    console.log(p.dateprog);
    console.log(a);
    if( a==heure )
    { console.log(p.dateprog);
    
      this.getAllElevesbyclasseEncours(p.id );
    }

  });

     //let s=  this.programme.find(pg=> this.datePipe.transform(pg.dateprog, 'yyyy-MM-dd:HH')=== (heure as string));
   //  console.log(s.dateprog);

   
       
     }
   clickGoBack(){
       this.location.back();
   }
   getAllElevesbyclasseEncours(id :any ){  this.eleveService.getAllElevesbyclasseEncours(id)
    .subscribe((elevess) => {
            this.elevess = elevess;
            console.log(this.elevess);
            console.log("id eleve "+this.elevess[0].id)
            this.checklentgh=1;
        },
        error => {
            alert(error);
        });

}

    list = [
        {id: 1, name: 'Lundi'},
        {id: 2, name: 'Mardi'},
        {id: 3, name: 'Mercredi'},
        {id: 4, name: 'Jeudi'},
        {id: 5, name: 'Vendredi'},
        {id: 6, name: 'Samedi'}
       
    ];
 
  p :Emplois ;

  emploisMardi: any[];
  emploisMercredi: any[];
  emploisJeudi: any[];
  emploisVendredi: any[];
  emploisSamedi: any[];
  emploisLundi: any[];
  emplois: any[];
  username: any;
  heurenow :string;
  myDate = new Date();
  constructor(private absenceservice:EspaceprofesseurService,private formBuilder:FormBuilder,private socketService: SocketService ,private eleveService: Eleveservice,private datePipe: DatePipe,private emploisservicenew:EspaceParrainService,private emploisservice : EspaceprofesseurService,private cdr: ChangeDetectorRef, private router:Router,
    private activateRoute:ActivatedRoute,
    private location: Location) {

    super();
      this.heurenow = this.datePipe.transform(this.myDate, 'yyyy-MM-dd:HH');
      this.heurenows = this.datePipe.transform(this.myDate, 'yyyy-MM-dd:HH:mm');

      this.exclusform = this.formBuilder.group({
        'remarque': ['', [Validators.minLength(1), Validators.maxLength(20)]]
       
      
      });
     }

  ngOnInit() {
    this.initializeWebSocketConnection();
    this.router.navigated = false;
    this.getheuress();
    this.getusername();
    this.getEmploiprof();
 

 this.getheuress()
 //this.getPg1();

  }
getusername(){

  if(localStorage.getItem('token') != null){
    var decoded = decode(localStorage.getItem('token'));
this.username = decoded.sub;
console.log("username"+this.username);
}
}


//get emplois 
 getEmplois(){
  if(localStorage.getItem('token') != null){
    var decoded = decode(localStorage.getItem('token'));
this.username = decoded.sub;
console.log("username"+this.username);
}console.log("username in component"+ this.username);
   this.emploisservice.getAllbyusername(this.username)
 
  .subscribe((emplois) => {
      this.emplois = emplois;
      console.log(emplois);
  }, error => {
      console.log(error);
  });
 }
 getemploisLundi() {
  if(localStorage.getItem('token') != null){
    var decoded = decode(localStorage.getItem('token'));
this.username = decoded.sub;
console.log("username"+this.username);
}

console.log("username in component"+ this.username);
   this.emploisservice.getemploisbyprofandday(this.username,this.lundi)
 
  .subscribe((emploisLundi) => {
      this.emploisLundi = emploisLundi;
      console.log(emploisLundi);
  }, error => {
      console.log(error);
  });

 }
 getemploisMardi() {
  if(localStorage.getItem('token') != null){
    var decoded = decode(localStorage.getItem('token'));
this.username = decoded.sub;
console.log("username"+this.username);
}console.log("username in component"+ this.username);
   this.emploisservice.getemploisbyprofandday(this.username,this.mardi)
 
  .subscribe((emploisMardi) => {
      this.emploisMardi = emploisMardi;
      console.log(emploisMardi);
  }, error => {
      console.log(error);
  });

 }
 getemploisMercredi() {
  if(localStorage.getItem('token') != null){
    var decoded = decode(localStorage.getItem('token'));
this.username = decoded.sub;
console.log("username"+this.username);
}console.log("username in component"+ this.username);
   this.emploisservice.getemploisbyprofandday(this.username,this.mercredi)
 
  .subscribe((emploisMercredi) => {
      this.emploisMercredi = emploisMercredi;
      console.log(emploisMercredi);
  }, error => {
      console.log(error);
  });

 }
 getemploisJeudi() {
  if(localStorage.getItem('token') != null){
    var decoded = decode(localStorage.getItem('token'));
this.username = decoded.sub;
console.log("username"+this.username);
}console.log("username in component"+ this.username);
   this.emploisservice.getemploisbyprofandday(this.username,this.jeudi)
 
  .subscribe((emploisJeudi) => {
      this.emploisJeudi = emploisJeudi;
      console.log(emploisJeudi);
  }, error => {
      console.log(error);
  });

 }
 getemploisVendredi() {
  if(localStorage.getItem('token') != null){
    var decoded = decode(localStorage.getItem('token'));
this.username = decoded.sub;
console.log("username"+this.username);
}console.log("username in component"+ this.username);
   this.emploisservice.getemploisbyprofandday(this.username,this.vendredi)
 
  .subscribe((emploisVendredi) => {
      this.emploisVendredi = emploisVendredi;
      console.log(emploisVendredi);
  }, error => {
      console.log(error);
  });

 }
 getemploisSamedi() {
  if(localStorage.getItem('token') != null){
    var decoded = decode(localStorage.getItem('token'));
this.username = decoded.sub;
console.log("username"+this.username);
}console.log("username in component"+ this.username);

   this.emploisservice.getemploisbyprofandday(this.username,this.samedi)
 
  .subscribe((emploisSamedi) => {
      this.emploisSamedi = emploisSamedi;
      console.log(emploisSamedi);
  }, error => {
      console.log(error);
  });

 }
 



 getheures() {
 
    this.emploisservice.getAllHeures()
        .subscribe((heures) => {
            this.heures = heures;
            console.log(heures);
        }, error => {
            console.log(error);
        });
}

color() {
  var element = this.script.nativeElement;
  var script = document.createElement("script");
 // script.style.color="red";
  document.getElementById("script");

  
  // document.getElementById("script").style.color = "red";
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
  this.absenceservice.retenu(this.id,this.eleve.numInscription,this.exclusform.controls['remarque'].value)
    .subscribe((res) => {
     
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
export class Emplois {

  public typeprog :any ;
  public matiere :{} ;
  public salle :{} ;
 




  public classe:{};
  public jour : {} ; 
  public heure :Heures;


  public constructor() {
  }




}


export class Matiere {
 
  public nommatiereFR: string;


  public constructor() {
  }}
  export class Classes {
public id:any;
    public nomclasse: string;
    public niveau : string ;
    public remarque: string;

    public constructor() {
    }}
    export class Salle {

      public nomSalle: string;
      public type : string ;
      public remarque: string;
  
      public constructor() {
      }}


      export class Heures {
    
        public heureDebut: string;
        public heureFin :string ;
     
    
        public constructor() {
        }}