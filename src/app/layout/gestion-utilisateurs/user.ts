export class User {
    constructor(public username: string,
                public password: string,
                public profil: string,
                public nom: string,
                public prenom: string,
                public tel: number,
                public email: string,
                public langue: string,
                //public photo: string,
                public enabled: boolean = true,) {
    }
}
