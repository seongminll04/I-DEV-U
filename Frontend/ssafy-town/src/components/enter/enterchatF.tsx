import React from 'react';
import enter_css from '../board/EnterProject.module.css';

import { useDispatch,useSelector } from 'react-redux';
import { setModal } from '../../store/actions';
import { AppState } from '../../store/state';
import { Client } from '@stomp/stompjs';


interface Props {
    sendusername:string,
    senduserIdx:number
}
const EnterChatF: React.FC<Props> = ({sendusername,senduserIdx}) => {
  const dispatch=useDispatch()
  const stompClientRef = React.useRef<Client | null>(null);
  stompClientRef.current = useSelector((state: AppState) => state.stompClientRef)
  
  const enter = () => {
    const userIdxStr = localStorage.getItem('userIdx')
    const userIdx = userIdxStr ? parseInt(userIdxStr, 10):null
    if (stompClientRef.current && senduserIdx) {
      const now = new Date()
      const data = {
        fromIdx: userIdx,
        toIdx: senduserIdx,
        type:'CHAT',
        createdAt: now
      };
      stompClientRef.current.publish({
        destination: `/pub/user`,
        body: JSON.stringify(data),
      });
      alert('채팅 신청 완료')
      dispatch(setModal(null))
    }
  }

  return (
    <div className={enter_css.modal_overlay} onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {dispatch(setModal(null))}}}>
        <div className={enter_css.modal}>
            <h1>{sendusername} 님에게</h1>
            <h2>채팅신청 하시겠습니까?</h2>
            <button onClick={enter}>신청</button><button onClick={()=>dispatch(setModal(null))}>취소</button>
        </div>

  </div>
  );
};

export default EnterChatF;
