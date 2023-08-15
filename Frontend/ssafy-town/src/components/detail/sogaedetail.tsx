import React, { useEffect, useState } from 'react';
import detail_css from './matedetail.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { setChatIdx, setChatTitle, setModal, setSidebar } from '../../store/actions';
import axios from 'axios';
import { Client } from '@stomp/stompjs';
import { AppState } from '../../store/state';

interface Props {
  userIdx: number;
}

interface userProps {
  imageUrl: string,
  nickname: string,
  work: number,
  language: number[],
  location: string,
  face: string,
  job: string,
  age: number,
  salary: number,
  gender: string,
  intro: string,
}

const SogaeDetail: React.FC<Props> = ({ userIdx }) => {
  const dispatch = useDispatch()
  const [mateUser, setMateUser] = useState<userProps>()
  const stompClientRef = React.useRef<Client | null>(null);
  stompClientRef.current = useSelector((state: AppState) => state.stompClientRef)
  useEffect(() => {
    const userToken = localStorage.getItem('userToken')
    axios({
      method: 'get',
      url: `https://i9b206.p.ssafy.io:9090/date/detail/${userIdx}`,
      headers: {
        Authorization: 'Bearer ' + userToken
      },
    })
      .then(res => {
        console.log(res.data)
        if (res.data.user) {
          setMateUser(res.data.user)
        }
        else {
          alert('유저 조회 실패')
        }
      })
      .catch(err => console.log(err))
  }, [userIdx])

  const sendrequest = () => {
    const userToken = localStorage.getItem('userToken')
    const senduserIdxStr = localStorage.getItem('userIdx')
    const senduserIdx = senduserIdxStr ? parseInt(senduserIdxStr,10) : null
    axios({
      method:'get',
      url: `https://i9b206.p.ssafy.io:9090/chat/rooms/check`,
      headers: {
        Authorization: 'Bearer ' + userToken
      },
      params :{
        fromIdx: senduserIdx,
        toIdx: userIdx,
      }
    })
    .then(res=>{
      console.log(res)
      if (res.data.data) {
        alert('이미 존재하는 채팅방이 있습니다')
        dispatch(setChatIdx(res.data.data.idx))
        dispatch(setChatTitle(res.data.data.title))
        dispatch(setSidebar('채팅방'))
      }
      else {
        if (stompClientRef.current && senduserIdx) {
          const now = new Date()
          const data = {
            fromIdx: senduserIdx,
            toIdx: userIdx,
            type:'SOGAE',
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
    })
    .catch(err => console.log(err))

  }
  return (
    <div className={detail_css.modal_overlay} onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => { if (e.target === e.currentTarget) { dispatch(setModal(null)) } }} >
      <div className={detail_css.modal}>
        <h1>소개팅 상세정보</h1>
        {mateUser ?
          <div>
            {mateUser?.nickname}
            <br />
            {mateUser?.intro}
            <br />
            {mateUser?.language.map((lang) => (
              lang + '    '
            ))}
            <br /><br /><br />
            <button onClick={sendrequest}>채팅 신청</button>
          </div>

          :
          <div>
            <h1>유저 조회 실패</h1>
          </div>
        }

      </div>
    </div>
  );
};

export default SogaeDetail;