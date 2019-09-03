import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { SemaineService } from './gestion-semaine.service';
import { routerTransition } from '../../router.animations';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { SelectionComponent } from '../../shared/generic-components/selection.component';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { EleveParrain } from 'src/app/espace-parent/service/eleve-parrain';

@Component({
  selector: 'app-gestion-semaine',
  templateUrl: './gestion-semaine.component.html',
  styleUrls: ['./gestion-semaine.component.scss'],  animations: [routerTransition()], 
  providers: [SemaineService, NgbModal],

})
export class GestionSemaineComponent extends SelectionComponent implements OnInit  {
sem:any
datedebut : any ;
datefin :any ;
  semaines: any[];
  public dataSource =new MatTableDataSource<EleveParrain>(); 
  displayedColumns: string[] = ['Semaine Scolaire'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private semaineservice :SemaineService,private cdr: ChangeDetectorRef,private modalService: NgbModal) {
    super();
  }

  ngOnInit() {
    this.getsemaines();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getsemaines() {
    this.semaineservice.getAllSemaine()
        .subscribe((semaines) => {
            this.semaines = semaines;
            this.dataSource.data=semaines;
        }, error => {
            console.log(error);
        });
}


changeranges(u) {
this.sem=u;
}
addInterval()
{

this.semaineservice.addsemaine(this.sem.semaine,this.datedebut,this.datefin).subscribe(
  (res) => {
      console.log(res);
      if (res['response'] == true) {
     
      }
  },
  error => {
      alert(error);
  });


}
}
