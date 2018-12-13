import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
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
}
