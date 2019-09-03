import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotesComponent } from './notes.component';
import { AfficherNotesComponent } from './affichernotes.component';




const routes: Routes = [
    { path: '', component: NotesComponent },
    { path: 'afichernotes', component: AfficherNotesComponent },

    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class    NotesRoutingModule { }
