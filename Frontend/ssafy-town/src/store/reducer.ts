import { AppState, AppAction, ActionTypes } from './state';

const initialState: AppState = {
    movekey: true,
};

const reducer = (state: AppState = initialState, action: AppAction): AppState => {
  switch (action.type) {
    case ActionTypes.NO_MOVE:
        return { ...state, movekey: false };
    case ActionTypes.YES_MOVE:
      return { ...state, movekey: true };

    default:
      return state;
  }
};

export default reducer;