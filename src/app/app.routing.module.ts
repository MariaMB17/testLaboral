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
    canActivate: [AuthGuard] 
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  providers: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
