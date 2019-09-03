import { Matiere } from "../gestion-matieres/matiere";
import { Utilisateur } from "../gestion-utilisateurs/utilisateur";
import { User } from "../gestion-utilisateurs/user";
import { Classes } from "../gestion-classes/classes";
import { Heures } from "./heures";

export class Programme {
    public id: number;
    public typeprog: string;
    public matiere : Matiere ;
    public prof : User ; 
    public classe : Classes ;
    public  jour : string ;
    public heure : Heures ;
    public remarque: string;


    public constructor() {
    }}