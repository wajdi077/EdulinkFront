import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multiFilter'
})
export class MultiFilterPipe implements PipeTransform {
    transform(value: any[], filterIndexs:number[]): any[] {

        let resultat = [];
    	if(filterIndexs.length == 0){
    		return value;
    	}
    	/*for(let index of filterIndexs){
    		let filter = filters[index-1]['name'];
    		resultat = resultat.concat(value.filter((user: any) =>
            (

            	user.sitesnames.indexOf(filter) !== -1) &&
            	!resultat.find((u)=>{return u.id == user.id})
            ));

    	}*/

        for(let filter of filterIndexs){
            
            resultat = resultat.concat(value.filter((user: any) =>
            (

                user.sitesids.indexOf(filter) !== -1) &&
                !resultat.find((u)=>{return u.id == user.id})
            ));

        }
        return resultat;
    }
}
