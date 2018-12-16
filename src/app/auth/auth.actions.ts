import {Action} from '@ngrx/store';
import {UserModel} from './user.model';

export enum AuthActionTypes {
  SetUser = '[Auth] Set User',
  UnsetUser = '[Auth] Unset User',
}
export class SetUserAction implements Action {
  readonly type = AuthActionTypes.SetUser;
  constructor(public user: UserModel) {}
}

export class UnsetUserAction implements Action {
  readonly type = AuthActionTypes.UnsetUser;
}

export type Actions = SetUserAction | UnsetUserAction;
