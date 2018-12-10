import {Injectable} from '@angular/core';
import {User} from '../interfaces/user.interface';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User = {
    nombre: '',
    email: '',
    password: '',
  };

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  register(user: User) {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  login(user: User) {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  logout() {
    return this.afAuth.auth.signOut();
  }
}
