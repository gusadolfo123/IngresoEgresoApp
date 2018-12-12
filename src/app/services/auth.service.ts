import {Injectable} from '@angular/core';
import {User} from '../interfaces/user.interface';
import {AngularFireAuth} from '@angular/fire/auth';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {UserModel} from '../auth/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private router: Router, private afDb: AngularFirestore) {}

  initAuthListener() {
    this.afAuth.authState.subscribe(fbUser => {
      console.log(fbUser);
    });
  }

  register(user: User) {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then(res => {
      // creacion de usuario en firebase
      const usu: UserModel = {
        nombre: user.nombre,
        email: user.email,
        uid: res.user.uid,
      };
      return this.afDb.doc(`${res.user.uid}/usuario`).set({usu});
    });
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
