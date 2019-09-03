import { Component, OnInit } from '@angular/core';
import { EleveEmploi } from 'src/app/espace-parent/service/eleve-emploi';
import { EspaceParrainService } from 'src/app/espace-parent/service/espace-parrain.service';
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { Classes } from '../../gestion-classes/classes';
import { ClassesService } from '../../gestion-classes/gestion-classes.service';
@Component({
  selector: 'app-emplois-classes',
  templateUrl: './emplois-classes.component.html',
  styleUrls: ['./emplois-classes.component.scss'],providers:[ClassesService]
})
export class EmploisClassesComponent implements OnInit {
  displayedColumns: string[] = ['heureJour','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
  jour: any;
  heure: any;
  lundi = 'Lundi';
  mardi = 'Mardi';
  mercredi = 'Mercredi';
  jeudi = 'Jeudi';
  vendredi = 'Vendredi';
  samedi = 'Samedi';
  heures: any[];
  jours= [
    {id: 1, jour:'Lundi'},
    {id: 2, jour:'Mardi'},
    {id: 3, jour:'Mercredi'},
    {id: 4, jour:'Jeudi'},
    {id: 5, jour:'Vendredi'},
    {id: 6, jour:'Samedi'}
  ];

  id:string;
  mySubscription: any;
  programme: EleveEmploi[];
  pg_test: EleveEmploi;
  nomclasse: string;
  classeencours: Classes;
  constructor(private classeservice : ClassesService,private emploisservice:EspaceParrainService,
    private router:Router,
    private activateRoute:ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.router.navigated = false;
    this.getheures();
    this.id = this.activateRoute.snapshot.paramMap.get('id');
  
    this.getEmploiEleve();
    this.getclasse();
  }

  getclasse()
  {

    this.classeservice.findById(this.id)  .subscribe((data) => {
      this.classeencours = data;
    }, error => {
      console.log(error);
    });
  }
  getheures() {
    
    this.emploisservice.getAllHeures()
      .subscribe((heuress) => {
        this.heures = heuress;
      }, error => {
        console.log(error);
      });
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  getEmploiEleve() {
    console.log('numero: '+this.id);
    this.emploisservice.getEmploiCLasse(this.id)
      .subscribe(pg =>this.programme = pg);
  }


  getPg(h: any, j: any)  {
   if(this.programme!=undefined){
    let s= this.programme.find(pg=> pg.jour.id=== (j.id as number));
    this.pg_test = this.programme.find(pg=> pg.jour.id===j.id && pg.heure.id===h.id);
    if(this.pg_test!=undefined)
    if(this.pg_test.prof!=undefined)
   
        return this.pg_test;
        
        //this.pg_test.heure.id +'/'+this.pg_test.jour.id;

      }
    }

    clickGoBack(){
        this.location.back();
    }

}
