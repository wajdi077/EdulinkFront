import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmploisService } from '../emploisservice';
import { ClassesService } from '../../gestion-classes/gestion-classes.service';
import { MatiereService } from '../../gestion-matieres/matiereservice';
import { routerTransition } from '../../../router.animations';
import { SalleService } from '../../gestion-salles/gestion-salles.service';
import { User } from '../../gestion-utilisateurs/user';
import { SelectionComponent } from '../../../shared/generic-components/selection.component';

@Component({
  selector: 'app-addprogramme',
  templateUrl: './addprogramme.component.html',
  styleUrls: ['./addprogramme.component.scss'], animations: [routerTransition()]
})
export class AddprogrammeComponent extends SelectionComponent implements OnInit {
 
    semaines: any;
    semaine:any;
    typeseance: any;
    login: any;
    salles: any;
    loginform: FormGroup;
  prof: any[];
  public allowCustom: boolean = true;
  public listItems: Array<string> = ["Baseball", "Basketball", "Cricket", "Field Hockey", "Football", "Table Tennis", "Tennis", "Volleyball"];
  nomclasse : any ;
  nommatiere :any ;
  nomsalle : any ;
  remarque : any ;
  username:any ;
  typeprog :any ;
  classes: any[];
  matieres: any[];
  classess: any[];
  @Input() heure;
  @Input() jour;
  list = [
    {id: 1, name: '---Tous---'},
    {id: 2, name: '7eme'},
    {id: 3, name: '8eme'},
    {id: 4, name: '9eme'},
    {id: 5, name: '1ere'},
  
];
types = [
    { name: '---selectionner un type---'},
    { name: 'cours'},
    { name: 'ratrappage'},
    { name: 'examen'}
   
];
public events: string[] = [];
public data: Array<string>;

  constructor( private formBuilder: FormBuilder,private emploisservice :EmploisService,
    private cdr:ChangeDetectorRef,
    public activeModal: NgbActiveModal, private salleservice: SalleService ,private classeService: ClassesService ,private matiereservice:MatiereService) {
      super();
  
        this.loginform = this.formBuilder.group({
            'classe': ['', Validators.required],
            'salle': ['', Validators.required],
            'matiere': ['', Validators.required],
            'user': ['', Validators.required]
           
            
          
    
        });
     }

  ngOnInit() {
    this.getClasses();
    this.getmatiere();
    this.getprof();
    this.getSalle();
    this.getSemaine();
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
    this.classeService.getAllbyniveau(niveau)
        .subscribe((classes) => {
            this.classess = classes;
            console.log(classes);
        }, error => {
            console.log(error);
        });
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

  addProgramme() {
   
    this.emploisservice.add(this.nomclasse, this.nomsalle,
        this.nommatiere,   this.heure,this.jour,this.login,this.typeseance,this.semaine)
        .subscribe(
            (res) => {
                console.log(res);
                if (res['response'] == true) {
                    this.activeModal.close();
                }
            },
            error => {
                alert(error);
            });

}

// dropfilter 


selecteditem(item : any ){
console.log("le login est "+this.login);
console.log("le login itemest "+item);
    this.login = item ;
    console.log("le login est "+this.login);
}


}
