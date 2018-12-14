import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {IngresoEgresoModel} from '../ingreso-egreso/ingreso-egreso.model';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from './auth.service';
import {Store} from '@ngrx/store';
import {AppState} from '../app.reducers';
import {filter, map} from 'rxjs/operators';
import {SetItemsAction} from '../ingreso-egreso/ingreso-egreso.actions';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IngresoEgresoService {
  ingEgreListenerSub = new Subscription();
  ingEgreItemsSub = new Subscription();

  constructor(private AfDB: AngularFirestore, private authService: AuthService, private store: Store<AppState>) {}

  cancelSubs() {
    this.ingEgreListenerSub.unsubscribe();
    this.ingEgreItemsSub.unsubscribe();
  }

  initIngresoEgresoListener() {
    this.ingEgreListenerSub = this.store
      .select('Auth')
      .pipe(filter(auth => auth.user != null)) // solo permite pasar el observable si este no es null
      .subscribe(auth => {
        this.ingresoEgresoItems(auth.user.uid);
      });
  }

  private ingresoEgresoItems(uid: string) {
    this.ingEgreItemsSub = this.AfDB.collection(`${uid}/ingresos-egresos/items`)
      // .valueChanges() escucha los cambios
      .snapshotChanges() // retorna el documento con todo y ID
      .pipe(
        map(data => {
          return data.map(doc => {
            return {
              uid: doc.payload.doc.id,
              ...doc.payload.doc.data(),
            };
          });
        }),
      )
      .subscribe((collection: any[]) => {
        this.store.dispatch(new SetItemsAction(collection));
      });
  }

  crearIngresoEgreso(ingresoEgreso: IngresoEgresoModel) {
    const user = this.authService.getUser();

    return this.AfDB.doc(`${user.uid}/ingresos-egresos`)
      .collection('items')
      .add({...ingresoEgreso});
  }

  eliminarIngresoEgreso(uid: string) {
    const user = this.authService.getUser();
    return this.AfDB.doc(`${user.uid}/ingresos-egresos/items/${uid}`).delete();
  }
}
