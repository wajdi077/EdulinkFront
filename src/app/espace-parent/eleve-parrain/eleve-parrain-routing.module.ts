import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListEleveComponent } from './list-eleve/list-eleve.component';
import { EmploiTempsComponent } from './emploi-temps/emploi-temps.component';
import { EspaceParentComponent } from '../espace-parent.component';
import { DashboardParrainComponent } from '../dashboard-parrain/dashboard-parrain.component';
import { ListAbsenceComponent } from './list-absence/list-absence.component';
import { ListPenaliteComponent } from './list-penalite/list-penalite.component';

const routes: Routes = [
   {path:'', component: ListEleveComponent },
   { path: 'eleve-parrain', redirectTo:'/espaceParent/list-eleve'},
   { path: 'espaceParent/list-eleve', component: ListEleveComponent},
   { path: 'espaceParent/emploi/:id', component:EmploiTempsComponent },
   { path: 'espaceParent/absence/:id', component: ListAbsenceComponent},
   { path: 'espaceParent/penalite/:id', component: ListPenaliteComponent}
   
 //{ path: 'acceuil', component: EmploiTempsComponent},
 //{ path: 'emploi', component: EmploiTempsComponent}
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EleveParrainRoutingModule { }
