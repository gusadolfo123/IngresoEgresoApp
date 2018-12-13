import {UserModel} from './user.model';
import * as fromAuth from './auth.actions';

export interface AuthState {
  user: UserModel;
}

const initialState: AuthState = {
  user: null,
};

export function AuthReducer(state = initialState, action: fromAuth.Actions): AuthState {
  switch (action.type) {
    case fromAuth.AuthActionTypes.SetUser:
      return {
        user: {...action.user},
      };
    default:
      return state;
  }
}
