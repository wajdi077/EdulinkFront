import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as decode from 'jwt-decode';
import { DatePipe } from '@angular/common';
import { CONFIG } from 'src/app/config';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Message } from 'src/app/model/messagesecoket';
import { SocketService } from 'src/app/services/socket.service';
import { EspaceprofesseurService } from 'src/app/layout/mon-emplois/espaceprofesseur.service';
import { LoginService } from 'src/app/login/login/login.service';
import { User } from 'src/app/layout/gestion-utilisateurs/user';
import { TopbarService } from './topbar.service';
@Component({
  selector: 'app-topnavbar',
  templateUrl: './topnavbar.component.html',
  styleUrls: ['./topnavbar.component.scss'],
  providers: [DatePipe,EspaceprofesseurService,LoginService,TopbarService]
})
export class TopnavbarComponent implements OnInit {
  date: string;
  public username; 
  myDate = new Date();
  exclus ="exclus";
  retenu="retenu";
count =0;
  countretenu =0;
  user :User;
  profil: string;
  public notifications = 0;

  constructor(private toservice:TopbarService,   private socketService: SocketService, public router: Router,private datePipe: DatePipe,private profservice :EspaceprofesseurService,private loginService :LoginService) {
    this.date = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
   this.messages=profservice.messages;

   



   }
   private serverUrl = CONFIG.URLsocket + 'socket'
   isLoaded: boolean = true;
   isCustomSocketOpened = false;
   private stompClient;
   messagesretenu: Message[] = [];
   messages: Message[] = [];
  ngOnInit() {

     
    this.initializeWebSocketConnection();
    this.notificationnote();
    if(localStorage.getItem('token') != null){
      var decoded = decode(localStorage.getItem('token'));
  this.username = decoded.sub;
  this.getUserbyusername();
 // this.socketService.postnotif( this.username).subscribe(res => {
   // console.log(res);
  //})
  }
  }

  datasource:any ;

x:any ;
  notificationnote()
  {
    this.toservice.getnotifsbyday().subscribe((res:any) => {
       console.log(res);
     this.datasource=res ;
     console.log(this.datasource)

     this.x = this.datasource.length;
     console.log("x"+this.x);

     this.stompClient.subscribe('/topic/notification', notifications => {

      // Update notifications attribute with the recent messsage sent from the server
              this.notifications = JSON.parse(notifications.body).count;
          })
      });
   
  }

  




onLoggedout() {
    localStorage.removeItem('token');
}

sendMessageUsingSocket() {
  let a,b,c;
    let message: Message = { message: a, fromId: b, toId: c };
    this.stompClient.send("/socket-subscriber/send/messageretenu", {}, JSON.stringify(message));
  
}

sendMessageUsingRest() {
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
  //  that.openGlobalSocketretenu()
  });
}

openGlobalSocket() {
  this.stompClient.subscribe("/socket-publisher", (message) => {
  //  this.handleResult(message);
 this.handleResultretenu(message);
  });
}
vue(){
  this.x=0;


}

handleResult(message){
  if (message.body) {
    let messageResult: Message = JSON.parse(message.body);
    console.log(messageResult);
    this.messages.push(messageResult);
    console.log(this.messages);

   
  }

}
openGlobalSocketretenu() {
  this.stompClient.subscribe("/socket-publisher", (message) => {
    this.handleResultretenu(message);
  });
}
handleResultretenu(messageretenu){
  if (messageretenu.body) {
    let messageResult: Message = JSON.parse(messageretenu.body);
    console.log(messageResult);
    if (messageResult.toId=='retenu'){
      this.countretenu++;
    this.messagesretenu.push(messageResult);}
    if (messageResult.toId=='exclus'){
      this.messages.push(messageResult);
      this.count++;
    }
    

for (var i = 0; i < this.messagesretenu.length; i++) {
  var indexretenu = this.messagesretenu[i] ;
  
 if(this.messagesretenu[i].toId=='retenu'){
 
 }
 else if (this.messagesretenu[i].toId=='exclus'){}
 else {
  this.countretenu -- ;
  this.count--;
 }
}
  

   
  }
}
initcount(){
  this.count=0;
}
initretenu(){
  this.countretenu=0;
}

getUserbyusername(){
  console.log("lauouuuut111111111111111111111 espace enseignant");

  var decoded = decode(localStorage.getItem('token'));
 this.username = decoded.sub;
this.loginService.getUserbyusername(this.username)

  .subscribe((user) => {
      this.user= user;
      this.profil=user.profil;
  
      if ( this.profil=="Parrain") {
     
          console.log("Edulink");
   
         }
         if( this.profil=="Enseignant"){
          console.log("Edulink");
           }
           else {
            console.log("Edulink");
           }
 
  }, error => {
      console.log(error);
  });
}

}
