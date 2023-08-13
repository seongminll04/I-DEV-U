import React, { useEffect, useState } from 'react';
import detail_css from './matedetail.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../../store/actions';
import axios from 'axios';
import { Client } from '@stomp/stompjs';
import { AppState } from '../../store/state';

interface Props {
  userIdx: number;
}

interface userProps {
  userIdx: number,
  name: string,
  nickname: string,
  intro: string,
  techList: string[]
}

const MateDetail: React.FC<Props> = ({ userIdx }) => {
  const dispatch = useDispatch()
  const [mateUser, setMateUser] = useState<userProps>()
  const stompClientRef = React.useRef<Client | null>(null);
  stompClientRef.current = useSelector((state: AppState) => state.stompClientRef)
  useEffect(() => {
    const userToken = localStorage.getItem('userToken')
    axios({
      method: 'get',
      url: `https://i9b206.p.ssafy.io:9090/partner/detail/${userIdx}`,
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
    const senduserIdxStr = localStorage.getItem('userIdx')
    const senduserIdx = senduserIdxStr ? parseInt(senduserIdxStr,10) : null
    if (stompClientRef.current && senduserIdx) {
      const now = new Date()
      const data = {
        fromIdx: senduserIdx,
        toIdx: userIdx,
        type:'MATE',
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
    <div className={detail_css.modal_overlay} onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => { if (e.target === e.currentTarget) { dispatch(setModal(null)) } }} >
      <div className={detail_css.modal}>
        <h1>동료 상세정보</h1>
        {mateUser ?
          <div style={{display:'flex', width:'90%', margin:'auto'}}>
            <div style={{width:'35%', borderRight:'2px solid black',}}>
              <h1>{mateUser.nickname}</h1>  
              <img src="assets/default_profile.png" alt="" style={{ width: '100px', height: '100px' }} />
              <p>나이 : oo</p>
              <p>성별 : oo</p>
              <button>팔로우</button>
            </div>
            <div style={{width:'65%', margin:'0 20px', boxSizing:'border-box'}}>
              <h2>자기소개 : {mateUser.intro}</h2>
              <h2>기술스택 : {mateUser.techList.map((tech) => (
                tech + ' '
              ))}
              </h2>
              <br />
              <h1>일치율</h1>
              <h2>ㅁㅁㅁ 님께서 선택하신 조건과 OOO 님의 일치율은 XX% 입니다</h2>
              <br />
              <button onClick={sendrequest}>채팅 신청</button>
            </div>
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

export default MateDetail;