import React, { useState } from 'react';
import { Client } from '@stomp/stompjs';
import { useSelector } from 'react-redux';
import { AppState } from '../store/state';



const MyComponent: React.FC = () => {
  const [messageInput, setMessageInput] = useState('');
  const stompClientRef = React.useRef<Client | null>(null);
  const receivedMessages = useSelector((state: AppState) => state.receivedMessages);
  stompClientRef.current = useSelector((state: AppState) => state.stompClientRef)
  const userIdx = localStorage.getItem('userIdx')

  const sendMessage = (message: string) => {
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