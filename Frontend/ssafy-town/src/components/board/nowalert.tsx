import React from 'react';
import now_css from './nowalert.module.css';


import { useDispatch } from 'react-redux';
import { setModal } from '../../store/actions';
import axios from 'axios';

interface Props {
  message:any;
  onMessage:()=>void
}

const NowAlert: React.FC<Props> = ({message,onMessage}) => {
  const dispatch = useDispatch()
  const userToken = localStorage.getItem('userToken')
  console.log(message)
  const ok = () => {
    const now = new Date()
    axios({
      method:'post',
      url: 'https://i9b206.p.ssafy.io:9090/chat/rooms',
      data:{
        userIdx:message.fromUser.idx,
        title:'채팅방10',
        createdAt:now
      },
      headers: {
        Authorization: 'Bearer ' + userToken
      },
    })
    .then(res => {
      console.log(res,'생성')
      const userIdxStr = localStorage.getItem('userIdx')
      const userIdx = userIdxStr ? parseInt(userIdxStr,10) : null
      axios({
        method:'post',
        url: 'https://i9b206.p.ssafy.io:9090/chat/rooms/10/users',
        data:{
          userIdx:userIdx,
          updatedAt:now
        },
        headers: {
          Authorization: 'Bearer ' + userToken
        },
      })
      .then(() => {
        onMessage()
      })
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))

  }

  return (
    <div className={now_css.modal_overlay} onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) { dispatch(setModal(null)) }
    }} >
        <div className={now_css.QnA_modal}>
          <h1>동료찾기 요청</h1>
          {message ? 
          <>
          <p>
            {message.fromUser.nickname}님의 채팅신청이 들어왔습니다
          </p>
          <p>
            {message.createdAt}
          </p>
          <button onClick={ok}>수락</button>
          <button>거절</button>
          </>
          :
          null
          }

        </div>
 
    </div>
  );
};

export default NowAlert;
