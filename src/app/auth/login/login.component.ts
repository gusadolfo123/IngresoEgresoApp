import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {User} from '../../interfaces/user.interface';
import Swal from 'sweetalert2';
import {isNullOrUndefined} from 'util';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducers';
import {ActivarLoadingAction, DesactivarLoadingAction} from '../../shared/ui.actions';
import {NgxSpinnerService} from 'ngx-spinner';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit, OnDestroy {
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
  subscription: Subscription;

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

  // para que se descargue de memoria la subscripcion
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onLogin(formLogin: NgForm) {
    if (formLogin.valid) {
      this.store.dispatch(new ActivarLoadingAction());
      this.authService
        .login(this.user)
        .then(res => {
          this.router.navigate(['/']);
          this.store.dispatch(new DesactivarLoadingAction());
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
}
