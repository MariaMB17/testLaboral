import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './page/user.component';
import { AuthGuard } from '@Core/guards/auth-guard.service';
const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    data: {
      reuseRoute: true,
    },
    children: [
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
})
export class UserRoutingModule { }
