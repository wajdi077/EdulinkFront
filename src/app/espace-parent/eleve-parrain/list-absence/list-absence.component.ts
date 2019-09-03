import { Component, OnInit } from '@angular/core';
import { EspaceParrainService } from '../../service/espace-parrain.service';
import { ActivatedRoute } from '@angular/router';
import { EleveAbsence } from '../../service/eleve-absence';
import {Location} from '@angular/common';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-list-absence',
  templateUrl: './list-absence.component.html',
  styleUrls: ['./list-absence.component.scss']
})
export class ListAbsenceComponent implements OnInit {

  public displayedColumns: string[] = ['dateAbsence','matiere','nomClasse'];
  public dataSource =new MatTableDataSource<EleveAbsence>(); 
  
  public id: string;
  public listAbsence: EleveAbsence[];

  constructor(private espaceParrainService: EspaceParrainService,
    private activateRoute: ActivatedRoute,
    private location: Location) { }


  ngOnInit() {
    this.id= this.activateRoute.snapshot.paramMap.get('id');
    this.getListAbsenceEleveByInsc();
  }

  getListAbsenceEleveByInsc() {
      this.espaceParrainService.getListAbsenceEleveByNuminsc(this.id)
        .subscribe(res=> {
          this.listAbsence=res;
          console.log(res);
          this.dataSource.data = this.listAbsence;
        }
          );
  }

  clickGoBack(){
    this.location.back();
}

}
