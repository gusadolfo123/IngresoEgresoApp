import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {User} from '../../interfaces/user.interface';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {ActivarLoadingAction, DesactivarLoadingAction} from '../../shared/ui.actions';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducers';
import {NgxSpinnerService} from 'ngx-spinner';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit, OnDestroy {
  user: User = {
    nombre: '',
    email: '',
    password: '',
  };

  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) {}

  loading: boolean;
  subscription: Subscription = new Subscription();

  ngOnInit() {
    this.subscription = this.store.select('UI').subscribe(ui => {
      this.loading = ui.isLoading;
      if (this.loading) {
        this.spinner.show();
      } else {
        this.spinner.hide();
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(formRegister: NgForm) {
    // Activa loading mientras se registra usuario en firebase
    this.store.dispatch(new ActivarLoadingAction());

    this.authService
      .register(this.user)
      .then(res => {
        this.router.navigate(['/']);
        // Desactiva loading
        this.store.dispatch(new DesactivarLoadingAction());
      })
      .catch(error => {
        // Desactiva loading
        this.store.dispatch(new DesactivarLoadingAction());
        Swal({
          title: 'Error!',
          text: error.message,
          type: 'error',
        });
      });
  }
}
