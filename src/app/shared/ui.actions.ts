import {Action} from '@ngrx/store';

export enum UIActionTypes {
  ActivarLoading = '[UI Loading] Cargando...',
  DesactivarLoading = '[UI Loading] Fin de Carga...',
}

export class ActivarLoadingAction implements Action {
  readonly type = UIActionTypes.ActivarLoading;
}

export class DesactivarLoadingAction implements Action {
  readonly type = UIActionTypes.DesactivarLoading;
}

export type Actions = ActivarLoadingAction | DesactivarLoadingAction;
