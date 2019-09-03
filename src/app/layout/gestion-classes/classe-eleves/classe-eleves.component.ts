import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Eleveservice } from '../../gestion-eleves/gestion-eleves.service';
import { routerTransition } from '../../../router.animations';
import { SelectionComponent } from '../../../shared/generic-components/selection.component';
import swal from 'sweetalert2';
import { ClassesDesEleves } from '../gestion-affectationeleves/classedeseleve';
import { ClassesService } from '../gestion-classes.service';
import { Eleve } from '../../gestion-eleves/eleve';
@Component({
  selector: 'app-classe-eleves',
  templateUrl: './classe-eleves.component.html',
  styleUrls: ['./classe-eleves.component.scss'],
  animations: [routerTransition()]
})
export class ClasseElevesComponent extends SelectionComponent implements OnInit {
  //sorting
  key: string = 'nom'; //set default
  reverse: boolean = false;
  i: number;
  nomclasse :any ;
  elevess: any[];
  classdesEleve : ClassesDesEleves  = new ClassesDesEleves();
  messages: any = {
    delete: 'Voulez vous vraiment ajouter ces eleves a ce classe selectionnées ?',
};
checkedEleve:Eleve = new Eleve();
eleves: any[];
count: number;
  constructor(public router: Router,private route: ActivatedRoute
     ,private eleveService: Eleveservice , private classesservice: ClassesService ) {
    super();
  }

  ngOnInit() {
    this.nomclasse = this.route.snapshot.params['nomclasse'];
    console.log('esmliclasse est '+this.nomclasse)
  this.getAllEleveWithNonAffectedClass();
  
  }


getAllEleveWithNonAffectedClass(){ 
  this.eleveService.getAllElevesNonAffetedToclasse()
 .subscribe((elevess) => {
         this.elevess = elevess;
         console.log('heeeeeeeeeeeeeyyyyyyyyyyyy--------------------------')
         console.log(this.elevess);
     },
     error => {
         alert(error);
     });

}
sort(key) {
  this.key = key;
  this.reverse = !this.reverse;
}


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


    getAllEleve(){  
      this.eleveService.getAllEleves()
      .subscribe((eleves) => {
        this.eleves = eleves;
        
  
      },
      error => {
        alert(error);
      });
      
    }
}
