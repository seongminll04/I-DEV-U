// src/App.tsx
import React, { useState, useEffect } from "react";
import chat_css from "./5chat.module.css";
import { Client, Message, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useDispatch } from 'react-redux';
import { setAllowMove } from '../../store/actions';

  interface ChatMessage {
    content: string;
    sender: string;
  }

  const Chat: React.FC = () => {
    const dispatch = useDispatch()

    const stompClientRef = React.useRef<Client | null>(null);
    const socket = new SockJS("http://localhost:8080/chatting");

    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [messageInput, setMessageInput] = useState<string>("");
    const [roomList, setRoomList] = useState<string[]>([]);
    const [selectedRoom, setSelectedRoom] = useState<string>("");
    const [oldestMessageTimestamp, setOldestMessageTimestamp] = useState<number | null>(null);

      // input 방향키 살리기
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
    // 연결에 관한 것
    useEffect(() => {
      stompClientRef.current = Stomp.over(socket);
      // 연결 시도
      stompClientRef.current.activate();

      return () => {
        // 컴포넌트 언마운트 시 연결 해제
        if (stompClientRef.current) {
          stompClientRef.current.deactivate();
        }
      };
    }, [stompClientRef,socket]);


    return (
      <div className="sidebar_modal">
        {!selectedRoom ? 
        <div style={{width:'100%', display:'flex',flexDirection:'column', alignItems:'center'}}>
          <h1>채팅방목록</h1>
          <div className={chat_css.search}>
            <input type="text" placeholder='검색어를 입력해주세요' onKeyDown={handlekeydown}
            onFocus={()=>dispatch(setAllowMove(false))} onBlur={()=>dispatch(setAllowMove(true))}/>
            <button>검색</button>
          </div>
          <hr style={{width:'75%', color:'black'}}/>

          <div className={chat_css.scrollbox}>
            {roomList.map((room) => (
              <div>
                <div className={chat_css.chat_room} key={room}  onClick={() => {}}>
                  <img src="assets/default_profile.png" alt=""/>
                  <div className={chat_css.chat_roomdata}>
                    <div className={chat_css.roomdata} style={{marginBottom:'10px'}}>
                      <b>{room}</b>
                      <span className={chat_css.chattime}>07/25 12:25 PM</span>
                    </div>
                    <div className={chat_css.roomdata}>
                      <p className={chat_css.lastchat}>마지막 채팅 메시지 입니다. 입니다. 입니다. 입니다. 입니다. 입니다.</p>
                      <p className={chat_css.chatcount}>99+</p>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            ))} 
          </div>
        </div>
        :
        // <div style={{width:'80%'}}>
        //   <div className={chat_css.chatstatus}>
        //     <p onClick={() => {setSelectedRoom('')}}>back</p>
        //     <h3>{selectedRoom}</h3>
        //     <p>나가기</p>
        //   </div>
        //   <hr />
        //   <div onScroll={handleScroll} style={{height:'80vh'}}>
        //     {messages.map((message, index) => (
        //       <div key={index}>
        //         <strong>{message.sender}: </strong>
        //         {message.content}
        //       </div>
        //     ))}
        //   </div>
        //   <hr />
        //   <div>
        //     <input type="text" value={messageInput} onChange={handleInputChange} style={{width:'80%'}} onKeyDown={handlekeydown} 
        //     onFocus={()=>dispatch(setAllowMove(false))} onBlur={()=>dispatch(setAllowMove(true))}/>
        //     <button onClick={handleSendMessage}>전송</button>
        //   </div>
        // </div>
        null
        }
      </div>
    );
  };

  export default Chat;
