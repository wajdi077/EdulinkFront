import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnseignantComponent } from './enseignant/enseignant.component';
import { ModifierEmploisComponent } from './modifier-emplois/modifier-emplois.component';
import { EmploiTempsComponent } from 'src/app/espace-parent/eleve-parrain/emploi-temps/emploi-temps.component';
import { EmploisClassesComponent } from './emplois-classes/emplois-classes.component';




const routes: Routes = [
    { path: '', component: EnseignantComponent },
    { path: 'update', component: ModifierEmploisComponent },
    { path: 'emploisclasses', component: EmploisClassesComponent },

    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateEmploisRoutingModule { }
