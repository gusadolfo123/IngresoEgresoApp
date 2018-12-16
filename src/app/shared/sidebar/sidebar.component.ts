import {Component, OnInit, OnDestroy} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {User} from '../../interfaces/user.interface';
import {isNullOrUndefined} from 'util';
import {Store} from '@ngrx/store';
import {AppState} from 'src/app/app.reducers';
import {Subscription} from 'rxjs';
import {IngresoEgresoService} from 'src/app/services/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit, OnDestroy {
  user: User = {
    nombre: '',
    email: '',
    password: '',
  };

  subscripcionUser = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>,
    private ingreEgreService: IngresoEgresoService,
  ) {}

  ngOnInit() {
    this.getUser();
  }
  ngOnDestroy() {
    this.subscripcionUser.unsubscribe();
  }

  getUser() {
    this.subscripcionUser = this.store.select('Auth').subscribe(data => {
      if (!isNullOrUndefined(data.user)) {
        this.user.nombre = data.user.nombre;
        this.user.email = data.user.email;
      }
    });
  }

  // 1. Forma
  // getUser() {
  //   this.authService.getCurrentUser().subscribe(user => {
  //     if (!isNullOrUndefined(user)) {
  //       this.user.nombre = user.email;
  //       this.user.email = user.email;
  //     }
  //   });
  // }

  logout() {
    this.authService
      .logout()
      .then(res => {
        this.router.navigate(['/login']);
        this.ingreEgreService.cancelSubs();
      })
      .catch(error => {
        Swal({
          title: 'Error!',
          text: error.message,
          type: 'error',
        });
      });
  }
}
