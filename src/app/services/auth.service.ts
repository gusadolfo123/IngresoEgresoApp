import {Injectable} from '@angular/core';
import {User} from '../interfaces/user.interface';
import {AngularFireAuth} from '@angular/fire/auth';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  initAuthListener() {
    this.afAuth.authState.subscribe(fbUser => {
      console.log(fbUser);
    });
  }

  register(user: User) {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  login(user: User) {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.afAuth.authState;
  }

  getCurrentUser() {
    return this.afAuth.user;
  }
}
