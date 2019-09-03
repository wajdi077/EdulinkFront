import { Component, OnInit, ViewChild } from '@angular/core';
import { EspaceParrainService } from '../../service/espace-parrain.service';
import { EleveParrain } from '../../service/eleve-parrain';
import * as decode from 'jwt-decode';
import { MatTableDataSource,MatPaginator } from '@angular/material';
// import { Input } from 'Ancien/node_modules_old/@angular/core';

@Component({
  selector: 'app-list-eleve',
  templateUrl: './list-eleve.component.html',
  styleUrls: ['./list-eleve.component.scss']
})
export class ListEleveComponent implements OnInit {

  constructor(private espaceParrainService:EspaceParrainService ) {}
  
  // @Input() eleveCourant: string;

  listEleve: EleveParrain[];
  username;
  public dataSource =new MatTableDataSource<EleveParrain>(); 
  displayedColumns: string[] = ['numInscription','nom','prenom','classeActuel','dateNaissance','emploiTemps','absence','penalite'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  ngOnInit() {
    if(localStorage.getItem('token')!=null){
      var decoded= decode(localStorage.getItem('token'));
      this.username= decoded.sub;
    }
    this.getListEleve();

    this.dataSource.paginator = this.paginator;
  }



  getListEleve(): void{
    this.espaceParrainService.getElevesByParrain(this.username)
    .subscribe(eleves => {
      this.listEleve = eleves;
      console.log(eleves)
      this.dataSource.data=this.listEleve;
    });
  }

  // actionEmploi(nom: string){
  //   this.eleveCourant = nom;
  // }


}
