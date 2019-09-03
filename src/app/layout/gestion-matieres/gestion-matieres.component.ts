import {Component, OnInit, ViewChild,ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import swal from 'sweetalert2';
import {routerTransition} from '../../router.animations';
import {Subject} from "rxjs/Subject";
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {debounceTime} from 'rxjs/operator/debounceTime';
import { MatiereService } from './matiereservice';
import { AddmatiereComponent } from './addmatiere/addmatiere.component';
import { Matiere } from './matiere';
import { RolesService } from '../gestion-roles/gestion-roles.service';
import * as decode from 'jwt-decode';
import { Access } from '../gestion-roles/gestion-roles.component';
import { SelectionComponent } from '../../shared/generic-components/selection.component';
@Component({
  selector: 'app-gestion-matieres',
  templateUrl: './gestion-matieres.component.html',
  styleUrls: ['./gestion-matieres.component.scss'],
  animations: [routerTransition()], providers: [MatiereService, NgbModal,RolesService],  entryComponents: [AddmatiereComponent]
})
export class GestionMatieresComponent extends SelectionComponent implements OnInit  {
    user: any;
    count: number;
    access: Access;
    username: any;
  currentPage: number = 1;
  matieres: Matiere[] = [];
  newMatiere: Matiere = new Matiere();
  adding: boolean;
  private _success = new Subject<string>();
  private _error = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  errorMessage: string;
  
  key: string = 'nom'; //set default
  reverse: boolean = false;
  i: number;
  editing: number;
  messages: any = {
      delete: 'Voulez vous vraiment supprimer les Objet  selectionnées ?',
  };
  constructor(private rolesService: RolesService,private cdr: ChangeDetectorRef,private matiereservice:MatiereService,private modalService: NgbModal) {
    super();
  }
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
}
ngOnInit() {
  setTimeout(() => this.staticAlertClosed = true, 2000);
      this._success.subscribe((message) => this.successMessage = message);
      debounceTime.call(this._success, 2000).subscribe(() => this.successMessage = null);
      this.accessdenied();
      setTimeout(() => this.staticAlertClosed = true, 2000);
      this._error.subscribe((message) => this.errorMessage = message);
      debounceTime.call(this._error, 2000).subscribe(() => this.errorMessage = null);
      this.getMatieres();
}
chek(event,newMatiere) {
  if (event.keyCode == 13) {
     console.log('add matiere');
  }
}
  getMatieres() {
    this.matiereservice.getAllMatieres()
        .subscribe((matieres) => {
            this.matieres = matieres;
        }, error => {
            console.log(error);
        });
}


save() {
 
    this.matiereservice.addMatiere(this.newMatiere.nommatiereFR)
        .subscribe((data) => {
            if (data) {
                this.getMatieres();
                this._success.next(`Matiere enregistré avec succés`);
            }
            else {
                this._error.next(`Matiere déja existant`);
            }
            this.newMatiere = new Matiere();
        });
    this.adding = false;
}


saveEditRole(GroupeToEdit) {
    let newName = GroupeToEdit.description;
        GroupeToEdit.name = newName;
    this.matiereservice.editMatiere(GroupeToEdit)
        .subscribe((res) => {
            if (res['response']) {
                this.editing = -1;
            }
            else {
                this.getMatieres();
                this._error.next(`Matiere déja existant`);
            }
        });
}


getAccess(profil:any){
    console.log(" getAccess()");
    console.log(this.user.profil);
    this.rolesService.getAccess('Gestion des matieres',this.user.profil)
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


deleteMatiere() {
  console.log(this._selected);
  if (confirm(this.messages.delete)) {
      console.log(this._selected);
      this.matiereservice.deleteMatiere(this._selected).subscribe((res) => {
          console.log(res);
          if (res['response']) {
              this.getMatieres();
          }
      })
  }
}
checkboxes(u:any)
{
  //this.eleve=u;

  var inputElems = document.getElementsByTagName("input");
  var tr = document.getElementsByTagName("tr");
  this.count = 0;

  for (var i=0; i<=this.matieres.length; i++) {       
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
archiver() {
    let mateierearchiver = this._selected.map((d) => {
        return d.username
    });
 

    if (mateierearchiver.length==0 ){ swal(
        '<h2 >il faut que tu selectionne au minimum un objet !</h2>',
        '!!!!!!!!!!!!',
        'warning'
      )}
      else {
    swal({
        title: 'Êtes-vous sûr?',
        text: "Vous ne pourrez pas revenir en arrière!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, supprimez-le(s)!'
      }).then((result) => {
        if (result.value) {
          swal(
            'Archivé!',
            'Vos données  ont  été archivé.',
            'success'
          )
          this.count=null;
          this.matiereservice.archiver(this._selected)
            .subscribe((res) => {
                    if (res['response']) {
                        for (this.i = 0; this.i < this._selected.length; this.i++) {
                            if (this.matieres.find(x => x == this._selected[this.i])) {
                                this.matieres.splice(this.matieres.indexOf(this._selected[this.i]), 1);
                                this.getMatieres();
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
}
