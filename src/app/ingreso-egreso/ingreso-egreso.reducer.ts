import {IngresoEgresoModel} from './ingreso-egreso.model';
import * as fromIngEre from './ingreso-egreso.actions';

export interface IngresoEgresoState {
  ingresoEgreso: IngresoEgresoModel;
}

const initialState: IngresoEgresoState = {
  ingresoEgreso: null,
};

export function IngresoEgresoReducer(state = initialState, action: fromIngEre.Actions): IngresoEgresoState {
  switch (action.type) {
    case fromIngEre.IngresoEgresoActionTypes.Set_Item:
      return {ingresoEgreso: {...action.item}};
    default:
      return state;
  }
}
