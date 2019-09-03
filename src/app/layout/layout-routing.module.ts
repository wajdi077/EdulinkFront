import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './layout.component';
 
const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {path: 'gestion-retenu', loadChildren: './gestion-retenu/gestion-retenu.module#GestionRetenuModule'},
            {path: 'gestion-exclus', loadChildren: './gestion-exclus/gestion-exclus.module#GestionExclusModule'},
            {path: 'emplois-update', loadChildren: './emplois-update/emplois-update.module#EmploisUpdateModule'},
            {path: 'gestion-parrain', loadChildren: './gestion-parrain/gestion-parrain.module#GestionParrainModule'},
            {path: 'mon-emplois', loadChildren: './mon-emplois/mon-emplois.module#MonEmploisModule'},
            {path: 'notes', loadChildren: './notes/notes.module#NotesModule'},

            {path: 'gestion-emplois', loadChildren: './gestion-emplois/gestion-emplois.module#GestionEmploisModule'},

            {path: 'gestion-message', loadChildren: './gestion-message/gestion-message.module#GestionMessageModule'},

            {path: 'gestion-classes', loadChildren: './gestion-classes/gestion-classes.module#GestionClassesModule'},
            { path: 'upload-excel', loadChildren: './upload/upload.module#UploadModule' },

            {path: 'gestion-semaine', loadChildren: './gestion-semaine/gestion-semain.module#GestionSemaineModule'},

            {path: 'gestion-eleves', loadChildren: './gestion-eleves/gestion-eleves.module#GestionElevesModule'},

          {path: 'gestion-matieres', loadChildren: './gestion-matieres/gestion-matieres.module#GestionMatiereModule'},
         
            {path: 'gestion-salles', loadChildren: './gestion-salles/gestion-salles.module#GestionSallesModule'},

           {path: 'Dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'},
           {path: 'DashboardDirecteur', loadChildren: './dashboard-directeur/dashboard-directeur.module#DashboarddirecteurModule'},

           {path: 'historique', loadChildren: './gestion-historique/gestion-historique.module#GestionHistoriqueModule'},
           {path: 'archive', loadChildren: './gestion-archive/gestion-archive.module#GestionArchiveModule'},
           {path: 'gestion-roles', loadChildren: './gestion-roles/gestion-roles.module#GestionRolesModule'},
           {
               path: 'gestion-utilisateurs',
               loadChildren: './gestion-utilisateurs/gestion-utilisateurs.module#GestionUtilisateursModule'
           },
           {
            path: 'gestion-enseignant',
            loadChildren: './gestion-enseignant/gestion-enseignant.module#GestionEnseignantModule'
        },
        
        {
            path: 'gestion-niveau',
            loadChildren: './gestion-niveau/gestion-niveau.module#GestionNiveauModule'
        },
        {path: 'gestion-affecte-eleve', loadChildren: './gestion-affecte-eleve/gestion-affecte-eleve.module#GestionAffecteEleveModule'},
        ],

    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {
}
