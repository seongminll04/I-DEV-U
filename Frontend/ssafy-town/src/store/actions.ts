import { Client } from "@stomp/stompjs";

export const setModal = (value: string|null) => ({
    type: 'SET_MODAL',
    payload: value,
});

export const setSidebar = (value: string|null) => ({
  type: 'SET_SIDEBAR',
  payload: value,
});

export const setAllowMove = (value: boolean) => ({
  type: 'SET_ALLOWMOVE',
  payload: value,
});

export const setWantPJTId = (value: number) => ({
  type: 'SET_WANTPJT',
  payload: value,
});

export const setStomp = (value: Client) => ({
  type: 'SET_STOMP',
  payload: value,
});

export const setReceiveMessages = (value: string[]) => ({
  type: 'SET_RECEIVEMESSAGES',
  payload: value,
});

export const setReceiveAlert = (value: string[]) => ({
  type: 'SET_RECEIVEALERT',
  payload: value,
});

export const setChatRoomList = (value: string[]) => ({
  type: 'SET_CHATROOMLIST',
  payload: value,
});

