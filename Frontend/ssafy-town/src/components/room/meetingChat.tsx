import React, { useState, useEffect } from 'react';

import { useDispatch,useSelector } from 'react-redux';
import { AppState } from '../../store/state';
import { Client, Message } from '@stomp/stompjs';
import { setAllowMove } from '../../store/actions';

import styled_css from './meetingChat.module.css'

interface messageProps {
    userName: string, 
    message: string,
    createdAt: Date
  }

const MeetingChat: React.FC = () => {
  const dispatch=useDispatch()
  const stompClientRef = React.useRef<Client | null>(null);
  stompClientRef.current = useSelector((state: AppState) => state.stompClientRef!)
  const isSidebarOpen = useSelector((state: AppState) => state.isSidebarOpen);//사이드바 오픈여부
  const [messageInput, setMessageInput] = useState('');
  const [receiveMessages, setReceiveMessages] = useState<messageProps[]>([])

  
  const handlekeydown = (event:React.KeyboardEvent<HTMLInputElement>) => {
    const inputElement = event.currentTarget
    const currentCursorPosition = inputElement.selectionStart || 0;
    if (event.key === 'ArrowLeft' && currentCursorPosition!==0) {
      inputElement.setSelectionRange(currentCursorPosition - 1, currentCursorPosition - 1);
    } else if (event.key === 'ArrowRight') {
      inputElement.setSelectionRange(currentCursorPosition + 1, currentCursorPosition + 1);
    } else if (event.key === ' '){
      inputElement.value = inputElement.value.slice(0,currentCursorPosition)+ ' ' +inputElement.value.slice(currentCursorPosition,)
      inputElement.setSelectionRange(currentCursorPosition+1 , currentCursorPosition+1);
    } else if (event.key === 'Enter') {
      sendMessage()
    } else if (event.key==='Escape') {
      inputElement.blur()
    }} 
    
    const sendMessage = () => {
      const OVsession = localStorage.getItem('OVsession')
      if (stompClientRef.current) {
        const userName = localStorage.getItem('userNickname')
        const data = {
          userName: userName, 
          message: messageInput,
          createdAt: new Date()
        };
        // console.log(data)
        stompClientRef.current.publish({
          destination: `/sub/msg/${OVsession}`,
          body: JSON.stringify(data),
        });
        setMessageInput('');
    }};
    useEffect(() => {
      const OVsession = localStorage.getItem('OVsession');
      
      const delay = 2000; // 2초 딜레이 설정 (밀리초 단위)
      const timeoutId = setTimeout(() => {
        if (stompClientRef.current) {
          const subscription = stompClientRef.current.subscribe(`/sub/msg/${OVsession}`, function(message: Message) {
            const newMessage = JSON.parse(message.body);
            const newd = {
              'userName': newMessage.userName,
              'message': newMessage.message,
              'createdAt': new Date(newMessage.createdAt),
            };
            setReceiveMessages(prev => [...prev, newd]);
          });
          
          return () => {
            if (stompClientRef.current) {
              subscription.unsubscribe();
            }
          };
        }
      }, delay);
    
      // Clean-up 함수에서 타임아웃 해제
      return () => clearTimeout(timeoutId);
    }, []);
  return (
    <div>
      <div className={isSidebarOpen ? `${styled_css.sideopen}` : `${styled_css.sideclose}`}>
          <div className={styled_css.scrollbar}>
          {receiveMessages.map((message)=>{
            const now = new Date()
            const date = message.createdAt
            var today;
            if (now.getFullYear()+''+now.getMonth()+''+now.getDate()=== date.getFullYear()+''+date.getMonth()+''+date.getDate()) {
              const hours = date.getHours().toString().padStart(2, '0');
              const minutes = date.getMinutes().toString().padStart(2, '0');
              today = `${hours} : ${minutes}`;              
            }
            else { 
              const year = date.getFullYear();
              const month = (date.getMonth() + 1).toString().padStart(2, '0');
              const day = date.getDate().toString().padStart(2, '0');
              const hours = date.getHours().toString().padStart(2, '0');
              const minutes = date.getMinutes().toString().padStart(2, '0');
              if (year===1970) {
                today=''
              }
              else if (year===now.getFullYear()) {
                today = `${month}/${day} ${hours}:${minutes}`;
              }
              else {
                today = `${year}/${month}/${day} ${hours}:${minutes}`;
              }
              
            }

            return (
            <p style={{margin:'5px'}}>{message.userName+' : '+message.message} <span style={{color:'gray', fontSize:'10px'}}>
                {today}</span></p>
            )})}
          </div>
          <div className={styled_css.inputbar}>
            <input type="text" value={messageInput} onChange={(e)=>setMessageInput(e.target.value)} onKeyDown={handlekeydown} 
            onFocus={()=>dispatch(setAllowMove(false))} onBlur={()=>dispatch(setAllowMove(true))}/>
            <button onClick={sendMessage}>전송</button>
          </div>
      </div>
  </div>
  );
};

export default MeetingChat;
