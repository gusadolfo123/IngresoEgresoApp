import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {map} from 'rxjs/operators';
import {isNullOrUndefined} from 'util';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private authServices: AuthService, private router: Router) {}

  canActivate() {
    let result = false;

    this.authServices.isAuth().pipe(
      map(fireUser => {
        console.log(fireUser);
        if (fireUser == null) {
          this.router.navigate(['/']);
        } else {
          this.router.navigate(['/login']);
        }
        result = fireUser != null;
      }),
    );

    return result;
    // const autenticado = false;
    // if (autenticado === false) {
    //   this.router.navigate(['/login']);
    //   return false;
    // } else {
    //   this.router.navigate(['/']);
    //   return true;
    // }
  }
}
