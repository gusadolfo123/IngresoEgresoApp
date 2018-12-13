import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {IngresoEgresoModel} from '../ingreso-egreso/ingreso-egreso.model';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class IngresoEgresoService {
  constructor(private AfDB: AngularFirestore, private authService: AuthService) {}

  crearIngresoEgreso(ingresoEgreso: IngresoEgresoModel) {
    const user = this.authService.getUser();

    return this.AfDB.doc(`${user.uid}/ingresos-egresos`)
      .collection('items')
      .add({...ingresoEgreso});
  }
}
