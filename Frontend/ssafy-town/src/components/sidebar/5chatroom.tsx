import React, { useEffect, useState } from 'react';
import chat_css from "./5chat.module.css";

import { Client, Message, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

import { useDispatch } from 'react-redux';
import { setAllowMove, setSidebar } from '../../store/actions';

const Chatroom: React.FC = () => {
  const dispatch = useDispatch()
  const [messageInput, setMessageInput] = useState('');
  const [receivedMessages, setReceivedMessages] = useState<string[]>([]);
  const stompClientRef = React.useRef<Client | null>(null);
  
  // 연결에 관한 것
  useEffect(() => {
    const socket = new SockJS("https://localhost:8080/chatting");
    stompClientRef.current = Stomp.over(socket);
    // 연결 시도
    stompClientRef.current.activate();

    return () => {
      // 컴포넌트 언마운트 시 연결 해제
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
    };
  }, [stompClientRef]);

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

  const onMessageReceived = (message: Message) => {
    const newMessage = message.body;
    setReceivedMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  useEffect(() => {
    // 구독 설정
    // const userIdx = localStorage.getItem('userIdx')
    if (stompClientRef.current) {
      stompClientRef.current.onConnect = (frame) => {
        console.log(frame)
        stompClientRef.current!.subscribe(`/topic/${8}`, onMessageReceived);
        // 등록을 해둿으니 여기에서 구독한것들은 다 들어온다!!!
      };
    }
  }, []);

  const sendMessage = (message: string) => {
    const userIdx = localStorage.getItem('userIdx')
    if (stompClientRef.current) {
    const data = {
        'sender': userIdx, // Set the sender's userId here
        'contents': message,
        };
    stompClientRef.current.publish({
        destination: '/app/chat/send',
        body: JSON.stringify(data),
        });
      setMessageInput('');
    }
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    if (target.scrollTop === 0) {
    // 원본 if (target.scrollTop === 0 && oldestMessageTimestamp !== null) {
      // 이전 메시지를 불러올 수 있도록 oldestMessageTimestamp를 이용합니다.
      // 이 부분에서 백엔드로 API 호출을 하거나, Socket.IO를 통해 처리할 수 있습니다.
      // 새롭게 불러온 메시지로 메시지 상태를 업데이트합니다.
  
      // 이전 메시지를 불러온 후, 가장 오래된 메시지의 타임스탬프를 업데이트합니다.
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
      <div onScroll={handleScroll} style={{height:'80vh'}}>
        {receivedMessages.map((message, index) => (
          <div key={index}>
            <strong>{message} 보낸 사람 : </strong>
            {message} 보낸내용
          </div>
        ))}
      </div>
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
