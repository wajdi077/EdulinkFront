
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ChangeDetectionStrategy, ViewChild, TemplateRef} from '@angular/core';
import {startOfDay,endOfDay,subDays,addDays,endOfMonth,isSameDay,isSameMonth,addHours} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent,CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView, DAYS_OF_WEEK} from 'angular-calendar';
import { UpdateemploisserviceService } from '../updateemploisservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SelectionComponent } from 'src/app/shared/generic-components/selection.component';
import { SalleService } from '../../gestion-salles/gestion-salles.service';
import { ClassesService } from '../../gestion-classes/gestion-classes.service';
import { MatiereService } from '../../gestion-matieres/matiereservice';
import { registerLocaleData } from '@angular/common';





const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};
@Component({
  selector: 'app-modifier-emplois',
  templateUrl: './modifier-emplois.component.html',
  styleUrls: ['./modifier-emplois.component.scss'],providers:[UpdateemploisserviceService,NgbModal,SalleService,MatiereService,ClassesService]
})
export class ModifierEmploisComponent extends SelectionComponent implements OnInit {
  private bodyText: string;
  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;
 
  viewDate: Date = new Date();

  locale: string = 'fr-FR';

  actions: CalendarEventAction[] = [
    {
      label: '<button class="btn btn-primary"  >Modifier</button>',
      onClick: ({ event }: { event: CalendarEvent }): void => {

        this.handleEvent('Edited', event);
        
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
       this.delete(event.id);
       
      

      }
    }
  ];
  modalData: {
    action: string;
    event: CalendarEvent;
  };

  refresh: Subject<any> = new Subject();

  // events: CalendarEvent[] = [
  //   {
  //     start: subDays(startOfDay(new Date()), 1),
  //     end: addDays(new Date(), 1),
  //     title: 'A 3 day event',
  //     color: colors.red,
  //     id:156,
  //     actions: this.actions,
  //     allDay: true,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true
  //     },
  //     draggable: true
  //   },
  
    
  //   {
  //     start: addHours(startOfDay(new Date()), 2),
  //     end: new Date(),
  //     id:569,
  //     title: 'A draggable and resizable event',
  //     color: colors.yellow,
  //     actions: this.actions,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true
  //     },
  //     draggable: true
  //   }
  // ];
  events: CalendarEvent[] = [
   
      
  ];
  list = [
    {id: 1, name: '---Tous---'},
    {id: 2, name: '7emme'},
    {id: 3, name: '8emme'},
    {id: 4, name: '9emme'}
   
];
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
  activeDayIsOpen: boolean = true;
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];
  emplois: CalendarEvent[];
  closeResult: string;
  selectedseance: any[];
  id: string | number;
  salles: any[];
  constructor(private salleservice: SalleService ,
    private classeService: ClassesService ,
    private matiereservice:MatiereService,
    private formBuilder: FormBuilder, private modalService: NgbModal,
    private route: ActivatedRoute,public router: Router ,
    private updateservice : UpdateemploisserviceService,private modal: NgbModal) {
    super();
    this.loginform = this.formBuilder.group({
      'classe': ['', Validators.required],
      'salle': ['', Validators.required],
      'matiere': ['', Validators.required],

      'niveau': ['', Validators.required],
      'remarque': ['', Validators.required],
      
      
      
    

  });
  }
  
  ngOnInit() {
    this.bodyText = 'This text can be updated in modal 1';
    this.username = this.route.snapshot.params['username'];
    this.getemploisbyprof();
    this.getClasses();
    this.getmatiere();
    this.getSalle();
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
  updateprogramme(id:any) {
    //  console.log("enseignant"+this.enseignant)
     // let a = this.enseignant[0];
    //  console.log(a)
       this.updateservice.updateseanceEnseignant(id,this.loginform.controls['salle'].value,this.loginform.controls['classe'].value, this.loginform.controls['remarque'].value,
           this.loginform.controls['matiere'].value)
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
  openModal(id: string) {
    this.modalService.open(id);
}
delete(id:any){
  console.log("test delete")
  this.updateservice.remove(id).subscribe((jsondata) => {
    console.log("delete in")
    this.events= [
   
      
    ];
    this.refresh.next();
   
    this.getemploisbyprof();
  
    this.refresh.next();
  let a  = jsondata;})
}
getemploisbyid(id :any){
  console.log("test get")
this.updateservice.getemploisbyid(id).subscribe((jsondata) => {
  console.log("")
  this.selectedseance = jsondata;})

}
getemploisbyprof(){

this.updateservice.getemploisbyprof(this.username) .subscribe((jsondata) => {
  this.emplois = jsondata;
  console.log(jsondata);
  for (var i=0 ;i<jsondata.length;i++){
    let seance : CalendarEvent ;

     
  this.events.push({
    title: jsondata[i].matiere.nommatiereFR+'<br>'+'  dans la salle '+jsondata[i].salle.nomSalle,
    id:jsondata[i].id,
    start: jsondata[i].dateprog,
    end: jsondata[i].datefinprog,
    color: colors.red,
    actions: this.actions,
    draggable: true,
    resizable: {
      beforeStart: false,
      afterEnd: false
    }
  });
  this.refresh.next();
   }
}, error => {
  console.log(error);
});



}
handleEvent(action: string, event: CalendarEvent): void {
  this.modalData = { event, action };
  this.getemploisbyid(event.id);
  this.id= event.id;
  //this.modal.open(this.modalContent, { size: 'lg' });
  document.getElementById("openModalButton").click();
}
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;

    this.refresh.next();
  }



  addEvent(): void {
    this.events.push({
      title: 'New event',
      id :0,
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      actions: this.actions,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }



}
