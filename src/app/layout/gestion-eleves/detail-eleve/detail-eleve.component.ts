import { Component, OnInit } from '@angular/core';
import { Eleveservice } from '../gestion-eleves.service';
import { ActivatedRoute } from '@angular/router';
import { Eleve } from '../eleve';

@Component({
  selector: 'app-detail-eleve',
  templateUrl: './detail-eleve.component.html',
  styleUrls: ['./detail-eleve.component.scss']
})
export class DetailEleveComponent implements OnInit {

  eleve: any;
  numInscription: any;
  parrainOfEleve : any;
   penalities :{type: string; value:number}[]= [{type:"exclus", value:0},
    {type:"retenu", value:0},
    {type:"renvoie", value:0},
    {type:"Avertissement", value:0},
    {type:"autrepenalite", value:0}];
  constructor(private eleveService: Eleveservice,private route: ActivatedRoute) { }

  ngOnInit() {
    this.numInscription = this.route.snapshot.params['numInscription'];
    this.eleveService.getelevebynumInscription(this.numInscription).subscribe(data=>{
      
      this.eleve=data;
    });
    this.eleveService.getelevebyPenalite(this.numInscription).subscribe(data=>{
    
      for(let i=0; i<data.length;i++){
        if(data[i][0]== this.penalities[i].type){
          this.penalities[i].value= data[i][1]
        }
      }
    });
    this.eleveService.getparrainbyEleve(this.numInscription).subscribe(data=>{
      console.log('hahahahah')
      console.log(data)
      this.parrainOfEleve=data;
      
    
    });
  }


}
