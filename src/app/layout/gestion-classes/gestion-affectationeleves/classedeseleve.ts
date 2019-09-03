import { Classes } from "../classes";
import { Eleve } from "../../gestion-eleves/eleve";

export class ClassesDesEleves {

    
    public eleve : Eleve[] ;
    public nomclasse : string ;


    public constructor() {
    }

      Seteleve(eleve : Eleve []){

        return this.eleve=eleve;
    }
SetClass(nomclasse : string){


    return this.nomclasse=nomclasse;
}

}

  