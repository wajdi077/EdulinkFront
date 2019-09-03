import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestionNiveauComponent } from './gestion-niveau.component';
import { EditNiveauComponent } from './edit-niveau/edit-niveau.component';

const routes: Routes = [
    { path: '', component: GestionNiveauComponent },
    { path: 'edit', component: EditNiveauComponent },
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionNiveauRoutingModule { }
