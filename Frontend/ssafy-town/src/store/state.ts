import { Client } from "@stomp/stompjs";

export interface AppState {
  isModalOpen: string|null;
  isSidebarOpen: string|null;
  isAllowMove:boolean;
  wantPJTId:number|null;

  stompClientRef:Client|null;
  receivedMessages:string[];
  roomList:string[];
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