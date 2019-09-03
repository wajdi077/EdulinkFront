import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { CONFIG } from '../config';
import { Message } from '../model/messagesecoket';


import * as decode from 'jwt-decode';
import { Observable } from 'rxjs';




@Injectable()
export class SocketService {
  url: string = CONFIG.URL + "api/socket";
  username: any;

  




  constructor(private http: HttpClient) { }

  post(data: Message) :Observable<any>{
    let url = CONFIG.URL + "api/socket";
    return this.http.post(this.url, data)
      .map((data: Message) => { return data; })
      .catch(error => {
        return new ErrorObservable(error);
      })
      ;
  }
  postnotif(username) :Observable<any> {
    let url = CONFIG.URL + "api/socket/getnotif"+'?username='+username ;

  
    return this.http.get(url);
     
 
}}