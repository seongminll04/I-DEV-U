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
    // const senduserIdx = localStorage.getItem('userIdx')
    if (stompClientRef.current) {
      const now = new Date()
      const data = {
        userIdx: userIdx,
        createdAt: now
      };
      console.log(data)
      stompClientRef.current.publish({
        destination: `/sub/join/${userIdx}`,
        body: JSON.stringify(data),
      });
    }
  }


  return (
    <div className={detail_css.modal_overlay} onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => { if (e.target === e.currentTarget) { dispatch(setModal(null)) } }} >
      <div className={detail_css.modal}>
        <h1>동료 상세정보</h1>
        {mateUser ?
          <div>
            {mateUser?.nickname}
            <br />
            {mateUser?.intro}
            <br />
            {mateUser?.techList.map((tech) => (
              tech + '    '
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

export default MateDetail;