import { Component, OnInit } from '@angular/core';
import { EspaceParrainService } from '../../service/espace-parrain.service';
import { ActivatedRoute } from '@angular/router';
import { ElevePenalite } from '../../service/eleve-penalite';
import {Location} from '@angular/common';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-list-penalite',
  templateUrl: './list-penalite.component.html',
  styleUrls: ['./list-penalite.component.scss']
})
export class ListPenaliteComponent implements OnInit {

  public numIns:string;
  public listPenalite: ElevePenalite[];
  public displayedColumns: string[] = ['datepenalite','matiere','nomClasse','remarque'];

  public dataSource =new MatTableDataSource<ElevePenalite>(); 

  constructor(private elevePanaliteService:EspaceParrainService,
             private activateRoute:ActivatedRoute,
             private location: Location ) { }

  ngOnInit() {
    this.numIns=this.activateRoute.snapshot.paramMap.get('id');
    this.getListPenaliteEleveByNumins(); 

    

    console.log(this.dataSource);
  }

  getListPenaliteEleveByNumins(){
    this.elevePanaliteService.getListPenaliteEleveByNuminscr(this.numIns)
      .subscribe(res => {
        this.listPenalite=res;
        console.log(res);
        this.dataSource.data=this.listPenalite;
      }
        );
  }

  clickGoBack(){
    this.location.back();
}
}
