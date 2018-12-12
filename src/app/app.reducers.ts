import {ActionReducerMap} from '@ngrx/store';
import {LoadingReducer, State} from './shared/ui.reducer';

// Estado de la aplicacion
export interface AppState {
  UI: State;
}

export const AppReducers: ActionReducerMap<AppState> = {
  UI: LoadingReducer,
};
