import * as fromUI from './ui.actions';

export interface State {
  isLoading: boolean;
}

const initState: State = {
  isLoading: false,
};

export function LoadingReducer(state = initState, action: fromUI.Actions): State {
  switch (action.type) {
    case fromUI.UIActionTypes.ActivarLoading:
      return {isLoading: true};
    case fromUI.UIActionTypes.DesactivarLoading:
      return {isLoading: false};
    default:
      return state;
  }
}
