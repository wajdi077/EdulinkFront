import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClassesService } from '../../gestion-classes/gestion-classes.service';
import { Classes } from '../../gestion-classes/classes';
import { StatistiqueServiceService, Historique, HistoriqueClasse, HistoriqueUser } from '../statistique-service.service';

@Component({ 
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  searchTerm: string; 
  key: string = 'nom'; 
  reverse: boolean = false;
  his: Historique[] = [];
  hisClasse: HistoriqueClasse[] = [];
  hisUsers : HistoriqueUser[]=[];
  mode: number;
  classes: Classes[] = [];
  constructor(private statService: StatistiqueServiceService) { }
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
 
  public barChartLabels = [];
  public label = [];
  public currentLevel = '8b';
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData = [
    {data: [], label: 'Exclus'},
    {data: [], label: 'Retenue'},
    {data: [], label: 'Avertissement'}
  ];

  getLevel () {
    console.log(this.currentLevel);
    this.barChartData = [
      {data: [], label: 'Exclus'},
      {data: [], label: 'Retenue'},
      {data: [], label: 'Averti'}
    ];
    this.barChartLabels = [];
    this.loadBarChartData();
  }


loadBarChartData () {
  this.statService.getNumPenaltiesByClass().subscribe((data) => {
    let d = data.filter(t => t[0].includes(this.currentLevel));
    console.log(data);
    d.forEach(t => {
      if (!this.barChartLabels.includes(t[0])) this.barChartLabels.push(t[0]);
      switch (t[1]) {
        case 'exclus':
          this.barChartData[0].data.push(t[2])
          break;
        case 'retenu':
          this.barChartData[1].data.push(t[2]);
          break;
        case 'averti':
          this.barChartData[2].data.push(t[2]);
          break;
        default:
          break;
      }
    })
  });
}

getAllHisEtab() {
  this.statService.getAllHistEtab()
      .subscribe((data) => {
          this.his = data;
          console.log(data);
          
      }, error => {
          console.log(error);
      });
}
getAllHistClasse() {
  this.statService.getAllHistClasse()
      .subscribe((data) => {
          this.hisClasse = data;
          console.log(data);
          
      }, error => {
          console.log(error);
      });
}
getAllHisUser() {
  this.statService.getAllHisUser()
      .subscribe((data) => {
          this.hisUsers = data;
          console.log(data);
          
      }, error => {
          console.log(error);
      });
}
sort(key) {
  this.key = key;
  this.reverse = !this.reverse;
}
  ngOnInit() {
    this.loadBarChartData();
    this.getAllHisEtab();
    this.getAllHistClasse();
    this.getAllHisUser();
  }
mode1(){
  this.mode=1;
}
mode2(){
  this.mode=2;
}
mode3(){
  this.mode=3;
}
mode4(){
  this.mode=4;
}
}
