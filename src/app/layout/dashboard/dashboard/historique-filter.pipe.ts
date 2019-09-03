import { Historique } from "../statistique-service.service";
import { Pipe, PipeTransform } from "@angular/core";



@Pipe({
    name: 'hisFilter'
})
export class HisFilterPipe implements PipeTransform {
    transform(his: Historique[], searchTerm: string): Historique[] {
        if (!his || !searchTerm) {
            return his;
        }

        return his.filter(his =>
            his.userConnect.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }
}
