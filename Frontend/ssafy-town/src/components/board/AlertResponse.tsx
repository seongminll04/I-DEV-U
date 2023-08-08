import React from 'react';
import styled_css from './AlertResponse.module.css';

import { useDispatch,useSelector } from 'react-redux';
import { setModal } from '../../store/actions';
import { AppState } from '../../store/state';

import { Client } from '@stomp/stompjs';

const AlertResponse: React.FC = () => {
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
          destination: '/pub/alert/send',
          body: JSON.stringify(data),
          });
      }
    dispatch(setModal(null))
  }

  return (
    <div className={styled_css.modal_overlay} onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {dispatch(setModal(null))}}}>
        <div className={styled_css.modal}>
            <h1>OO 프로젝트의 가입신청</h1>
            <h2>XXX 님이 가입을 신청하셨습니다</h2>
            <button onClick={enter}>수락</button><button onClick={()=>dispatch(setModal(null))}>거절</button>
        </div>
  </div>
  );
};

export default AlertResponse;
