export interface AppState {
    movekey: boolean;
  }
  
export enum ActionTypes {
    NO_MOVE = 'NO_MOVE',
    YES_MOVE = 'YES_MOVE',
  }
  
export interface No_moveAction {
    type: ActionTypes.NO_MOVE;
  }
  
export interface Yes_moveAction {
    type: ActionTypes.YES_MOVE;
  }
  
export type AppAction = No_moveAction | Yes_moveAction;