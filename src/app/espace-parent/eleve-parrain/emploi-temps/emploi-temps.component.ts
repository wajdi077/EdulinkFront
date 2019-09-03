import { Component, OnInit } from '@angular/core';
import { EmploisService } from 'src/app/layout/gestion-emplois/emploisservice';
import { EspaceParrainService } from '../../service/espace-parrain.service';
import { Router, RouterLinkActive, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Observable, of } from 'rxjs';
import { EleveEmploi } from '../../service/eleve-emploi';
import {Location} from '@angular/common';

@Component({
  selector: 'app-emploi-temps',
  templateUrl: './emploi-temps.component.html',
  styleUrls: ['./emploi-temps.component.scss']
})
export class EmploiTempsComponent implements OnInit {

  displayedColumns: string[] = ['heureJour','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
  //heures: string[] = ['one', 'two', 'three', 'four', 'five'];



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
 

  constructor(private emploisservice:EspaceParrainService,
              private router:Router,
              private activateRoute:ActivatedRoute,
              private location: Location ) { 
              }

  ngOnInit() {
   this.router.navigated = false;
   this.getheures();
   
  // this.activateRoute.paramMap.subscribe(params => {
    
  //   this.emploisservice.getAllHeures()
  //     .subscribe((heures) => {
  //       console.log('test2');
  //       this.heures = heures;
  //       console.log('test3: '+heures.toString());
  //     }, error => {
  //       console.log(error);
  //     });
  // });

  this.id = this.activateRoute.snapshot.paramMap.get('id');
  this.getEmploiEleve();

  //  this.activateRoute.paramMap.subscribe(
  //     params => this.id = params['id']
  //   );

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
    this.emploisservice.getEmploiEleve(this.id)
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
