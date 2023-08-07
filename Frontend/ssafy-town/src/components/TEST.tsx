import React, { useEffect, useState } from 'react';
import { Client, Message, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const MyComponent: React.FC = () => {
  const [messageInput, setMessageInput] = useState('');
  const [receivedMessages, setReceivedMessages] = useState<string[]>([]);
  const stompClientRef = React.useRef<Client | null>(null);
  
  useEffect(() => { 
    const userToken = localStorage.getItem('userToken')
    const socket = new SockJS("https://i9b206.p.ssafy.io:9090/chatting");
    stompClientRef.current = Stomp.over(socket);
    stompClientRef.current.connectHeaders={
      Authorization: "Bearer " + userToken
    }
    // 연결 시도
    stompClientRef.current.activate();

    return () => {
      // 컴포넌트 언마운트 시 연결 해제
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
    };
  }, [stompClientRef]);

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
        stompClientRef.current!.subscribe(`/topic/1`, onMessageReceived);
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

  return (
    <div>
      <h1>STOMP Client Example</h1>
      <div>
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button onClick={() => sendMessage(messageInput)}>Send</button>
      </div>
      <div>
        <h2>Received Messages</h2>
        <ul>
          {receivedMessages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyComponent;