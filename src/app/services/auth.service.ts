import {Injectable} from '@angular/core';
import {User} from '../interfaces/user.interface';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {UserModel} from '../auth/user.model';
import {Store} from '@ngrx/store';
import {AppState} from '../app.reducers';
import {SetUserAction, UnsetUserAction} from '../auth/auth.actions';
import {Subscription} from 'rxjs';
import {UnsetItemsAction} from '../ingreso-egreso/ingreso-egreso.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private UserSubscription: Subscription = new Subscription();
  private usuario: UserModel;
  private IngEgreSubs: Subscription = new Subscription();

  constructor(private afAuth: AngularFireAuth, private afDb: AngularFirestore, private store: Store<AppState>) {}

  getUser() {
    return {...this.usuario};
  }

  initAuthListener() {
    this.IngEgreSubs = this.afAuth.authState.subscribe(fbUser => {
      if (fbUser) {
        this.UserSubscription = this.afDb
          .doc(`${fbUser.uid}/usuario`)
          .valueChanges()
          .subscribe((usrObj: any) => {
            const newUser = new UserModel(usrObj);
            this.store.dispatch(new SetUserAction(newUser));
            this.usuario = newUser;
          });
      } else {
        this.UserSubscription.unsubscribe();
        this.usuario = null;
      }
    });
  }

  cancelarSubscripciones() {
    this.UserSubscription.unsubscribe();
    this.IngEgreSubs.unsubscribe();
    this.store.dispatch(new UnsetItemsAction());
  }

  register(usuario: User) {
    return this.afAuth.auth.createUserWithEmailAndPassword(usuario.email, usuario.password).then(res => {
      // creacion de usuario en firebase
      const user: UserModel = {
        nombre: usuario.nombre,
        email: usuario.email,
        uid: res.user.uid,
      };
      return this.afDb.doc(`${res.user.uid}/usuario`).set(user);
    });
  }

  login(user: User) {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  logout() {
    this.store.dispatch(new UnsetItemsAction());
    this.store.dispatch(new UnsetUserAction());
    return this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.afAuth.authState;
  }

  getCurrentUser() {
    return this.afAuth.user;
  }
}
