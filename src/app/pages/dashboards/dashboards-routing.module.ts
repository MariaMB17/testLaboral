import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { GraficaComponent } from './pages/grafica/grafica.component'

const routes: Routes = [
  {
    path: 'grafica',
    component: GraficaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardsRoutingModule { }
