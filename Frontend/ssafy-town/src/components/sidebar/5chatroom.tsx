import React, { useState,useEffect } from 'react';
import chat_css from "./5chat.module.css";

import { Client, Message } from '@stomp/stompjs';

import { useDispatch, useSelector } from 'react-redux';
import { setAllowMove, setSidebar } from '../../store/actions';
import { AppState } from '../../store/state';
import axios from 'axios';

interface messageProps {
  userIdx:number,
  userName:string,
  messageIdx:number,
  message:string,
  created_at:string,
}

const Chatroom: React.FC = () => {
  const dispatch = useDispatch()
  const [messageInput, setMessageInput] = useState('');

  const stompClientRef = React.useRef<Client | null>(null);
  stompClientRef.current = useSelector((state: AppState) => state.stompClientRef)
  const [receiveMessages, setReceiveMessages] = useState<messageProps[]>([])
  
  const chatScrollRef = React.useRef<HTMLDivElement | null>(null); // Ref for chat_scroll div

  const isChatIdx = useSelector((state: AppState) => state.isChatIdx);
  const userIdx = localStorage.getItem('userIdx')

  const userToken = localStorage.getItem('userToken')
  useEffect(()=>{
    axios({
      method:'get',
      url:'https://i9b206.p.ssafy.io:9090/chat/load',
      data:{
        chatIdx : isChatIdx,
        nowFirstIdx : null,
      },
      headers : {
        Authorization: 'Bearer ' + userToken
      }})
    .then(res=>{
      setReceiveMessages([res.data,...receiveMessages])
      if (chatScrollRef.current && chatScrollRef.current.scrollHeight > chatScrollRef.current.clientHeight) {
        // Scroll chat_scroll to the bottom initially
        chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
      }
    })
    .catch(err=>console.log(err))
  })

  // 구독등록
  useEffect(() => {
    if (stompClientRef.current) {
      stompClientRef.current.subscribe(`/sub/chatRoom/1`, function(message: Message) {
        // const newMessage = message.body;
        if (chatScrollRef.current && chatScrollRef.current.scrollHeight > chatScrollRef.current.clientHeight && chatScrollRef.current.scrollTop === chatScrollRef.current.scrollHeight) {
          setReceiveMessages([...receiveMessages, {
            'userIdx':1,
            'userName':'김싸피',
            'messageIdx':1,
            'message':'내용',
            'created_at':'보낸시간',
          }])
          chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight
        }
        else {
          setReceiveMessages([...receiveMessages, {
            'userIdx':1,
            'userName':'김싸피',
            'messageIdx':1,
            'message':'내용',
            'created_at':'보낸시간',
          }])
        }
      })
      }

      return () => {
        if (stompClientRef.current) {
        stompClientRef.current.unsubscribe(`/sub/chatRoom/1`)}
    }
  }, [stompClientRef,receiveMessages]);


  // 끝까지 스크롤 시 추가로딩
  const addload = () => {
    const userToken = localStorage.getItem('userToken')
    axios({
      method:'get',
      url:'https://i9b206.p.ssafy.io:9090/chat/load',
      data:{
        chatIdx:isChatIdx,
        nowFirstIdx : receiveMessages[0].messageIdx
      },
      headers : {
        Authorization: 'Bearer ' + userToken
      }})
    .then(res=>{
      setReceiveMessages([res.data,...receiveMessages])
    })
    .catch(err=>console.log(err))
  }

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
    }
  }
  
  const sendMessage = (message: string) => {
    if (stompClientRef.current) {
    const data = {
        'sender': userIdx, // Set the sender's userId here
        'contents': message,
        };
    stompClientRef.current.publish({
        destination: '/pub/chat/send',
        body: JSON.stringify(data),
        });
      setMessageInput('');
    }
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    if (target.scrollHeight > target.clientHeight && target.scrollTop === 0) {
      // Load more messages when scrolling to the top
      addload();
    }
  };


  return (
    <div className="sidebar_modal">
    <div style={{width:'80%'}}>
      <div className={chat_css.chatstatus}>
        <p onClick={() =>dispatch(setSidebar('채팅목록'))}>back</p>
        <h3>OOO 채팅방</h3>
        <p onClick={()=>{}}>나가기</p>
      </div>
      <hr />
      </div>
      <div className={chat_css.chat_scroll} onScroll={handleScroll} style={{height:'80vh'}} ref={chatScrollRef}>
        {receiveMessages.map((message, index) => (
          <div key={index} style={{width:'80%', margin:'auto'}} >
            <strong>{message.userName} : </strong>
            {message.message}    {message.created_at}
          </div>
        ))}
      </div>
      <div style={{width:'80%'}}>
      <hr />
      <div>
        <input type="text" value={messageInput} onChange={(e)=>setMessageInput(e.target.value)} style={{width:'80%'}} onKeyDown={handlekeydown} 
        onFocus={()=>dispatch(setAllowMove(false))} onBlur={()=>dispatch(setAllowMove(true))}/>
        <button onClick={()=>sendMessage(messageInput)}>전송</button>
      </div>
    </div>
    </div>
  );
};

export default Chatroom;