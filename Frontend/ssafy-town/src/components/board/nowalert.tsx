import React, {useEffect} from 'react';
import now_css from './nowalert.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setChatIdx, setChatTitle, setModal, setSidebar } from '../../store/actions';
import axiosInstance from '../../interceptors'; // axios 인스턴스 가져오기
import { Client, Message } from '@stomp/stompjs';
import { AppState } from '../../store/state';

interface Props {
  message:any;
  onMessage:()=>void
}

const NowAlert: React.FC<Props> = ({message,onMessage}) => {
  const dispatch = useDispatch()
  const userToken = localStorage.getItem('userToken')
  const stompClientRef = React.useRef<Client | null>(null);
  stompClientRef.current = useSelector((state: AppState) => state.stompClientRef)
  
  useEffect(()=>{
    if (!message) {
      onMessage()
      return
    }
  },[message,onMessage])

  const ok = () => {
    const now = new Date()
    // 채팅방 생성
    axiosInstance({
      method:'post',
      url: 'https://i9b206.p.ssafy.io:9090/chat/rooms',
      data:{
        userIdx:message.fromUser.idx,
        title: message.fromUser.nickname+', '+message.toUser.nickname ,
        createdAt:now
      },
      headers: {
        Authorization: 'Bearer ' + userToken
      },
    })
    .then(res => {
      const userIdxStr = localStorage.getItem('userIdx')
      const userIdx = userIdxStr ? parseInt(userIdxStr,10) : null

      axiosInstance({
        method:'delete',
        url: `https://i9b206.p.ssafy.io:9090/alarm/${message.idx}`,
        headers: {
          Authorization: 'Bearer ' + userToken
        },
      })
      .then(res => console.log(res))
      .catch(err=>console.log(err))

      // 채팅방 참가
      dispatch(setChatIdx(res.data.data.roomIdx))
      dispatch(setChatTitle(message.fromUser.nickname+'의 채팅방' ))
      axiosInstance({
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
        onMessage();

      })
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))

  }

  // 난수 만들기 함수
  function generateRandomString(length:number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
  }

  const sogaeOK = () => {
    const random = generateRandomString(12)
    // 수락 반응 리스폰
    const timeout1 = setTimeout(() => {
      if (stompClientRef.current) {
        localStorage.setItem('userNum',random)
        localStorage.setItem('OVsession',random)
        const data = {
          message:'수락',
          OVsession:random
        };
        stompClientRef.current.publish({
          destination: `/sub/wait/${message.fromUser.idx}`,
          body: JSON.stringify(data),
        });
        // 해당 알람삭제
        axiosInstance({
          method:'delete',
          url: `https://i9b206.p.ssafy.io:9090/alarm/${message.idx}`,
          headers: {
            Authorization: 'Bearer ' + userToken
          },
        })
        .then(() => {
          
            if (stompClientRef.current) {
              stompClientRef.current.subscribe(`/sub/response/${random}`, function(message: Message) {
                alert('소개팅 맵으로 이동합니다.')
                window.location.href='https://i9b206.p.ssafy.io/love'
  
            });
            return ()=>{
              if (stompClientRef.current) {
                stompClientRef.current.unsubscribe(`/sub/response/${random}`);
              }
            }
            }
        })
        .catch(err=>console.log(err))

        const timeout3 = setTimeout(() => {
          alert('상대방이 온라인 상태가 아닙니다. 취소되었습니다.')
          onMessage();
        }, 10000);
      return () => {
        clearTimeout(timeout3)
      }
      }
    }, 1000);
    return()=>{
      clearTimeout(timeout1)
    }
  }
  // const nono = () => {
  //   axiosInstance({
  //     method:'delete',
  //     url: `https://i9b206.p.ssafy.io:9090/alarm/${message.idx}`,
  //     headers: {
  //       Authorization: 'Bearer ' + userToken
  //     },
  //   })
  //   .then(() => {
  //     onMessage();
  //   })
  //   .catch(err=>console.log(err))

  // }
  return (
    <div className={now_css.modal_overlay} onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) { onMessage(); dispatch(setModal(null)) }}} >
        <div className={now_css.QnA_modal}>
          {message.type === 'SOGAE' ? 
          <div>
            <h1>소개팅 신청</h1>
            <h2>
              {message.fromUser.nickname}님의 소개팅 신청이 들어왔습니다
            </h2>
            <button className={now_css.chatreq} onClick={sogaeOK}>수락</button>
            <button className={now_css.chatreq} onClick={()=>{onMessage(); dispatch(setModal(null)) }}>거절</button>
          </div>
          : message.type==='MATE' ? 
          <>
            <h1>동료찾기 신청</h1>
            <h2>
              {message.fromUser.nickname}님의 채팅신청이 들어왔습니다
            </h2>
    
            <button className={now_css.chatreq} onClick={ok}>수락</button>
            <button className={now_css.chatreq} onClick={()=>{onMessage(); dispatch(setModal(null)) }}>거절</button>
          </>
          : message.type==='CHAT' ? 
          <>
            <h1>채팅신청</h1>
            <h2>
              {message.fromUser.nickname}님의 채팅신청이 들어왔습니다
            </h2>
            <button className={now_css.chatreq} onClick={ok}>수락</button>
            <button className={now_css.chatreq} onClick={()=>{onMessage(); dispatch(setModal(null))}}>거절</button>
          </>
          :null}
        </div>
    </div>
  );
};

export default NowAlert;
