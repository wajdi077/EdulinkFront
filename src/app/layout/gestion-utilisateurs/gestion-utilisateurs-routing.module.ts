import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestionUtilisateursComponent } from './gestion-utilisateurs.component';
import {AddNewUserComponent} from "./components/add-new-user/add-new-user.component";

const routes: Routes = [
    { path: '', component: GestionUtilisateursComponent },
    { path: 'ajouter', component: AddNewUserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionUtilisateursRoutingModule { }
