export interface AppState {
  isModalOpen: string|null;
  isSidebarOpen: string|null;
  isAllowMove:boolean;
  loginToken:string;
  SelectMap:string;
  wantPJTId:number|null;
  }
  
// export enum ActionTypes {
//     setModal = 'setModal',
//     setSidebar = 'setSidebar'
//   }

// export interface setModal {
//     type: ActionTypes.setModal;
//   }
// export interface setSidebar {
//   type: ActionTypes.setSidebar;
// }
  
// export type AppAction = setSidebar;