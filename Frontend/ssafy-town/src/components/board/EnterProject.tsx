import React from 'react';
import enter_css from './EnterProject.module.css';

import { useDispatch,useSelector } from 'react-redux';
import { setModal } from '../../store/actions';
import {AppState} from '../../store/state';

import { Client } from '@stomp/stompjs';

const EnterProject: React.FC = () => {
  const dispatch=useDispatch()
  const wantPJTId = useSelector((state: AppState) => state.wantPJTId);
  const stompClientRef = React.useRef<Client | null>(null);
  stompClientRef.current = useSelector((state: AppState) => state.stompClientRef)
  
  const enter = () => {
    const userIdxStr = localStorage.getItem('userIdx')
    const userIdx = userIdxStr ? parseInt(userIdxStr, 10):null

    if (userIdx && stompClientRef.current) {
      const data = {
        'userIdx': userIdx,
        'projectIdx': wantPJTId
      };
      stompClientRef.current.publish({
          destination: '/pub/alert/request',
          body: JSON.stringify(data),
          });
      }
    dispatch(setModal(null))
  }

  return (
    <div className={enter_css.modal_overlay} onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {dispatch(setModal(null))}}}>
        <div className={enter_css.modal}>
            <h1>OO 프로젝트</h1>
            <h2>참가신청 하시겠습니까?</h2>
            <button onClick={enter}>참가</button><button onClick={()=>dispatch(setModal(null))}>취소</button>
        </div>

  </div>
  );
};

export default EnterProject;
