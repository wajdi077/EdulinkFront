import { Injectable, OnInit } from '@angular/core';
import { CONFIG } from 'src/app/config';
import { Observable } from 'rxjs/Observable';
import { EleveParrain } from './eleve-parrain';
import { Http } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map'
import { catchError, retry } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
import { HttpClient } from '@angular/common/http';
import { EleveEmploi } from './eleve-emploi';
import { ElevePenalite } from './eleve-penalite';
import { EleveAbsence } from './eleve-absence';


@Injectable({
  providedIn: 'root'
})
export class EspaceParrainService implements OnInit{

  constructor(private http: HttpClient, private configService:ConfigService) { 

  }

  listEleve: EleveParrain[];

  url: string = CONFIG.URL+CONFIG.apiPath;

  ngOnInit(){
    this.url= CONFIG.URL+CONFIG.apiPath;

  }

  getElevesByParrain(username): Observable<EleveParrain[]>{

    // this.url=this.url+ 'Parrain/allbyParrain?username='+username;
    // console.log('url: '+this.url);
    // console.log('url: '+this.http.get(this.url)
    // .map(response => response.json()).subscribe(res => console.log(res)));

    

    return this.http.get<EleveParrain[]>(this.url+ 'Parrain/allbyParrain?username='+username);
       // .map(response => response.json());
  }

  getAllHeures(): Observable<any> {
        return this.http.get(this.url+ 'emplois/allheures')
        .pipe(retry(3));
  }

  getEmploiEleve(num: string): Observable<EleveEmploi[]> {
    return this.http.get<EleveEmploi[]>(this.url + `programmes/programme/byinscription?Num_Inscription=${num}`);
  }
  getEmploiCLasse(id: any): Observable<EleveEmploi[]> {
    return this.http.get<EleveEmploi[]>(this.url + `programmes/programme/classe?Num_Inscription=${id}`);
  }
  getEmploiProf(username: any): Observable<EleveEmploi[]> {
    return this.http.get<EleveEmploi[]>(this.url + `programmes/programme/enseignant?username=${username}`);
  }
  getListPenaliteEleveByNuminscr(numInsc: string): Observable<ElevePenalite[]> {

    return this.http.get<ElevePenalite[]>(this.url + `Parrain/allPenalitesByEleves?numInscription=${numInsc}`);
  }

  getListAbsenceEleveByNuminsc(numInsc: string): Observable<EleveAbsence[]> {

   return this.http.get<EleveAbsence[]>(this.url + `Parrain/allabsencebyeleve?numInscription=${numInsc}`);
  }
}
