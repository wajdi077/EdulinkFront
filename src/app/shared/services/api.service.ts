import {Injectable} from '@angular/core';
import {Headers, RequestOptions} from '@angular/http';
import {HttpClient, HttpRequest, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {CONFIG} from "../../config";

// import {THROW_ERROR} from './error.handle';

@Injectable()
export class APIService {

    prefix: string = CONFIG.URL + CONFIG.apiPath;

    constructor(private http: HttpClient) {
    }

    protected createAuthorizationHeader(): HttpHeaders {
        let headers = new HttpHeaders();
        var token = localStorage.getItem('token');
        headers = headers.append('Authorization', 'Bearer ' + token);
        headers = headers.append('Content-Type', 'application/json');
        console.log(headers.keys());
        return headers;
    }

    getExtraOptions(): any {
        return {
            headers: this.createAuthorizationHeader()
        }
    }

    getURI(data: any) {
        let dataString = '?';
        for (const v in data) {
            dataString += v + '=' + data[v] + '&';
        }
        return dataString;
    }

    // getURI(data: any) {
    //     let dataString = '?id='+data;
    //
    //     return dataString;
    // }

    /*get(url: string, data?: any): Observable<any> {
        const dataString = this.getURI(data);
        console.log(dataString);
        //console.log('GET : ' + url, dataString, data);
    }*/
    get(url: string, data?: any): Observable<any> {
        const dataString = this.getURI(data);
        console.log('POST : ' + this.prefix + url, dataString, data);
        return this.http.get(this.prefix + url + dataString, this.getExtraOptions())
            .catch(this.handleError);
    }

    post(url: string, body: any = {}, data: any = {}): Observable<any> {
        const dataString = this.getURI(data);
        console.log('POST : ' + this.prefix + url, dataString, body, data);
        return this.http.post(this.prefix + url + dataString, body, this.getExtraOptions())
            .catch(this.handleError);
    }

    upload(url: string, files: any = {}, data: any = {}): any {
        url = this.prefix + url;
        const formData = new FormData();
        for (const i in files) {
            formData.append(i, files[i]);
        }
        const headers = new Headers();
        headers.delete('Content-Type');
        const options = new RequestOptions({headers: headers});

        const dataString = this.getURI(data);

        const req = new HttpRequest('POST', url + dataString, formData, {
            reportProgress: true
        });
        console.log('UPLOAD : ' + url, dataString, files, data);
        return this.http.request(req)
            .catch(this.handleError);
    }

    put(url: string, body: any = {}, data: any = {}): Observable<any> {
        const dataString = this.getURI(data);
        console.log('PUT : ' + url, dataString, body, data);
        return this.http.post(this.prefix + url + dataString, body, this.getExtraOptions())
            .catch(this.handleError);
    }

    delete(url: string, data: any = {}): Observable<any> {
        const dataString = this.getURI(data);
        console.log('DELETE : ' + url, data);
        return this.http.post(this.prefix + url ,data, this.getExtraOptions())
            .catch(this.handleError);
    }

    extractData(data: any) {
        return data.json();
    }

    // delayReq(observable,delay){
    //   return Observable.create(observer =>{
    //     setTimeout(()=>{
    //       observable.subscribe((data)=>{
    //         observer.next(data);
    //         observer.complete();
    //       })
    //     },delay)
    //   })
    // }

    protected handleError(error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || error || '';
            const err = body['error'] || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
