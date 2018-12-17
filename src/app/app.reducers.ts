import {ActionReducerMap} from '@ngrx/store';
import {LoadingReducer, State} from './shared/ui.reducer';
import {AuthState, AuthReducer} from './auth/auth.reducer';
import {IngresoEgresoState, IngresoEgresoReducer} from './ingreso-egreso/ingreso-egreso.reducer';

// Estado de la aplicacion
export interface AppState {
  UI: State;
  Auth: AuthState;
  // IngresoEgreso: IngresoEgresoState;
}

export const AppReducers: ActionReducerMap<AppState> = {
  UI: LoadingReducer,
  Auth: AuthReducer,
  // IngresoEgreso: IngresoEgresoReducer,
};
