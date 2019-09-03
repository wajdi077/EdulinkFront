import {Pipe, PipeTransform, Injectable} from "@angular/core";

@Pipe({
    name: 'filterLevelTwo',
    pure: false
})
@Injectable()
export class FilterTestPipe implements PipeTransform {

    /**
     * @items = object from array
     * @term = term's search
     */
    transform(items: any, term: any,arg1:any, arg2:any,arg3:any): any {
        if (term === undefined) return items;

        return items.filter(function(item) {
            for(let property in item){
                if (item[property] === null){
                    continue;
                }
                if(item[property].toString().toLowerCase().includes(term.toLowerCase())){
                    return true;
                }
                if(item[arg1]!=null){
                    if(item[arg1][arg2].toString().toLowerCase().includes(term.toLowerCase())){
                    return true;}
                }
                if(item[arg3]!=null){
                    if(item[arg3][arg2].toString().toLowerCase().includes(term.toLowerCase())){
                        return true;}
                }

            }
            return false;
        });
    }
}
