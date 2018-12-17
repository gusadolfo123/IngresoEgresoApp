import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DetalleComponent} from './detalle/detalle.component';
import {EstadisticaComponent} from './estadistica/estadistica.component';
import {IngresoEgresoComponent} from './ingreso-egreso.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {OrdenIngresoEgresoPipe} from './orden-ingreso-egreso.pipe';
import {ReactiveFormsModule} from '@angular/forms';
import {ChartsModule} from 'ng2-charts';
import {SharedModule} from '../shared/shared.module';
import {DashboardRoutingModule} from '../dashboard/dashboard-routing.module';

@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrdenIngresoEgresoPipe,
  ],
  imports: [CommonModule, ReactiveFormsModule, ChartsModule, SharedModule, DashboardRoutingModule],
  exports: [],
})
export class IngresoEgresoModule {}
