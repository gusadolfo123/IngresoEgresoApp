import {Component, OnInit, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducers';
import {Subscription} from 'rxjs';

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

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.subscripcion = this.store.select('IngresoEgreso').subscribe(res => {
      const ingresos = res.items.filter(item => item.tipo === 'ingreso');
      const egresos = res.items.filter(item => item.tipo === 'egreso');
      this.countIngresos = ingresos.length;
      this.countEgresos = egresos.length;

      console.log(this.ingresos, this.egresos);
    });
  }

  ngOnDestroy() {
    this.subscripcion.unsubscribe();
  }
}
