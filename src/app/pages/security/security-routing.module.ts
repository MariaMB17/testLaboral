import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** se encarga de redirecionar al modulo de registrar usuarios */
const routes: Routes = [
  {
    path: 'users',
    loadChildren: () =>
      import('./user/user.module').then((m) => m.UserModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecurityRoutingModule { }
