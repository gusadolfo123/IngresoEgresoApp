import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {IngresoEgresoModel} from './ingreso-egreso.model';
import {IngresoEgresoService} from '../services/ingreso-egreso.service';

import Swal from 'sweetalert2';
import {Store} from '@ngrx/store';
import {AppState} from '../app.reducers';
import {ActivarLoadingAction, DesactivarLoadingAction} from '../shared/ui.actions';
import {Subscription} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [],
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  // se manejara con reactiveForms
  form: FormGroup;
  tipo = 'ingreso';
  subscription: Subscription = new Subscription();
  isLoading: boolean;

  constructor(
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>,
    private spinner: NgxSpinnerService,
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      descripcion: new FormControl('', Validators.required),
      monto: new FormControl(0, Validators.min(0)),
    });

    this.subscription = this.store.select('UI').subscribe(ui => {
      this.isLoading = ui.isLoading;
      if (ui.isLoading) {
        this.spinner.show();
      } else {
        this.spinner.hide();
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    const ingresoEgreso = new IngresoEgresoModel({...this.form.value, tipo: this.tipo});

    this.store.dispatch(new ActivarLoadingAction());

    this.ingresoEgresoService
      .crearIngresoEgreso(ingresoEgreso)
      .then(res => {
        this.store.dispatch(new DesactivarLoadingAction());
        this.form.reset({monto: 0});
        Swal({
          text: 'Grabacion Correcta',
          type: 'success',
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
}
