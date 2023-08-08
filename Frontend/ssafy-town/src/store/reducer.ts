import { AppState } from './state';

const initialState: AppState = {
    isModalOpen: null,
    isSidebarOpen:null,
    isAllowMove:true,
    wantPJTId:null,

    stompClientRef:null,
    receivedMessages:[],
    roomList:[],
};

const reducer = (state: AppState = initialState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case 'SET_MODAL':
      if (state.isModalOpen===action.payload){return {...state, isModalOpen: null,};}
      else {return {...state, isModalOpen: action.payload,}}
    case 'SET_SIDEBAR':
      if (state.isSidebarOpen===action.payload){return {...state, isSidebarOpen: null,};}
      else {return {...state, isSidebarOpen: action.payload,}}
    case 'SET_ALLOWMOVE':
        return {...state, isAllowMove: action.payload}
    case 'SET_WANTPJT':
        return {...state, wantPJTId: action.payload}


    case 'SET_STOMP':
        return {...state, stompClientRef: action.payload}
    case 'SET_RECEIVEMESSAGES':
      return {...state, receivedMessages: action.payload}
    case 'SET_ROOMLIST':
      return {...state, roomList: action.payload}
  
      
    default:
      return state;
  }
};

export default reducer;