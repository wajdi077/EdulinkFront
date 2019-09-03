import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GestionRolesComponent} from "./gestion-roles.component";
import {AccessUrlComponent} from "./components/access-url/access-url.component";
 



const routes: Routes = [
    { path: '', component: GestionRolesComponent },
    { path: 'ajouter', component: AccessUrlComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionRolesRoutingModule { }
