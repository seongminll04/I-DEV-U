import { Client } from "@stomp/stompjs";


export interface AppState {
  isModalOpen: string|null;
  isSidebarOpen: string|null;
  isAllowMove:boolean;
  wantPJTId:number|null;

  stompClientRef:Client|null;

  receivedAlert:string[];
  isChatIdx:number|null; //채팅방 넘어갈때 인덱스 저장해줄곳
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