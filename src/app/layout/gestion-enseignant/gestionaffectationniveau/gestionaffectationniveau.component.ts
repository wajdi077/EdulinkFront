import { Component, OnInit } from '@angular/core';
import { EnseignantService } from '../gestion-enseignant.service';
import { Niveau } from '../../gestion-niveau/niveau';
import { routerTransition } from 'src/app/router.animations';
import { SelectionComponent } from 'src/app/shared/generic-components/selection.component';
import { Subject } from 'rxjs';
import { NiveauUser } from '../niveauuser';
import { Utilisateur } from '../../gestion-utilisateurs/utilisateur';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { NiveauService } from '../../gestion-niveau/gestion-niveau.service';
import swal from 'sweetalert2';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-gestionaffectationniveau',
  templateUrl: './gestionaffectationniveau.component.html',
  styleUrls: ['./gestionaffectationniveau.component.scss'],    animations: [routerTransition()]
})
export class GestionaffectationniveauComponent extends SelectionComponent implements OnInit {
  username:any ;  
  niveau:Niveau[] ;
  utilisateur: Utilisateur[] ;  
    n: Niveau;
    count: number;
    key: string = 'nom'; //set default
    reverse: boolean = false;
i :number ;
message : any= {
  delete : 'voulez vous vraiment ajouter ces niveaux a ce enseignant selectionné ?'
}
private current : number ; 
show =console.log ; 
private _success = new Subject<String>();
private _error = new Subject<String>();
staticAlertClosed = false ;
successMessage : string ; 
niveauuser : NiveauUser = new NiveauUser () ; 
userniveau : NiveauUser[];
momenseignant : Utilisateur = new Utilisateur();
niveaux : any[] ; 
user :  User[] ; 
modules=[];
niveauajouter : NiveauUser [];
nomenseignant :any ; 
niveauEtude :any ; 
currentPage : number= 1 ; 
sites :any[] = [] ; 
parrain :NiveauUser = new NiveauUser();
eleve :Niveau = new Niveau();
id:any ;

  constructor(public router : Router,private formBuilder:FormBuilder, 
    private route: ActivatedRoute,private niveauservice : NiveauService, private userService: EnseignantService) {
    super();

    this.id = this.route.snapshot.params['id'];

   }

  ngOnInit() {
    
   console.log(this.id)
    

 

    this.userService.getNiveau()
    .subscribe((niveau) => {
            this.niveau = niveau;
            console.log(this.niveau);
        },
        error => {
            alert(error);
        });

  }
getAllniveau(){
  this.niveauservice.getNiveau().subscribe((niveaux)=>{
    this.niveaux=niveaux ;

  },
error =>{
  alert(error);
});
  
}
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  
  k : number ;
  
  alo : string ;
  
  checkboxes(u:Niveau)
  {
    this.n=u;

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



 AffecterDesNiveau(){
 
  console.log(this._selected);



  
       
       this.userService.addeleveToParrain(this.id,this._selected).subscribe((res) => {
           console.log(res);
           if (res['response']) {
               this.getAllniveau();
               this.router.navigateByUrl("ajouterniveau");
    
           }
       })
   }












}