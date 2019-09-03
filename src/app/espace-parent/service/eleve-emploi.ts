import { Matiere } from "src/app/layout/gestion-matieres/matiere";
import { Prof } from "./eleve-prof";
import { Salle } from "./eleve-salle";
import { Classes } from "src/app/layout/gestion-classes/classes";


export class EleveEmploi {
   public  id : any ;
    public jour: Jour;
    public heure: Heure;
    public matiere: Matiere;
    public prof: Prof;
    public salle: Salle;
    public classe:Classes ;
    dateprog: any;
    datefinprog: string;
    public constructor() {
    } 
}

class Jour {
    id: number;
    jour: string;
}

class Heure {
        id: number;
        heureDebut: string;
        heureFin: string;
}