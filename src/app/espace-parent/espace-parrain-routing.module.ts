import { Router, RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { EspaceParentComponent } from "./espace-parent.component";
import { ListEleveComponent } from "./eleve-parrain/list-eleve/list-eleve.component";
import { EmploiTempsComponent } from "./eleve-parrain/emploi-temps/emploi-temps.component";
import { DashboardParrainComponent } from "./dashboard-parrain/dashboard-parrain.component";
import { DashboardComponent } from "../layout/dashboard/dashboard/dashboard.component";

const routes: Routes = [
    // {path: '', redirectTo:'/eleve-parrain',pathMatch: 'full'}
{path:'', component: EspaceParentComponent,
children: [
    {path: '', loadChildren: './eleve-parrain/eleve-parrain.module#EleveParrainModule'}
]}
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class EspaceParrainRoutingModule {

}