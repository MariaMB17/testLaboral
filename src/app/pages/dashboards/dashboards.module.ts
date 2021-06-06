import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@Shared/shared.module';
import { DashboardsRoutingModule } from './dashboards-routing.module';
import { GraficaComponent } from './pages/grafica/grafica.component';



@NgModule({
  declarations: [GraficaComponent],
  imports: [
    CommonModule,
    DashboardsRoutingModule,
    SharedModule
  ]
})
export class DashboardsModule { }
