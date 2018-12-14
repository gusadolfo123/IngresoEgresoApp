import {Component, OnInit, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducers';
import {IngresoEgresoModel} from '../ingreso-egreso.model';
import {Subscription} from 'rxjs';
import {IngresoEgresoService} from '../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivarLoadingAction, DesactivarLoadingAction} from '../../shared/ui.actions';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [],
})
export class DetalleComponent implements OnInit, OnDestroy {
  items: IngresoEgresoModel[];
  subscipcion: Subscription = new Subscription();
  subLoading: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    private ingEgreService: IngresoEgresoService,
    private spinner: NgxSpinnerService,
  ) {}

  ngOnInit() {
    this.subscipcion = this.store.select('IngresoEgreso').subscribe(ingreEgre => {
      this.items = ingreEgre.items;
    });
    this.subLoading = this.store.select('UI').subscribe(ui => {
      if (ui.isLoading) {
        this.spinner.show();
      } else {
        this.spinner.hide();
      }
    });
  }

  ngOnDestroy() {
    this.subscipcion.unsubscribe();
  }

  EliminarItem(uid: string) {
    this.store.dispatch(new ActivarLoadingAction());
    this.ingEgreService
      .eliminarIngresoEgreso(uid)
      .then(res => {
        this.store.dispatch(new DesactivarLoadingAction());
        Swal({
          text: 'Registro Eliminado',
          type: 'warning',
        });
      })
      .catch(error => {
        this.store.dispatch(new DesactivarLoadingAction());
        Swal({
          title: 'Error!',
          text: error.message,
          type: 'error',
        });
      });
  }

  ModificarItem(uid: string) {
    console.log(uid);
  }
}
