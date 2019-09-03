import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'makeFilter'
})

export class MakeFilterPipe implements PipeTransform {
    transform(input: any[], filter: string): any[] {

    	 var output: any[] = [];
    	 output = input;

		if (filter != '---Tous---') {
    	filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? output.filter((product: any) =>
            product.profil.toLocaleLowerCase().indexOf(filter) !== -1) : output;
		}else{
    		return input;
    	}
    	

        
    }
}