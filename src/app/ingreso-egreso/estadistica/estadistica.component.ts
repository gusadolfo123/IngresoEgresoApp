import {Component, OnInit, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
// import {AppState} from '../../app.reducers';
import {Subscription} from 'rxjs';
import {IngresoEgresoModel} from '../ingreso-egreso.model';
import {filter} from 'rxjs/operators';
import {AppState} from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [],
})
export class EstadisticaComponent implements OnInit, OnDestroy {
  ingresos: number;
  egresos: number;
  countIngresos: number;
  countEgresos: number;
  subscripcion: Subscription = new Subscription();

  // Doughnut
  public doughnutChartLabels: string[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: number[] = [];
  public doughnutChartType = 'doughnut';

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.subscripcion = this.store
      .select('IngresoEgreso')
      .pipe(filter(res => res.items != null)) // solo permite pasar el observable si este no es null
      .subscribe(res => {
        this.contarIngresoEgreso(res.items);
      });
  }

  contarIngresoEgreso(items: IngresoEgresoModel[]) {
    this.ingresos = 0;
    this.egresos = 0;
    this.countIngresos = 0;
    this.countEgresos = 0;

    items.forEach(item => {
      if (item.tipo === 'ingreso') {
        this.countIngresos++;
        this.ingresos += item.monto;
      } else {
        this.countEgresos++;
        this.egresos += item.monto;
      }
    });

    this.doughnutChartData = [this.ingresos, this.egresos];
  }

  ngOnDestroy() {
    this.subscripcion.unsubscribe();
  }
}
