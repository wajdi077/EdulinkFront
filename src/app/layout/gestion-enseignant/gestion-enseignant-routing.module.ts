import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestionEnseignantComponent } from './gestion-enseignant.component';
import { GestionaffectationniveauComponent } from './gestionaffectationniveau/gestionaffectationniveau.component';

const routes: Routes = [
    { path: '', component: GestionEnseignantComponent },
    {path: 'ajouterniveau/:id',component:GestionaffectationniveauComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionEnseignantRoutingModule { }
