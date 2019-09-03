import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { TopnavbarComponent } from '../shared/topnavbar/topnavbar.component';
import { FooternavbarComponent } from '../shared/footernavbar/footernavbar.component';
import { AsidenavComponent } from '../shared/asidenav/asidenav.component';
import { SettingnavbarComponent } from '../shared/settingnavbar/settingnavbar.component';
import { NavbarParentComponent } from '../espace-parent/navbar-parent/navbar-parent.component';
import { EspaceParentComponent } from '../espace-parent/espace-parent.component';
import { DashboardParrainComponent } from '../espace-parent/dashboard-parrain/dashboard-parrain.component';
import { FooterBarParrainComponent } from '../espace-parent/footer-bar-parrain/footer-bar-parrain.component';
import { EspaceParentModule } from '../espace-parent/espace-parrain.module';
import { GestionUtilisateursModule } from './gestion-utilisateurs/gestion-utilisateurs.module';
import { GestionEnseignantComponent } from './gestion-enseignant/gestion-enseignant.component';
import { AddComponent } from './gestion-enseignant/add/add.component';
import { UpdateComponent } from './gestion-enseignant/update/update.component';
import { GestionNiveauComponent } from './gestion-niveau/gestion-niveau.component';
import { AddNiveauComponent } from './gestion-niveau/add-niveau/add-niveau.component';
import { EditNiveauComponent } from './gestion-niveau/edit-niveau/edit-niveau.component';
import { HistoriqueComponent } from './historique/historique/historique.component';











@NgModule({
    imports: [
        CommonModule,

        LayoutRoutingModule,GestionUtilisateursModule,


EspaceParentModule


    ],
    exports:[TopnavbarComponent,
        AsidenavComponent,
         FooternavbarComponent,
          SettingnavbarComponent],
    declarations: [TopnavbarComponent,
        AsidenavComponent,
         FooternavbarComponent,
          SettingnavbarComponent,
        LayoutComponent
       // EspaceprofesseurComponent,
    ],
    providers:[
    ]

})
export class LayoutModule { }
