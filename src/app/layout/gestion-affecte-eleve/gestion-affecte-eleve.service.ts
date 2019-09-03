import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {HttpClient, HttpRequest, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//import { Utilisateur } from './utilisateur';
import { HttpHeaders } from '@angular/common/http';
import {CONFIG} from "../../config";
import {GenericService} from "../../shared/services/GenericService";
import * as decode from 'jwt-decode';
@Injectable()
export class AffectationEleveService {

    url1: string = CONFIG.URL  +  'api/referentiel/initReferentielAffectationEleve';

    constructor(private http: HttpClient) {}
    getFiles(): Observable<any> {
      return this.http.get('/getallfiles')
    }
    pushFileToStorageAffectationEleve(file: File): Observable<HttpEvent<{}>> {
      let formdata: FormData = new FormData();

      formdata.append('file', file);
  
      const req = new HttpRequest('POST', this.url1, formdata, {
        reportProgress: true,
        responseType: 'text'
      });
  
      return this.http.request(req);
      }

}



