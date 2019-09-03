import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {routerTransition} from '../../router.animations';

import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { ClassesService } from '../gestion-classes/gestion-classes.service';
import { MatiereService } from '../gestion-matieres/matiereservice';
import { EmploisService } from './emploisservice';
import { AddprogrammeComponent } from './addprogramme/addprogramme.component';
import { NgbModalWindow } from '@ng-bootstrap/ng-bootstrap/modal/modal-window';
import { SalleService } from '../gestion-salles/gestion-salles.service';
import { SelectionComponent } from '../../shared/generic-components/selection.component';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-gestion-emplois',
  templateUrl: './gestion-emplois.component.html',
  animations: [routerTransition()], providers: [ClassesService,EmploisService,MatiereService, NgbModal,SalleService],
  styleUrls: ['./gestion-emplois.component.scss'],entryComponents: [AddprogrammeComponent]
}) 
export class GestionEmploisComponent extends SelectionComponent  implements OnInit {
    [x: string]: any;
    jour: any;
    heure: any;
   lundi ='Lundi';
   mardi ='Mardi';
   mercredi ='Mercredi';
   jeudi = 'Jeudi' ;
   vendredi ='Vendredi';
   samedi = 'Samedi';
    heures: any[];
    jours: any[];
    matieres: any[];
    classess: any[];
    niveau :any;
    enseignant:any;
    nomclasse : any ;
    nommatiere :any ;
    nomsalle : any ;
    remarque : any ;
    username:any ;
    typeprog :any ;
   
  classes: any[];
  loginform: FormGroup;
  types = [
    { name: '---selectionner un type---'},
    { name: 'cours'},
    { name: 'ratrappage'},
    { name: 'examen'}
   
];
  list = [
    {id: 1, name: '---Tous---'},
    {id: 2, name: '7eme'},
    {id: 3, name: '8eme'},
    {id: 4, name: '9eme'},
    {id: 5, name: '1ere'}
   
];

  constructor(private formBuilder: FormBuilder,private emploisservice :EmploisService,private cdr: ChangeDetectorRef,private modalService: NgbModal,private salleservice: SalleService ,private classeService: ClassesService ,private matiereservice:MatiereService) {
    super();
    this.loginform = this.formBuilder.group({
        'classe': ['', Validators.required],
        'salle': ['', Validators.required],
        'matiere': ['', Validators.required],
        'user': ['', Validators.required],
        'niveau': ['', Validators.required],
        'remarque': ['', Validators.required],
        'semaine': ['', Validators.required]
        
        
      

    });
  }

  ngOnInit() {
      
    this.getheures();
   this.getjours();
     
    this.cdr.detectChanges();
    this.getClasses();
    this.getmatiere();
    this.getprof();
    this.getSalle();
    this.getSemaine();
    this.cdr.detectChanges();
    this.cdr.detectChanges();
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
getmatiere() {
 
    this.matiereservice.getAllMatieres()
        .subscribe((matieres) => {
            this.matieres = matieres;
            console.log(matieres);
        }, error => {
            console.log(error);
        });
}
getClassesbyniveau(niveau :string) {
    console.log(niveau);
    console.log("classes"+niveau);
    this.classeService.getAllbyniveau(this.loginform.controls['niveau'].value)
        .subscribe((classes) => {
            this.classess = classes;
            console.log(classes);
        }, error => {
            console.log(error);
        });
}
getenseignantbymatiere(){
//     if(this.prof!=undefined){
// this.profs=this.prof;

//         let s= this.prof.find(e=> e.remarque!= ( this.loginform.controls['matiere'].value as string));
//       this.prof.pop(s);
//       console.log(s);
//       console.log(this.prof)
//       return this.prof
//     }
// else{
//     return this.prof;
// }
for ( let i = 0 ;i<this.prof.length;i++){


    if(this.prof[i].remarque===this.loginform.controls['matiere'].value){
     //  this.prof.pop( this.prof[i]);
this.listenseignant.push(this.prof[i]);
    }
    else {
        return  this.prof;
    }
}

}
getprof() {
 
  this.emploisservice.getAllProf()
      .subscribe((prof) => {
          this.prof = prof;
          console.log(prof);
      }, error => {
          console.log(error);
      });
}

getSalle() {
 
    this.salleservice.getAllSalles()
        .subscribe((salles) => {
            this.salles = salles;
            console.log(salles);
        }, error => {
            console.log(error);
        });
  }
  getSemaine() {
 
    this.emploisservice.getAllSemaine()
        .subscribe((semaines) => {
            this.semaines = semaines;
            console.log(semaines);
        }, error => {
            console.log(error);
        });
  }

  addProgramme(user) {
 //  console.log("enseignant"+this.enseignant)
  // let a = this.enseignant[0];
 //  console.log(a)
    this.emploisservice.add(this.loginform.controls['classe'].value, this.loginform.controls['salle'].value,
        this.loginform.controls['matiere'].value,  this.heure,this.jour,this.loginform.controls['user'].value[0],this.loginform.controls['remarque'].value,this.loginform.controls['semaine'].value)
        .subscribe(
            (res) => {
                console.log(res);
                if (res['response'] == true) {
                  //  this.activeModal.close();
                }
            },
            error => {
                alert(error);
            });

}

// test numero 2 
getjours() {
 
    this.emploisservice.getAllJours()
        .subscribe((jours) => {
            this.jours = jours;
            console.log(jours.length);
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
ajouterunprogramme(u,n :any , modal){
  this.heure=u;
  this.jour=n;


}

}
