import {Injectable} from "@angular/core";
import {ServiceLocator} from "./ServiceLocator";
import {APIService} from "./api.service";

@Injectable()
export class GenericService{
    protected _api:APIService;

    constructor(){
        this._api = ServiceLocator.injector.get(APIService);
    }



}
