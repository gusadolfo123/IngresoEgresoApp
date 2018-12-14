import {IngresoEgresoModel} from './ingreso-egreso.model';
import * as fromIngEre from './ingreso-egreso.actions';

export interface IngresoEgresoState {
  items: IngresoEgresoModel[];
}

const initialState: IngresoEgresoState = {
  items: [],
};

export function IngresoEgresoReducer(state = initialState, action: fromIngEre.Actions): IngresoEgresoState {
  switch (action.type) {
    case fromIngEre.IngresoEgresoActionTypes.Set_Item:
      return {
        items: [
          ...action.items.map(item => {
            return {...item};
          }),
        ],
      };
    case fromIngEre.IngresoEgresoActionTypes.Unset_Items:
      return {items: []};
    default:
      return state;
  }
}
