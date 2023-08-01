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

export const setSelectMap = (value: string) => ({
  type: 'SET_SELECTMAP',
  payload: value,
});
