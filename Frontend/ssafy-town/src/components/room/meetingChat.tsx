import React, { useState, useEffect } from 'react';

import { useDispatch,useSelector } from 'react-redux';
import { AppState } from '../../store/state';
import { Client, Message } from '@stomp/stompjs';
import { setAllowMove } from '../../store/actions';

interface messageProps {
    userName: string, 
    message: string,
    createdAt: Date
  }
  
const MeetingChat: React.FC = () => {
  const dispatch=useDispatch()
  const [messageInput, setMessageInput] = useState('');
  const stompClientRef = React.useRef<Client | null>(null);
  const isSidebarOpen = useSelector((state: AppState) => state.isSidebarOpen);//사이드바 오픈여부
  const [receiveMessages, setReceiveMessages] = useState<messageProps[]>([])
  stompClientRef.current = useSelector((state: AppState) => state.stompClientRef)
  const OVsession = localStorage.getItem('OVsession')

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
    }}

  const sendMessage = () => {
    if (stompClientRef.current) {
      const now = new Date()
      const userName = localStorage.getItem('userNickname')
      const data = {
        userName: userName, 
        message: messageInput,
        createdAt: now
      };
      // console.log(data)
      stompClientRef.current.publish({
          destination: `/meeting/messages/${OVsession}`,
          body: JSON.stringify(data),
          });
        setMessageInput('');
    }};

    // 구독등록
    useEffect(() => {
        if (stompClientRef.current) {
        const subscription = stompClientRef.current.subscribe(`/meeting/messages/${OVsession}`, function(message: Message) {
            const newMessage = JSON.parse(message.body);
            const date = new Date(newMessage.createdAt)
            const newd={
            'userName':newMessage.userName,
            'message':newMessage.message,
            'createdAt':date,
            }
            setReceiveMessages(prev => [...prev, newd]);
        });
        return () => {
            if (stompClientRef.current) {
            subscription.unsubscribe();
            }
        };
        }
    }, [OVsession]);

  return (
    <div>
    {isSidebarOpen ? 
        <div style={{position:'absolute',top:'60%',left:'35%',background:'gray', width:'400px', height:'200px'}}>
            <div>
            {receiveMessages.map((message)=>(
                <p>{message.userName+' : '+message.message} </p>
            ))}
            </div>
            <input type="text" value={messageInput} onChange={(e)=>setMessageInput(e.target.value)} onKeyDown={handlekeydown} 
            onFocus={()=>dispatch(setAllowMove(false))} onBlur={()=>dispatch(setAllowMove(true))}/>
            <button onClick={sendMessage}>전송</button>
        </div>
        :      
        <div style={{position:'absolute',top:'60%',left:'10%',background:'gray', width:'400px', height:'200px'}}>
            <div>
            {receiveMessages.map((message)=>(
                <p>{message.userName+' : '+message.message} </p>
            ))}
            </div>
            <input type="text" value={messageInput} onChange={(e)=>setMessageInput(e.target.value)} onKeyDown={handlekeydown} 
            onFocus={()=>dispatch(setAllowMove(false))} onBlur={()=>dispatch(setAllowMove(true))}/>
            <button onClick={sendMessage}>전송</button>
        </div>}
  </div>
  );
};

export default MeetingChat;
