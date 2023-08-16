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

export const setStomp = (value: Client) => ({
  type: 'SET_STOMP',
  payload: value,
});

export const setReceiveAlert = (value: string[]) => ({
  type: 'SET_RECEIVEALERT',
  payload: value,
});

export const setChatIdx = (value: number|null) => ({
  type: 'SET_CHATIDX',
  payload: value,
});

export const setChatTitle = (value: string|null) => ({
  type: 'SET_CHATTITLE',
  payload: value,
});