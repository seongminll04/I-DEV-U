import { Client } from "@stomp/stompjs";

interface chatroom {
  chatIdx:number,
  chatTitle:string,
  message :string,
  chatTime :string,
  
}
export interface AppState {
  isModalOpen: string|null;
  isSidebarOpen: string|null;
  isAllowMove:boolean;
  wantPJTId:number|null;

  stompClientRef:Client|null;
  receivedMessages:string[];
  receivedAlert:string[];
  chatroomList:chatroom[];
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