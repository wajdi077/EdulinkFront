
import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {routerTransition} from '../../../router.animations';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import { ClassesService } from '../gestion-classes.service';
import { Eleveservice } from '../../gestion-eleves/gestion-eleves.service';
import { Subject } from 'rxjs/Subject';
import { ClassesDesEleves } from './classedeseleve';
import { Eleve } from '../../gestion-eleves/eleve';
import swal from 'sweetalert2';
import { SelectionComponent } from '../../../shared/generic-components/selection.component';
import { Classes } from '../classes';
@Component({
  selector: 'app-gestion-affectationeleves',
  templateUrl: './gestion-affectationeleves.component.html',
  styleUrls: ['./gestion-affectationeleves.component.scss'],    animations: [routerTransition()]
})
export class GestionAffectationelevesComponent extends SelectionComponent implements OnInit {
  //sorting
  key: string = 'nom'; //set default
  reverse: boolean = false;
  i: number;
  selectedNewClass:any;
  messages: any = {
    delete: 'Voulez vous vraiment ajouter ces eleves a ce classe selectionnées ?',
  };
  private current: number;
  show=console.log;
  private _success = new Subject<string>();
  private _error = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  classdesEleve : ClassesDesEleves  = new ClassesDesEleves();
  eleveClasse : ClassesDesEleves [];
  monclasse:Classes=new Classes();
  eleves: any[];
  e : Eleve = new Eleve();
  modules=[];
  editform: FormGroup;
  eleveajouter : ClassesDesEleves [];
  nomclasse :any ;
  niveauEtude: any;
  currentPage: number = 1;
  sites: any[] = [];
  count: number;
  classeDesEleve:ClassesDesEleves [];
  modalClosed: boolean = false;
  checkedEleve:Eleve = new Eleve();
  
  constructor(public router: Router    , private formBuilder:FormBuilder,
    private route: ActivatedRoute,private classesservice: ClassesService,private eleveService: Eleveservice) {
      super();

      
      this.editform = this.formBuilder.group({
        'nomclasse': ['', [Validators.minLength(1), Validators.maxLength(20)]],
      
        
      });
    }
    
    ngOnInit() {
      this.nomclasse = this.route.snapshot.params['nomclasse'];
     (this.getNomClasse(this.nomclasse)).then((data)=>{
       this.getAllElevesbySelectedClass(this.nomclasse)
       this.getClassBySelectedNiveau(this.niveauEtude)
      
      }
       )
    }
    getNomClasse(nomClasse){
      return new Promise ((resolve, reject)=>{
        this.classesservice.findBynomclasse(nomClasse).subscribe(data=>{
          this.monclasse=data;
          this.niveauEtude=data.niveau
            resolve();
        });
      }) 
    }
    getAllEleve(){  
      this.eleveService.getAllEleves()
      .subscribe((eleves) => {
        this.eleves = eleves;
        
  
      },
      error => {
        alert(error);
      });
      
    }
    sort(key) {
      this.key = key;
      this.reverse = !this.reverse;
    }
    
    k : number ;
    
    alo : string ;
    // AffecterDesEleves(){
    // this.k = 0 ;
    //   console.log(this._selected);
    //    if (confirm(this.messages.delete)) {
    
    // this.classdesEleve.SetClass(this.nomclasse);
    // this.classdesEleve.Seteleve(this._selected);
    
    
    //        this.classesservice.addEleveToClass(this.nomclasse,this._selected).subscribe((res) => {
    //            console.log(res);
    //            if (res['response']) {
    //                this.getAllEleve();
    //            }
    //        })
    //    }
    
    // }
    AffecterDesEleves() {
      let usernamesToDelete = this._selected.map((d) => {
        return d.username
      });
      if (usernamesToDelete.length==0 ){ swal(
        '<h3 >il faut que tu selectionne au minimum un élève !</h3>',
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
            confirmButtonText: 'Oui, Affecter-le(s)!'
          }).then((result) => {
            if (result.value) {
              swal(
                'Affecté!',
                ' élève(s) Affécté(s) avec succés .',
                'success'
                )
                
                this.classdesEleve.SetClass(this.nomclasse);
                this.classdesEleve.Seteleve(this._selected);
                this.classesservice.addEleveToClass(this.nomclasse,this._selected).subscribe((res) => {
                  
                  if (res['response']) {
                    this.getAllEleve();
                  }
                })
                
              }
              this.router.navigate(['./gestion-classes']);
            })
            
          }
          
        }
        checkboxes(u:Eleve )
        {
          this.checkedEleve=u;
       
         
          var inputElems = document.getElementsByTagName("input");
          var tr = document.getElementsByTagName("tr");
          this.count = 0;
          
          for (var i=0; i<=this.eleves.length; i++) {       
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


        getAllElevesbySelectedClass(nomclasse:string){  
          this.eleveService.getAllElevesbySelectedClass(nomclasse)
          .subscribe((data) => {
            this.eleves = data;
          },
          error => {
            alert(error);
          });
          
        }


        getClassBySelectedNiveau(niveau:string){
          this.classesservice.getAllbyniveau(niveau).subscribe((data)=>{
            this.classeDesEleve =data
          },
          error=>{
            alert(error)
          });

        }

     
        saveChanges(s){
          this.classesservice.addEleveToClass(s,this._selected).subscribe((res) => {
            console.log(res);
            if (res['response']) {
               swal(
                'Affecté!',
                ' élève(s) Affécté(s) avec succés .',
                'success'
                )
                 this.classesservice.getAll()
              }
              this.router.navigate(['./gestion-classes']);
          })
        }
      
      raiseModal(){
       
        let usernamesToDelete = this._selected.map((d) => {
          return d.username
        });
        
        if (usernamesToDelete.length==0 ){ 
          this.modalClosed = false;
          swal(
          '<h3 >il faut que tu selectionne au minimum un élève !</h3>',
         
          'warning'
          )}else{
            this.modalClosed = true;
      
          }
         
      }
      }
      