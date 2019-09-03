import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RolesService } from '../../gestion-roles/gestion-roles.service';
import { LoginService } from 'src/app/login/login/login.service';
import { User } from 'src/app/model/user';
import { Access } from '../../gestion-roles/gestion-roles.component';
import { SelectionComponent } from 'src/app/shared/generic-components/selection.component';
import { GestionPenalitesService } from '../../gestion-exclus/gestion-penalites.service';
import * as decode from 'jwt-decode';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-gesion-retenu',
  templateUrl: './gesion-retenu.component.html',
  styleUrls: ['./gesion-retenu.component.scss'], animations: [routerTransition()], providers: [NgbModal,RolesService,LoginService,GestionPenalitesService]
})
export class GesionRetenuComponent extends SelectionComponent implements OnInit {
  retenu: any[];
  count: any;
  enabled: boolean = false;
  statut: any;
  user: User;
  access: Access = new Access;
  public username;
  profil: string;
  idRetenu: number;
  r: Object;
  constructor(public activatedRoute:ActivatedRoute,private penalitesservice :GestionPenalitesService,private rolesService: RolesService, private cdr: ChangeDetectorRef,private loginService: LoginService) {
    super();

  }

  ngOnInit() {

    this.getAllretenus();
  }
  getAllretenus() {
    this.penalitesservice.getAllretenu()
        .subscribe((classes) => {
            this.retenu = classes;
            console.log(classes);
        }, error => {
            console.log(error);
        });
}

checkboxes()
      {
        //this.eleve=u;
    
        var inputElems = document.getElementsByTagName("input");
        var tr = document.getElementsByTagName("tr");
        this.count = 0;

        for (var i=0; i<=this.retenu.length; i++) {       
           if (inputElems[i].type == "checkbox" && inputElems[i].checked == true){
              this.count++;
              
              tr[i].style.backgroundColor='lightblue';
             // alert(this.count);
           }
         else if(inputElems[i].type == "checkbox" && inputElems[i].checked == false){
          tr[i].style.backgroundColor='';
         }
        }
     }

     getAccess(profil:any){
      console.log(" getAccess()");
      console.log(this.user.profil);
      this.rolesService.getAccess('Gestion des classes',this.profil)
               .subscribe((access) => {
                   this.access= access;
                   console.log("hello slim");
                   console.log(this.access.gestion);
                   console.log(access.gestion);
               }, error => {
                   console.log(error);
               });
       }
       accessdenied(){
  
          if(localStorage.getItem('token') != null){
           var decoded = decode(localStorage.getItem('token'));
           this.getAccess(this.profil);
       this.username = decoded.sub;
     
  
  
  }



  
       }
      
      
      
      
      
       getUserbyusername( ){
     
    
        var decoded = decode(localStorage.getItem('token'));
       this.username = decoded.sub;
   this.loginService.getUserbyusername(this.username)
  
        .subscribe((user) => {
            this.user= user;
            this.profil=this.user.profil;
      
        
          
           
            console.log(user);
        }, error => {
            console.log(error);
        });
  }
  /*********** hamza aloui****/ 
  showPDF(u:any) {
    this.penalitesservice.getPdf(u.id_penalites)
        .subscribe(x => {
            // It is necessary to create a new blob object with mime-type explicitly set
            // otherwise only Chrome works like it should
            var newBlob = new Blob([x], { type: "application/pdf" });

            // IE doesn't allow using a blob object directly as link href
            // instead it is necessary to use msSaveOrOpenBlob
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(newBlob);
                return;
            }

            // For other browsers: 
            // Create a link pointing to the ObjectURL containing the blob.
            const data = window.URL.createObjectURL(newBlob);

            var link = document.createElement('a');
            link.href = data;
            link.download ="retenu.pdf";
            // this is necessary as link.click() does not work on the latest firefox
            link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

            setTimeout(function () {
                // For Firefox it is necessary to delay revoking the ObjectURL
                window.URL.revokeObjectURL(data);
                link.remove();
            }, 100);
        });
}
  

}
