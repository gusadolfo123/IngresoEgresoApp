import {Action} from '@ngrx/store';
import {UserModel} from './user.model';

export enum AuthActionTypes {
  SetUser = '[Auth] Set User',
}
export class SetUserAction implements Action {
  readonly type = AuthActionTypes.SetUser;
  constructor(public user: UserModel) {}
}

export type Actions = SetUserAction;
