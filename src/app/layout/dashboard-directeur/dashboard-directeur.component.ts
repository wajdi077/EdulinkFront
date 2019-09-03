import { Component, OnInit } from '@angular/core';
import * as decode from 'jwt-decode';
import { DirecteurstatistiqueService } from './directeurstatistique.service';
interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}

const COUNTRIES: Country[] = [
  {
    name: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    area: 17075200,
    population: 146989754
  },
  {
    name: 'Canada',
    flag: 'c/cf/Flag_of_Canada.svg',
    area: 9976140,
    population: 36624199
  },
  {
    name: 'United States',
    flag: 'a/a4/Flag_of_the_United_States.svg',
    area: 9629091,
    population: 324459463
  },
  {
    name: 'China',
    flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    area: 9596960,
    population: 1409517397
  }
];


@Component({
  selector: 'app-dashboard-directeur',
  templateUrl: './dashboard-directeur.component.html',
  styleUrls: ['./dashboard-directeur.component.scss']
})
export class DashboardDirecteurComponent implements OnInit {
  countries = COUNTRIES;
  public username;
  public barChartData = [
    {data: [], label: 'Exclus'}
  ];

  public datasource: any;


  listOfData = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];

  constructor(private statservice :DirecteurstatistiqueService) { }

  ngOnInit() {
   
    var decoded = decode(localStorage.getItem('token'));
    this.username = decoded.sub;
    console.log("wajdi"+this.username);
    this.loadBarChartData();
  }
	public jsonObject: any;

  loadBarChartData () {
    this.statservice.getallstatistiques().subscribe((res:any) => {
       console.log(res);
     this.datasource=res ;
     console.log(this.datasource)
      /*this.jsonObject = JSON.stringify(this.dataSource);
      console.log('json'+this.jsonObject)*/





    });
  }






  

}
