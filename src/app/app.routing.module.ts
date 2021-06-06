import { NgModule } from '@angular/core'
import { Routes,
   RouterModule,
   PreloadingStrategy,
   PreloadAllModules } from '@angular/router'
import { AuthGuard } from '@Core/guards/auth-guard.service'
import { DefaultComponent } from './layout/container/default/default.component'

const routes: Routes = [
  { 
    path: '', 
    component: DefaultComponent,
    data: {
      reuseRoute: false,
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboards',
        loadChildren: () =>
          import('./pages/dashboards/dashboards.module').then(
            (m) => m.DashboardsModule
          ),
      }
    ]
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'security',
    loadChildren: () =>
      import('./pages/security/security.module').then(
        (m) => m.SecurityModule
      ),
  }  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      //preloadingStrategy: PreloadAllModules
    })
  ],
  providers: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
