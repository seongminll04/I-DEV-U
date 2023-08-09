// src/App.tsx
import React, { useEffect, useState } from "react";
import chat_css from "./5chat.module.css";
import { Client, Message } from '@stomp/stompjs';

import { useDispatch,useSelector } from 'react-redux';
import { setAllowMove, setSidebar, setChatIdx } from '../../store/actions';
import { AppState } from '../../store/state';

import axios from "axios";

  // interface chatroom {
  //   chatIdx:number,
  //   chatTitle:string,
  //   message :string,
  //   chatTime :string,
  // }
  interface chatroom {
    roomIdx:number,
    title:string,
    master :boolean,
    userCount :number,
  }
  const Chat: React.FC = () => {
    const dispatch = useDispatch()

    const stompClientRef = React.useRef<Client | null>(null);
    stompClientRef.current = useSelector((state: AppState) => state.stompClientRef)

    const [chatList, setChatList] = useState<chatroom[]>([])

    // 최초 ChatList 불러오기

    useEffect(()=>{
      const userIdxStr = localStorage.getItem('userIdx')
      const userIdx = userIdxStr ? parseInt(userIdxStr, 10):null
      const userToken = localStorage.getItem('userToken')
      axios({
        method:'get',
        url:`https://i9b206.p.ssafy.io:9090/chat/list/${userIdx}`,
        headers : {
          Authorization: 'Bearer ' + userToken
        },
      })
      .then(res=>{

        console.log(res.data)
        setChatList(res.data.data)
      })
      .catch(err=>console.log(err))
    },[])

    // ChatList로 구독 등록, 현재는 구독 반응시 chatList 다시 가져오기 ->큐형태로 진화하면 좋음
    useEffect(() => {
      const userIdxStr = localStorage.getItem('userIdx')
      const userIdx = userIdxStr ? parseInt(userIdxStr, 10):null
      const userToken = localStorage.getItem('userToken')
      if (stompClientRef.current) {
        stompClientRef.current.subscribe(`/sub/addChat/${userIdx}`, function(message: Message) {
          axios({
            method:'get',
            url:`https://i9b206.p.ssafy.io:9090/chat/list/${userIdx}`,
            headers : {Authorization: 'Bearer ' + userToken}})
          .then(res=>{ 
            console.log(res.data)
            setChatList(res.data.data)
          })
          .catch(err=>console.log(err))
        }); 
        for (const room of chatList) {
          stompClientRef.current.subscribe(`/sub/chatRoom/${room.roomIdx}`, function(message: Message) {
            axios({
              method:'get',
              url:'https://i9b206.p.ssafy.io:9090/chat/list',
              data:{
                userIdx:userIdx
              },
              headers : {
                Authorization: 'Bearer ' + userToken
              },
            })
            .then(res=>setChatList(res.data))
            .catch(err=>console.log(err))
        })}
  
        return () => {
          if (stompClientRef.current) {
            stompClientRef.current.unsubscribe(`/sub/addChat/${userIdx}`)
            for (const room of chatList) {
              stompClientRef.current.unsubscribe(`/sub/chatRoom/${room.roomIdx}`)}
        };
      }}
    }, [stompClientRef, chatList]);

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

    return (
      <div className="sidebar_modal">
        <div style={{width:'100%', display:'flex',flexDirection:'column', alignItems:'center'}}>
          <h1>채팅방목록</h1>
          <div className={chat_css.search}>
            <input type="text" placeholder='검색어를 입력해주세요' onKeyDown={handlekeydown}
            onFocus={()=>dispatch(setAllowMove(false))} onBlur={()=>dispatch(setAllowMove(true))}/>
            <button>검색</button>
          </div>
          <hr style={{width:'75%', color:'black'}}/>

          <div className={chat_css.scrollbox}>
            {chatList.map((room) => (
              <div>
                <div className={chat_css.chat_room} onClick={() => {dispatch(setSidebar('채팅방')); dispatch(setChatIdx(room.roomIdx))}}>
                  <img src="assets/default_profile.png" alt=""/>
                  <div className={chat_css.chat_roomdata}>
                    <div className={chat_css.roomdata} style={{marginBottom:'10px'}}>
                      <b>{room.title}</b>
                      {/* <span className={chat_css.chattime}>{room.chatTime}</span> */}
                    </div>
                    {/* <div className={chat_css.roomdata}>
                      <p className={chat_css.lastchat}>{room.message}</p>
                      <p className={chat_css.chatcount}>99+</p>
                    </div> */}
                  </div>
                </div>
                <hr />
              </div>
            ))} 
          </div>
        </div>
      </div>
    );
  };

  export default Chat;
