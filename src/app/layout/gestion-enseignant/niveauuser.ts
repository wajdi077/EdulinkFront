import { Utilisateur } from "../gestion-utilisateurs/utilisateur";
import { Niveau } from "../gestion-niveau/niveau";

export class NiveauUser {

    
    public niveau : Niveau[] ;
    public nomenseignant : string ;


    public constructor() {
    }

      Setniveau(niveau : Niveau []){

        return this.niveau=niveau;
    }
SetEnseignant(nomenseignant : string){


    return this.nomenseignant=nomenseignant;
}

}

  