import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';

import { EspaceParentComponent } from './espace-parent/espace-parent.component';


const routes: Routes = [

  { path: 'login', loadChildren: './login/login.module#LoginModule' },
  {
    path: '',
    loadChildren: './layout/layout.module#LayoutModule',
    canActivate:[AuthGuard]

  },

  {path: 'espaceParent', 
  loadChildren: './espace-parent/espace-parrain.module#EspaceParentModule'
  ,  canActivate:[AuthGuard]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
