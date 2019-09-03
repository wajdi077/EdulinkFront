
import { ClassesService } from './gestion-classes.service';
import {Component, OnInit, ViewChild,ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import swal from 'sweetalert2';
import {routerTransition} from '../../router.animations';

import {Subject} from "rxjs/Subject";
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {debounceTime} from 'rxjs/operator/debounceTime';
import { AddClassesComponent } from './add-classes/add-classes.component';
import { EditClassesComponent } from './edit-classes/edit-classes.component';
import { RolesService } from '../gestion-roles/gestion-roles.service';
import { User } from '../gestion-utilisateurs/user';
import { Access } from '../gestion-roles/gestion-roles.component';
import * as decode from 'jwt-decode';
import { SelectionComponent } from '../../shared/generic-components/selection.component';
import { Classes } from './classes';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'app-gestion-classes',
  templateUrl: './gestion-classes.component.html',
  styleUrls: ['./gestion-classes.component.scss'],
  animations: [routerTransition()], providers: [ClassesService, NgbModal,RolesService],
  entryComponents: [AddClassesComponent]
})
export class GestionClassesComponent extends SelectionComponent implements OnInit {
  enabled: boolean = false;
  statut: any;
  user: User;
  access: Access = new Access;
  public username;
  editform: FormGroup;
  currentPage: number = 1;
  classes: Classes[] = [];
  newclasse: Classes = new Classes();
  adding: boolean;
  private _success = new Subject<string>();
  private _error = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  errorMessage: string;
  classe : Classes=new Classes();
  key: string = 'nom'; 
  reverse: boolean = false;
  i: number;
  messages: any = {
    delete: 'Voulez vous vraiment supprimer les Objet  selectionnées ?',
  };
  count: number;
  constructor(private formBuilder: FormBuilder,private rolesService: RolesService,private classeService: ClassesService ,   private cdr: ChangeDetectorRef,
    private modalService: NgbModal) {super();
      
      this.editform = this.formBuilder.group({
        'nomclasse': ['', [Validators.minLength(1), Validators.maxLength(20)]],
        'niveau': ['',],
        'remarque': ['', Validators.minLength(1)]
        
      });}
      
      sort(key) {
        this.key = key;
        this.reverse = !this.reverse;
      }
      chek(event,newclasse) {
        if (event.keyCode == 13) {
          console.log('add Classe');
        }
      }
      ngOnInit() {
        setTimeout(() => this.staticAlertClosed = true, 2000);
        this._success.subscribe((message) => this.successMessage = message);
        debounceTime.call(this._success, 2000).subscribe(() => this.successMessage = null);
        this.accessdenied();
        setTimeout(() => this.staticAlertClosed = true, 2000);
        this._error.subscribe((message) => this.errorMessage = message);
        debounceTime.call(this._error, 2000).subscribe(() => this.errorMessage = null);
        this.getClasses();
      }
      getClasses() {
        this.classeService.getAll()
        .subscribe((classes) => {
          this.classes = classes;
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
        
        for (var i=0; i<=this.classes.length; i++) {       
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
        this.rolesService.getAccess('Gestion des classes',this.user.profil)
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
      
      editClasse(u) {
        this.classe=u;
        
      }
      
      //********************* */
      //  deleteClasse() {
      //    console.log(this._selected);
      //    if (confirm(this.messages.delete)) {
      //        console.log(this._selected);
      //        this.classeService.delete(this._selected).subscribe((res) => {
      //            console.log(res);
      //            if (res['response']) {
      //                this.getClasses();
      //            }
      //        })
      //    }
      //  }
      
      
      deleteClasse() {
        let usernamesToDelete = this._selected.map((d) => {
          return d.username
        });
        if (usernamesToDelete.length==0 ){ swal(
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
                  'Supprimé!',
                  'Vos données  ont  été supprimé.',
                  'success'
                  )
                  this.count=null;
                  this.classeService.archiver(this._selected).subscribe((res) => {
                    console.log(res);
                    if (res['response']) {
                      this.getClasses();
                    }
                  })
                  
                }
              })
              
            }
            
          }
          /*******liste des classes archiver */
          getClassesArchiver() {
            this.classeService.getClassesArchiver()
            .subscribe((classes) => {
              this.classes = classes;
              console.log(classes);
            }, error => {
              console.log(error);
            });
          }
        }
        