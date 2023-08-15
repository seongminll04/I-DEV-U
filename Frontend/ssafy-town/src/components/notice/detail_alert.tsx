import React from 'react';
import alert_css from '../sidebar/1alert.module.css';
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { setChatIdx, setChatTitle, setModal, setSidebar } from '../../store/actions';

interface Props {
  backpage: () => void;
  Selalert: {
    idx: number;
    createdAt: string;
    type: string;
    fromUser:{
      idx:number,
      nickname:string,
    },
    toUser:{
      idx:number,
      nickname:string,
    }
  };
}


const DetailAlert: React.FC<Props> = ({ backpage, Selalert }) => {
  const dispatch = useDispatch()

  const ok = () => {
    const userToken = localStorage.getItem('userToken')
    const now = new Date()
    // 채팅방 생성
    axios({
      method:'post',
      url: 'https://i9b206.p.ssafy.io:9090/chat/rooms',
      data:{
        userIdx:Selalert.fromUser.idx,
        title: Selalert.fromUser.nickname + '님의 mate 채팅방',
        createdAt:now
      },
      headers: {
        Authorization: 'Bearer ' + userToken
      },
    })
    .then(res => {
      const userIdxStr = localStorage.getItem('userIdx')
      const userIdx = userIdxStr ? parseInt(userIdxStr,10) : null

      axios({
        method:'delete',
        url: `https://i9b206.p.ssafy.io:9090/alarm/${Selalert.idx}`,
        headers: {
          Authorization: 'Bearer ' + userToken
        },
      })
      .then(res => console.log(res))
      .catch(err=>console.log(err))
      // 채팅방 참가
      dispatch(setChatIdx(res.data.data.roomIdx))
      dispatch(setChatTitle(Selalert.fromUser.nickname + '님의 mate 채팅방'))
      axios({
        method:'post',
        url: `https://i9b206.p.ssafy.io:9090/chat/rooms/${res.data.data.roomIdx}/users`,
        data:{
          userIdx:userIdx,
          updatedAt:now
        },
        headers: {
          Authorization: 'Bearer ' + userToken
        },
      })
      .then(() => {
        dispatch(setSidebar('채팅방'))
        dispatch(setModal(null))

      })
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))

  }

  const nope = () => {
    const userToken = localStorage.getItem('userToken')
     axios({
        method:'delete',
        url: `https://i9b206.p.ssafy.io:9090/alarm/${Selalert.idx}`,
        headers: {
          Authorization: 'Bearer ' + userToken
        },
      })
      .then(() => backpage())
      .catch(err=>console.log(err))
  }
  return (
    <div className={alert_css.alert_modal2}>
      <div className={alert_css.buttons}>
        <p className={alert_css.backbtn} onClick={backpage}>돌아가기</p>
        <p className={alert_css.closebtn} onClick={() => { dispatch(setModal(null)) }}>닫기</p>
      </div>
      <br></br>
      <div className={alert_css.alert_detail}>
        {Selalert ? (
          <>
          <h1>
            {Selalert.type === 'PROJECT' ? `${Selalert.fromUser.nickname}님의 프로젝트 가입신청입니다.`
            : Selalert.type === 'MATE' ? `${Selalert.fromUser.nickname}님의 동료신청입니다.`
            : Selalert.type === 'CHAT' ? `${Selalert.fromUser.nickname}님의 채팅신청입니다.`
            : null}
          </h1>
          <button onClick={ok}>수락</button>
          <button onClick={nope}>거절</button>
          </>
        ) : (
          'Loading...'
        )}
      </div>
    </div>
  );
};

export default DetailAlert;