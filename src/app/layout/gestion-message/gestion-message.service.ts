import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//import { Utilisateur } from './utilisateur';
import {CONFIG} from "../../config";
import {GenericService} from "../../shared/services/GenericService";



@Injectable()
export class MessageService {
    url5: string = CONFIG.URL + CONFIG.apiPath +'data/messages/';
 
    constructor(private _http: Http) {
        
    }
    createAuthorizationHeader(headers: Headers) {
        var token = localStorage.getItem('token');
        headers.append('Authorization', 'Bearer ' + token);
    }
    sendmessage(reciever: any, message: any, sujet: any, username: any,
        ): Observable<any[]> {
            console.log("service");
            console.log("reciever"+reciever);
            console.log("message"+message);
            console.log("sujet"+sujet);
            console.log("username"+username);
            let urlsend = CONFIG.URL + CONFIG.apiPath +'data/messages/send/'
    let headers = new Headers({'Content-Type': 'application/json'});
    this.createAuthorizationHeader(headers);
    console.log(urlsend, JSON.stringify({
        reciever: reciever,message: message,sujet: sujet,
        username:username}));
    return this._http.post(urlsend, JSON.stringify({
        reciever: reciever, message: message, sujet: sujet,
        username: username
        } || null)
        , {headers: headers})
        .map(response => response.json()).catch(this.handleError)
        ;
}



getmessagerecu(username :any) {
    let urlrecieve = CONFIG.URL + CONFIG.apiPath +'data/messages/recue/'+'?username='+username; 
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this._http.get(urlrecieve, {headers: headers})
    .map(response => response.json()).catch(this.handleError)
    ;

}
getmessageenvoye(username :any) {
    let urlrecieve = CONFIG.URL + CONFIG.apiPath +'data/messages/envoyer/'+'?username='+username; 
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this._http.get(urlrecieve, {headers: headers})
    .map(response => response.json()).catch(this.handleError)
    ;

}
private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
        errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
}
deletemessage(id: any): any {
    //console.log(username);
    let urldelete = CONFIG.URL + CONFIG.apiPath +'data/messages/remove'; 
    let headers = new Headers({'Content-Type': 'application/json'});
    this.createAuthorizationHeader(headers);
    return this._http.post(urldelete, id, {headers: headers})
        .map(response => response.json()).catch(this.handleError)
        ;
}
}