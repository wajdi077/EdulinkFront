import { ChangeDetectionStrategy, ChangeDetectorRef,Component, OnInit } from '@angular/core';
import {routerTransition} from '../../router.animations';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import * as decode from 'jwt-decode';

import { RolesService } from '../gestion-roles/gestion-roles.service';
import { SelectionComponent } from '../../shared/generic-components/selection.component';
import { ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../model/user';
import swal from 'sweetalert2';
import { Access } from '../gestion-roles/gestion-roles.component';
import { NiveauService } from './gestion-niveau.service';
import {  Niveau } from './niveau';
import { Utilisateur } from '../gestion-utilisateurs/utilisateur';
@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'app-gestion-niveau',
  templateUrl: './gestion-niveau.component.html',
  styleUrls: ['./gestion-niveau.component.scss'],
  animations: [routerTransition()],
  providers: [NiveauService, NgbModal],


})
export class GestionNiveauComponent extends SelectionComponent implements OnInit {
  closeResult: string;
  t: string;
  bcheck :any ;
  list = [
      {id: 1, name: '---Tous---'},
      {id: 2, name: 'Admin'},
      {id: 3, name: 'Parent'},
      {id: 4, name: 'Enseignant'},
      {id: 5, name: 'Surveillant'}
  ];
  access: Access = new Access;
  private lists = [];
  enabled: boolean = false;
  statut: any;
  utilisateurs: any[];
  profil: any;
  currentPage: number = 1;
  sites: any[] = [];
  edituser:User = new User();
  user: User = new User();
  username: any;
  private niveau:Niveau[] ; 
  n: Niveau; 
  //sorting
  key: string = 'nom'; //set default
  reverse: boolean = false;
  i: number;
  private current: number;
  count: number;
utlisateur:Utilisateur[]
niveaux : any[] ;
  constructor(private userService: NiveauService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,private rolesService: RolesService) {
super();

}

sort(key) {
this.key = key;
this.reverse = !this.reverse;
}


  ngOnInit() {
      this.rolesService.getAllAuthorities()
      .subscribe((authorities) => {
          this.lists = authorities;
      }, error => {
          console.log(error);
      });
      this.userService.getNiveau()
          .subscribe((niveau) => {
                  this.niveau = niveau;
                  console.log(this.niveau);
              },
              error => {
                  alert(error);
              });

      this.cdr.detectChanges();
      if(localStorage.getItem('token') != null){
          var decoded = decode(localStorage.getItem('token'));
         this.username = decoded.sub;}

         console.log('add role'+this.user.profil);
         this.accessdenied();
  }

  detailUser(u) {
      this.edituser=u;
  }

  editUser(u) {
  
this.edituser=u;
this.bcheck=this.edituser.enabled;
   
  }

  /* mailUser(id) {
      let options: NgbModalOptions = {size: 'lg'};
      const modalRef = this.modalService.open(MailUserComponent, options);
      modalRef.componentInstance.userId =id;
  }
*/


  blockuser(checked){

      this.edituser.enabled = checked;
      
  if (checked == false) {
    this.userService.blockUser(this.edituser.username, false)
      .subscribe((res) => {
        this.enabled = true;
      }
      ),
      error => {
        alert(error);
      };

  } else {

    this.userService.blockUser(this.edituser.username, true)
      .subscribe((res) => {
        this.enabled = false;
      }
      ),
      error => {
        alert(error);
      }
    ;
  }

  }
  checkboxes(n:Niveau)
    {
      this.n=n;
  
      var inputElems = document.getElementsByTagName("input");
      var tr = document.getElementsByTagName("tr");
      this.count = 0;

      for (var i=0; i<=this.niveau.length; i++) {       
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
      this.rolesService.getAccess('Gestion des utilisateurs',this.user.profil)
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
       
       this.username = decoded.sub;
      this.rolesService.getUserbyusername(this.username)
           .subscribe((user) => {
               this.user= user;
               
                    this.getAccess(user.profil);

           
           }, error => {
               console.log(error);
           });


}
}
editUsers(checked, username, password, tel, email) {

      this.edituser.enabled = checked;
      swal({
          title: 'Êtes-vous sûr ?',
          text: "Vous ne pourrez pas revenir en arrière!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Oui, je suis sûr !'
        }).then((result) => {
          if (result.value) {
            swal(
              'ok!',
              'cet utilisateur a été bloqué avec succes .',
              'success'
            )
          
            if (checked == false) {
              this.userService.blockUser(username, false)
                .subscribe((res) => {
                      this.enabled = true;
                      this.userService.getNiveau()
                      .subscribe((utilisateurs) => {
                              this.utilisateurs = utilisateurs;
                              
                          },
                          error => {
                              alert(error);
                          });
            
                  this.cdr.detectChanges();
                  }
                ),
                error => {
                    alert(error);
                };
  
          } else {
  
              this.userService.blockUser(username, true)
                .subscribe((res) => {

                      this.enabled = false;
                      this.userService.getNiveau()
                      .subscribe((niveau) => {
                              this.niveau = niveau;
                             
                          },
                          error => {
                              alert(error);
                          });
            
                  this.cdr.detectChanges();
                  }
                ),
                error => {
                    alert(error);
                }
              ;
          }
  
  
          
          }
        })
  

  this.userService.editUser(username, password, email, tel)
    .subscribe((res) => {
    }),
    error => {
      alert(error);
    };
        this.userService.getNiveau()
        .subscribe((utilisateurs) => {
                this.utilisateurs = utilisateurs;
                console.log(this.utilisateurs);
            },
            error => {
                alert(error);
            });

    this.cdr.detectChanges();

}
getAllniveau(){
  this.userService.getNiveau().subscribe((niveaux)=>{
    this.niveaux=niveaux ;

  },
  error =>{
    alert(error);
  });
}  
       

AffecterDesNiveau(){
  console.log(this._selected);



  

  this.userService.addniveautoetab(this._selected).subscribe((res) => {
      console.log(res);
      if (res['response']) {
          this.getAllniveau();
      }
  })

}


}

