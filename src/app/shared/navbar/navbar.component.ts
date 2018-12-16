import {Component, OnInit, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from 'src/app/app.reducers';
import {UserModel} from 'src/app/auth/user.model';
import {isNullOrUndefined} from 'util';
import {map} from 'rxjs/operators';
import {User} from 'src/app/interfaces/user.interface';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [],
})
export class NavbarComponent implements OnInit, OnDestroy {
  user: User = {
    nombre: '',
    email: '',
    password: '',
  };

  subscription = new Subscription();

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.getUser();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getUser() {
    this.subscription = this.store
      .select('Auth')
      .pipe(map(data => data.user))
      .subscribe(user => {
        if (!isNullOrUndefined(user)) {
          this.user.nombre = user.nombre;
          this.user.email = user.email;
        }
      });
  }
}
