import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {HttpClient, HttpRequest, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {CONFIG} from "../../config";
import {GenericService} from "../../shared/services/GenericService";
import { HttpHeaders } from '@angular/common/http';
import * as decode from 'jwt-decode';
@Injectable()
export class UploadFileService {
  url5: string = CONFIG.URL  + 'api/referentiel/initReferentieleleve';
  url6: string = CONFIG.URL  + 'api/referentiel/initReferentielclasse';
  url7: string = CONFIG.URL  + 'api/referentiel/initReferentielsalle';
  url8: string = CONFIG.URL  +  'api/referentiel/initReferentielSurveillant';
  url9: string = CONFIG.URL  +  'api/referentiel/initReferentielAffectationEleve';
  constructor(private http: HttpClient) {}

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();

    formdata.append('file', file);

    const req = new HttpRequest('POST', this.url5, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  pushFileToStorageSurveillant(file: File): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    var decoded = decode(localStorage.getItem('token'));
        let username = decoded.sub;
        let url =   CONFIG.URL  +  'api/referentiel/initReferentielSurveillant'+'?login='+username;
      
    formdata.append('file', file);

    const req = new HttpRequest('POST', url, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }
  pushFileToStorageclasse(file: File): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();

    formdata.append('file', file);

    const req = new HttpRequest('POST', this.url6, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }
  pushFileToStoragesalle(file: File): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();

    formdata.append('file', file);

    const req = new HttpRequest('POST', this.url7, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }
  getFiles(): Observable<any> {
    return this.http.get('/getallfiles')
  }


    pushFileCategorieToStorage(  idcategorie:any ,file: File): Observable<HttpEvent<{}>> {
        let formdata: FormData = new FormData();

        formdata.append('file', file);


        const req = new HttpRequest('POST', 'http://localhost:8080/immobilier/back/upload/?idcategorie='+idcategorie,formdata, {
            reportProgress: true,
            responseType: 'text'
        });

        return this.http.request(req);
    }

    pushFileToStorageAffectationEleve(file: File): Observable<HttpEvent<{}>> {
      let formdata: FormData = new FormData();

      formdata.append('file', file);
  
      const req = new HttpRequest('POST', this.url9, formdata, {
        reportProgress: true,
        responseType: 'text'
      });
  
      return this.http.request(req);
      }
}
