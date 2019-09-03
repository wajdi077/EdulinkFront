import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import * as decode from 'jwt-decode';

import {UtilisateursService} from './gestion-utilisateurs.service';
import {SitesService} from './sites.service';

import {AddNewUserComponent} from './components/add-new-user/add-new-user.component';
import {MailUserComponent} from './components/mail-user/mail-user.component';
import {UserSitesComponent} from './components/user-sites/user-sites.component';
import { RolesService } from '../gestion-roles/gestion-roles.service';
import { SelectionComponent } from '../../shared/generic-components/selection.component';
import { ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../model/user';
import swal from 'sweetalert2';
import { Access } from '../gestion-roles/gestion-roles.component';

@Component({
    changeDetection: ChangeDetectionStrategy.Default,
    selector: 'app-gestion-utilisateurs',
    templateUrl: './gestion-utilisateurs.component.html',
    styleUrls: ['./gestion-utilisateurs.component.scss'],
    animations: [routerTransition()],
    providers: [UtilisateursService, NgbModal, SitesService],
    entryComponents: [AddNewUserComponent]
})
export class GestionUtilisateursComponent extends SelectionComponent implements OnInit {
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

    //sorting
    key: string = 'nom'; //set default
    reverse: boolean = false;
    i: number;
    private current: number;
    count: number;


    constructor(private sitesService: SitesService, private userService: UtilisateursService,
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
        this.userService.getAllUtilisateurs()
            .subscribe((utilisateurs) => {
                    this.utilisateurs = utilisateurs;
                    console.log(this.utilisateurs);
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

    mailUser(id) {
        let options: NgbModalOptions = {size: 'lg'};
        const modalRef = this.modalService.open(MailUserComponent, options);
        modalRef.componentInstance.userId =id;
    }



    deleteUser() {
        let usernamesToDelete = this._selected.map((d) => {
            return d.username
        });
        if (usernamesToDelete.length==0 ){ swal(
            '<h2 >il faut que tu selectionne au minimum un utilisteur !</h2>', 
                       'warning'
          )}
          else {
        swal({
            title: 'Êtes-vous sûr?',
            text: "Vous ne pouvez pas revenir en arrière!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimez-le(s)!'
          }).then((result) => {
            if (result.value) {
              swal(
                'Supprimé!',
                'Vos données  ont  été supprimé.',
                'success'
              )
              this.count=null;
              this.userService.deleteUser(usernamesToDelete)
                .subscribe((res) => {
                        if (res['response']) {
                            for (this.i = 0; this.i < this._selected.length; this.i++) {
                                if (this.utilisateurs.find(x => x == this._selected[this.i])) {
                                    this.utilisateurs.splice(this.utilisateurs.indexOf(this._selected[this.i]), 1);
                                }
                            }
                        }
                    },
                    error => {
                        console.log(error);
                    });
            
            }
          })
        
        }
       
    }
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
    checkboxes(u:User)
      {
        //this.eleve=u;
    
        var inputElems = document.getElementsByTagName("input");
        var tr = document.getElementsByTagName("tr");
        this.count = 0;

        for (var i=0; i<=this.utilisateurs.length; i++) {       
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
                        this.userService.getAllUtilisateurs()
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
                        this.userService.getAllUtilisateurs()
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
          this.userService.getAllUtilisateurs()
          .subscribe((utilisateurs) => {
                  this.utilisateurs = utilisateurs;
                  console.log(this.utilisateurs);
              },
              error => {
                  alert(error);
              });

      this.cdr.detectChanges();

	}

}
