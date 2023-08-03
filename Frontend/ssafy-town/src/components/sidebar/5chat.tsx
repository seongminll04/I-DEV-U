  // src/App.tsx
  import React, { useState, useEffect } from "react";
  import { io, Socket } from "socket.io-client";
  import chat_css from "./5chat.module.css";

import { useDispatch } from 'react-redux';
import { setAllowMove } from '../../store/actions';

  interface ChatMessage {
    content: string;
    sender: string;
  }

  const Chat: React.FC = () => {
    const dispatch = useDispatch()

    const [socket, setSocket] = useState<Socket | null>(null);
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

    useEffect(() => {
      // Socket.IO 연결
      const newSocket = io("http://i9b206.p.ssafy.io:9090"); // 백엔드 서버의 URL로 변경해주세요.
      setSocket(newSocket);
    
      newSocket.on("connect", () => {
        console.log("Connected to Socket.IO");
      });
    
      // 채팅 메시지 수신
      newSocket.on("chat", (message: ChatMessage) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    
      // 채팅방 목록 수신
      newSocket.on("roomList", (rooms: string[]) => {
        setRoomList(rooms);
      });
      setRoomList(['김싸피','이싸피']);
    
      return () => {
        // 컴포넌트 언마운트 시 Socket.IO 연결 종료 및 이벤트 리스너 제거
        newSocket.disconnect();
        newSocket.off("chat"); // 채팅 이벤트 리스너 제거
      };
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setMessageInput(event.target.value);
    };

    const handleSendMessage = () => {
      if (!selectedRoom) {
        alert("채팅방을 선택해주세요.");
        return;
      }

      // 서버로 메시지 전송
      socket?.emit("sendMessage", {
        content: messageInput,
        sender: "User", // 사용자 이름 또는 식별자로 변경해주세요.
        room: selectedRoom,
      });
      setMessageInput("");
    };

    const handleJoinRoom = (roomName: string) => {
      setSelectedRoom(roomName);
      socket?.emit("joinRoom", roomName);
    
      // 새로운 방에 들어가면 메시지와 oldestMessageTimestamp를 초기화합니다.
      setMessages([]);
      setOldestMessageTimestamp(null);
    
      // 선택한 채팅방에 대한 최신 메시지를 불러옵니다.
      // 이 부분에서 백엔드로 API 호출을 하거나, Socket.IO를 통해 처리할 수 있습니다.
      // 메시지를 업데이트하고, 가장 오래된 메시지의 타임스탬프를 저장합니다.
    };

    const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
      const target = event.currentTarget;
      if (target.scrollTop === 0 && oldestMessageTimestamp !== null) {
        // 이전 메시지를 불러올 수 있도록 oldestMessageTimestamp를 이용합니다.
        // 이 부분에서 백엔드로 API 호출을 하거나, Socket.IO를 통해 처리할 수 있습니다.
        // 새롭게 불러온 메시지로 메시지 상태를 업데이트합니다.
    
        // 이전 메시지를 불러온 후, 가장 오래된 메시지의 타임스탬프를 업데이트합니다.
      }
    };

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
                <div className={chat_css.chat_room} key={room}  onClick={() => handleJoinRoom(room)}>
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
        <div style={{width:'80%'}}>
          <div className={chat_css.chatstatus}>
            <p onClick={() => {setSelectedRoom('')}}>back</p>
            <h3>{selectedRoom}</h3>
            <p>나가기</p>
          </div>
          <hr />
          <div onScroll={handleScroll} style={{height:'80vh'}}>
            {messages.map((message, index) => (
              <div key={index}>
                <strong>{message.sender}: </strong>
                {message.content}
              </div>
            ))}
          </div>
          <hr />
          <div>
            <input type="text" value={messageInput} onChange={handleInputChange} style={{width:'80%'}} onKeyDown={handlekeydown} 
            onFocus={()=>dispatch(setAllowMove(false))} onBlur={()=>dispatch(setAllowMove(true))}/>
            <button onClick={handleSendMessage}>전송</button>
          </div>
        </div>
        }
      </div>
    );
  };

  export default Chat;
