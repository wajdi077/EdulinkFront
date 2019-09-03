import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { SelectionComponent } from 'src/app/shared/generic-components/selection.component';
import { Eleveservice } from 'src/app/layout/gestion-eleves/gestion-eleves.service';
import { Eleve } from 'src/app/layout/gestion-eleves/eleve';
import { LoginService } from 'src/app/login/login/login.service';
import { User } from 'src/app/model/user';
import { GestionParrainService } from '../../gestion-parrain.service';

@Component({
  selector: 'app-affecter-eleve',
  templateUrl: './affecter-eleve.component.html',
  styleUrls: ['./affecter-eleve.component.scss'],providers:[Eleveservice,LoginService]
})
export class AffecterEleveComponent extends SelectionComponent implements OnInit {
  eleves: Eleve[];
  username: any;
  user :User ;
count :any;
  eleve: Eleve;
  constructor(private parrainservice : GestionParrainService,private loginService :LoginService ,private eleveService: Eleveservice,public router: Router    , private formBuilder:FormBuilder,
    private route: ActivatedRoute,) {
    super();
  }

  ngOnInit() {
    this.username = this.route.snapshot.params['username'];
    console.log(this.username);
    this.loginService.getUserbyusername(this.username)
                    
                          .subscribe((user) => {
                              this.user= user;
                              console.log("hello slim");
                              console.log(this.username);
                              console.log(user);
                          }, error => {
                              console.log(error);
                          });
    this.getAllEleve();
  }
  getAllEleve(){  this.eleveService.getAllEleves()
    .subscribe((eleves) => {
            this.eleves = eleves;
            console.log(this.eleves);
        },
        error => {
            alert(error);
        });
}
changeHeadingBg(this){

  document.getElementById("heading").style.background = 'orange';
}
checkboxes(u:Eleve)
      {
        this.eleve=u;
    
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
     
AffecterDesEleves(){
 
    console.log(this._selected);
 
 

  
         
         this.parrainservice.addeleveToParrain(this.username,this._selected).subscribe((res) => {
             console.log(res);
             if (res['response']) {
                 this.getAllEleve();
             }
         })
     }
  
  }
