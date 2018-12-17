import {Injectable} from '@angular/core';
import {CanActivate, Router, CanLoad} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {map, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate, CanLoad {
  constructor(private authServices: AuthService, private router: Router) {}

  canActivate() {
    return this.authServices.isAuth().pipe(
      map(fireUser => {
        if (fireUser == null) {
          this.router.navigate(['/login']);
        }
        return fireUser != null;
      }),
    );
  }

  // Carga el modulo correspondiente despues de que se cumpla la condicion
  canLoad() {
    return this.authServices
      .isAuth()
      .pipe(
        map(fireUser => {
          if (fireUser == null) {
            this.router.navigate(['/login']);
          }
          return fireUser != null;
        }),
      )
      .pipe(take(1)); // take(1) emite una unica vez y luego se desuscribe
  }
}
