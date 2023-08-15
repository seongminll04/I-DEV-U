import React, { useEffect, useState } from 'react';
import detail_css from './matedetail.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { setChatIdx, setChatTitle, setModal, setSidebar } from '../../store/actions';
import axios from 'axios';
import { Client } from '@stomp/stompjs';
import { AppState } from '../../store/state';

interface Props {
  userIdx: number;
  percent: number;
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
  storedFileName: string;
}

const SogaeDetail: React.FC<Props> = ({ userIdx, percent }) => {
  const dispatch = useDispatch()
  const [mateUser, setMateUser] = useState<userProps>()
  const [Follow, setFollow] = useState(false);
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

  useEffect(() => {
    const userToken = localStorage.getItem('userToken')
    const userIdxStr = localStorage.getItem('userIdx')
    const userIndex = userIdxStr ? parseInt(userIdxStr, 10) : null
    axios({
      method: 'get',
      url: `https://i9b206.p.ssafy.io:9090/user/getFollowList/${userIndex}`,
      headers: {
        Authorization: 'Bearer ' + userToken
      },
    })
      .then(res => {
        if (res.data.data && res.data.data.data.find((user: any) => user.followIdx === userIdx)) {
          setFollow(true)
        }
        else { setFollow(false) }
      })
      .catch(err => {
        console.log(err);
      })
  }, [userIdx])

  const onfollow = () => {
    const userIdxStr = localStorage.getItem('userIdx')
    const userIndex = userIdxStr ? parseInt(userIdxStr, 10) : null
    const userToken = localStorage.getItem('userToken')
    if (Follow) {
      axios({
        method: 'delete',
        url: `https://i9b206.p.ssafy.io:9090/user/unfollow`,
        headers: {
          Authorization: 'Bearer ' + userToken
        },
        data: {
          userIdx: userIndex,
          followIdx: userIdx
        }
      })
        .then(() => setFollow(false))
    }
    else {
      axios({
        method: 'post',
        url: `https://i9b206.p.ssafy.io:9090/user/follow`,
        headers: {
          Authorization: 'Bearer ' + userToken
        },
        data: {
          userIdx: userIndex,
          followIdx: userIdx
        }
      })
        .then(() => setFollow(true))
    }
  }

  const sendrequest = () => {
    const userToken = localStorage.getItem('userToken')
    const senduserIdxStr = localStorage.getItem('userIdx')
    const senduserIdx = senduserIdxStr ? parseInt(senduserIdxStr,10) : null

    axios({
      method: 'get',
      url: `https://i9b206.p.ssafy.io:9090/chat/rooms/check`,
      headers: {
        Authorization: 'Bearer ' + userToken
      },
      params: {
        fromIdx: senduserIdx,
        toIdx: userIdx,
      }
    })
      .then(res => {
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
              type: 'SOGAE',
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
          <div style={{ display: 'flex', width: '90%', margin: 'auto' }}>
            <div style={{ width: '35%', borderRight: '2px solid black', }}>
              <h1>{mateUser.nickname}</h1>
              <img
                src={mateUser.storedFileName ? mateUser.storedFileName : "assets/default_profile.png"}
                alt=""
                style={{ borderRadius: "50%" }}
              />
              <p>나이 : {mateUser.age}</p>
              <p>성별 : {mateUser.gender}</p>

              <br />
              <p>자기소개 : {mateUser.intro}</p>
              <br />
              {/* {mateUser.language.map((lang) => (
                lang + '    '
              ))} */}
              {Follow ? <button onClick={onfollow}>언팔로우</button> : <button onClick={onfollow}>팔로우</button>}
              <br /><br /><br />
            </div>
            <div style={{ width: '65%', margin: '0 20px', boxSizing: 'border-box' }}>
              <br />
              <h2>일치율 : {percent} %</h2>
              <br />
              <button onClick={sendrequest}>채팅 신청</button>
            </div>
          </div>
          :
          <div>aa
            <h1>유저 조회 실패</h1>
          </div>
        }

      </div>
    </div>
  );
};

export default SogaeDetail;