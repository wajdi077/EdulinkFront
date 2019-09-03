import { Component, OnInit } from '@angular/core';
import { StatistiqueServiceService } from '../statistique-service.service';
import { NiveauService } from '../../gestion-niveau/gestion-niveau.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rapport-journalier',
  templateUrl: './rapport-journalier.component.html',
  styleUrls: ['./rapport-journalier.component.scss']
})
export class RapportJournalierComponent implements OnInit {
niveau : any ; 
penalities :{type: string; value:number}[]= [{type:"exclus", value:0},
{type:"retenu", value:0},
{type:"renvoie", value:0},
{type:"Avertissement", value:0},
{type:"autrepenalite", value:0}];
  constructor(private niveauservice:NiveauService,private route: ActivatedRoute,private statService:StatistiqueServiceService) { }
  ngOnInit() {
 /*this.niveau=this.route.snapshot.params['niveau'];
 this.niveauservice.getNiveau(this.niveau).subscribe(data=>{

 for(let i=0; i<DataCue.length;i++){
   if(data[i][0]==this.penalities[i].type){
     this.penalities[i].value=data[i][1]
   }
 }
 this.niveau=data;
 });
  */

  }}
