  // src/App.tsx
  import React, { useState, useEffect } from "react";
  import { io, Socket } from "socket.io-client";
  import chat_css from "./5chat.module.css";
  interface ChatMessage {
    content: string;
    sender: string;
  }
  interface Props {
    onModal: string|null;
    closeSidebar:()=>void;
    closeModal:()=>void;
  }
  const Chat: React.FC<Props> = ({onModal, closeSidebar, closeModal}) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [messageInput, setMessageInput] = useState<string>("");
    const [roomList, setRoomList] = useState<string[]>([]);
    const [selectedRoom, setSelectedRoom] = useState<string>("");
    const [oldestMessageTimestamp, setOldestMessageTimestamp] = useState<number | null>(null);

    useEffect(() => { //esc키로 끄기
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          if (onModal!==null) {closeModal()} else {closeSidebar()}
        }
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [onModal,closeSidebar,closeModal]);

    useEffect(() => {
      // Socket.IO 연결
      const newSocket = io("http://localhost:8080"); // 백엔드 서버의 URL로 변경해주세요.
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
      setRoomList(['room1','room2']);
    
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
        <div>
          <h1>채팅방목록</h1>
          {roomList.map((room) => (
            <div key={room}>
              <button onClick={() => handleJoinRoom(room)}>{room}</button>
            </div>
          ))}
        </div>
        :
        <div>
          <p className={chat_css.backbtn} onClick={() => {setSelectedRoom('')}}>돌아가기</p>
          <p>{selectedRoom} 채팅방</p>
          <div onScroll={handleScroll}>
            {messages.map((message, index) => (
              <div key={index}>
                <strong>{message.sender}: </strong>
                {message.content}
              </div>
            ))}
          </div>
          <div>
            <input type="text" value={messageInput} onChange={handleInputChange} />
            <button onClick={handleSendMessage}>전송</button>
          </div>
        </div>
        }
      </div>
    );
  };

  export default Chat;
