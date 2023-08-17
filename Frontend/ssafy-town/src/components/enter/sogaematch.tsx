import React, {useEffect} from 'react';
import enter_css from './sogaematch.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../../store/actions';
import { AppState } from '../../store/state';
import { Client, Message } from '@stomp/stompjs';

const SogaeMatch: React.FC = () => {
  const dispatch=useDispatch()
  const stompClientRef = React.useRef<Client | null>(null);
  stompClientRef.current = useSelector((state: AppState) => state.stompClientRef)


  useEffect(()=>{
    const timout = setTimeout(() => {
      alert('응답없음')
      dispatch(setModal(null))
    }, 60000);

    if (stompClientRef.current) {
      const userIdx = localStorage.getItem('userIdx')
      const subscription = stompClientRef.current.subscribe(`/sub/wait/${userIdx}`, function(message: Message) {
        const newMessage = JSON.parse(message.body);
        if (newMessage.message==='수락') {
          localStorage.setItem('OVsession',newMessage.OVsession)
          // alert('매칭 성공!')
          if (stompClientRef.current){
            stompClientRef.current.publish({
              destination: `/sub/response/${newMessage.OVsession}`,
              body: JSON.stringify(''),
            });
            window.location.href='https://i9b206.p.ssafy.io/love'
          }
        }
        else {
          alert('매칭 거절')
        }
      });
      
      return () => {
        clearTimeout(timout)
        if (stompClientRef.current) {
          subscription.unsubscribe();
        }
      };
    }
    
  },[stompClientRef, dispatch])

  const matchout = () =>{
    dispatch(setModal(null))
  }

  return (
    <div className={enter_css.modal_overlay}>
        <div className={enter_css.modal}>
            <h1>매칭 대기중...</h1>
            <div className={enter_css.loadingContainer}>
                <div className={enter_css.dot}></div>
                <div className={`${enter_css.dot} ${enter_css.delayed}`} style={{ animationDelay: '.5s' }}></div>
                <div className={`${enter_css.dot} ${enter_css.delayed}`} style={{ animationDelay: '1s' }}></div>
            </div>
            <button onClick={matchout}>매칭취소</button>
        </div>

  </div>
  );
};

export default SogaeMatch;
