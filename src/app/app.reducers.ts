import {ActionReducerMap} from '@ngrx/store';
import {LoadingReducer, State} from './shared/ui.reducer';
import {AuthState, AuthReducer} from './auth/auth.reducer';

// Estado de la aplicacion
export interface AppState {
  UI: State;
  Auth: AuthState;
}

export const AppReducers: ActionReducerMap<AppState> = {
  UI: LoadingReducer,
  Auth: AuthReducer,
};
