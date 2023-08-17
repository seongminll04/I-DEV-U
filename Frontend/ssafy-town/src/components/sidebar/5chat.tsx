// src/App.tsx
import React, { useEffect, useState } from "react";
import chat_css from "./5chat.module.css";
import { Client, Message } from '@stomp/stompjs';

import { useDispatch, useSelector } from 'react-redux';
import { setAllowMove, setSidebar, setChatIdx, setChatTitle } from '../../store/actions';
import { AppState } from '../../store/state';

import axiosInstance from '../../interceptors'; // axios 인스턴스 가져오기

interface chatroom {
  roomIdx: number,
  nickname: string,
  title: string,
  message: string,
  createdAt: Date,
  master: boolean,
  userCount: number,
  chatuser:string|null;
  chatimg:string|null;
}

const Chat: React.FC = () => {
  const dispatch = useDispatch()

  const stompClientRef = React.useRef<Client | null>(null);
  stompClientRef.current = useSelector((state: AppState) => state.stompClientRef)
  const [chatList, setChatList] = useState<chatroom[]>([])
  const userIdxStr = localStorage.getItem('userIdx')
  const userIdx = userIdxStr ? parseInt(userIdxStr, 10) : null

  const [inputvalue, setInputValue] = useState('')

  // 최초 ChatList 불러오기

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    const rooms: chatroom[] = [];
    axiosInstance({
      method: 'get',
      url: `https://i9b206.p.ssafy.io:9090/chat/list/${userIdx}`,
      headers: {
        Authorization: 'Bearer ' + userToken,
      },
    })
      .then((res1) => {
        const roomPromises = [];
        for (const room of res1.data.data) {
          const roomPromise = axiosInstance({
            method: 'get',
            url: `https://i9b206.p.ssafy.io:9090/chat/rooms/${room.idx}/last`,
            headers: {
              Authorization: 'Bearer ' + userToken,
            },
          }).then((res) => {
            const date = new Date(res.data.data.createdAt)

            var chatuser=null
            var chatimg=null
            if (room.userList.length > 1){
              if (room.userList[0].idx === userIdx){chatuser=room.userList[1].nickname;chatimg=room.userList[1].storedFileName}
              else {chatuser=room.userList[0].nickname;chatimg=room.userList[0].storedFileName}
            }
            rooms.push({
              roomIdx: room.idx,
              nickname: res.data.data.nickname,
              title: room.title,
              message: res.data.data.message,
              createdAt: date,
              master: room.master,
              userCount: room.userCount,
              chatuser:chatuser,
              chatimg:chatimg
            });
          });
          roomPromises.push(roomPromise);
        }
        return Promise.all(roomPromises);
      })
      .then(() => {
        setChatList(rooms);
      })
      .catch((err) => console.log(err));
  }, [userIdx]);

  // ChatList로 구독 등록, 현재는 구독 반응시 chatList 다시 가져오기 ->큐형태로 진화하면 좋음
  useEffect(() => {
    const userIdxStr = localStorage.getItem('userIdx')
    const userIdx = userIdxStr ? parseInt(userIdxStr, 10) : null
    const userToken = localStorage.getItem('userToken')
    if (stompClientRef.current) {
      stompClientRef.current.subscribe(`/sub/addChat/${userIdx}`, function (message: Message) {
        const rooms: chatroom[] = [];
        axiosInstance({
          method: 'get',
          url: `https://i9b206.p.ssafy.io:9090/chat/list/${userIdx}`,
          headers: {
            Authorization: 'Bearer ' + userToken,
          },
        })
          .then((res) => {
            const roomPromises = [];
            for (const room of res.data.data) {
              const roomPromise = axiosInstance({
                method: 'get',
                url: `https://i9b206.p.ssafy.io:9090/chat/rooms/${room.idx}/last`,
                headers: {
                  Authorization: 'Bearer ' + userToken,
                },
              }).then((res) => {
                const date = new Date(res.data.data.createdAt)
                var chatuser=null
                var chatimg=null
                if (room.userList.length > 1){
                  if (room.userList[0].idx === userIdx){chatuser=room.userList[1].nickname;chatimg=room.userList[1].storedFileName}
                  else {chatuser=room.userList[0].nickname;chatimg=room.userList[0].storedFileName}
                }
                rooms.push({
                  roomIdx: room.idx,
                  nickname: res.data.data.nickname,
                  title: room.title,
                  message: res.data.data.message,
                  createdAt: date,
                  master: room.master,
                  userCount: room.userCount,
                  chatuser:chatuser,
                  chatimg:chatimg
                });
              });
              roomPromises.push(roomPromise);
            }
            return Promise.all(roomPromises);
          })
          .then(() => {
            setChatList(rooms);
          })
          .catch((err) => console.log(err));
      });

      for (const room of chatList) {
        stompClientRef.current.subscribe(`/sub/rooms/${room.roomIdx}`, function (message: Message) {
          axiosInstance({
            method: 'get',
            url: `https://i9b206.p.ssafy.io:9090/chat/rooms/${room.roomIdx}/last`,
            headers: {
              Authorization: 'Bearer ' + userToken
            },
          })
            .then(res => {
              const updatedChatList: chatroom[] = []
              for (const chat of chatList) {
                if (chat.roomIdx === room.roomIdx) {
                  const date = new Date(res.data.data.createdAt)
                  chat.message = res.data.data.message
                  chat.createdAt = date
                }
                updatedChatList.push(chat)
              }

              setChatList(updatedChatList)

            })
            .catch(err => console.log(err))
        })
      }

      return () => {
        if (stompClientRef.current) {
          stompClientRef.current.unsubscribe(`/sub/addChat/${userIdx}`)
          for (const room of chatList) {
            stompClientRef.current.unsubscribe(`/sub/chatRoom/${room.roomIdx}`)
          }
        };
      }
    }
  }, [stompClientRef, chatList]);

  // input 방향키 살리기
  const handlekeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const inputElement = event.currentTarget
    const currentCursorPosition = inputElement.selectionStart || 0;
    if (event.key === 'ArrowLeft' && currentCursorPosition !== 0) {
      inputElement.setSelectionRange(currentCursorPosition - 1, currentCursorPosition - 1);
    } else if (event.key === 'ArrowRight') {
      inputElement.setSelectionRange(currentCursorPosition + 1, currentCursorPosition + 1);
    } else if (event.key === ' ') {
      inputElement.value = inputElement.value.slice(0, currentCursorPosition) + ' ' + inputElement.value.slice(currentCursorPosition,)
      inputElement.setSelectionRange(currentCursorPosition + 1, currentCursorPosition + 1);
    }
  }

  return (
    <div className="sidebar_modal">
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1>채팅방목록</h1>
        <div className={chat_css.search}>
          <input type="text" placeholder='검색어를 입력해주세요' onKeyDown={handlekeydown}
            onFocus={() => dispatch(setAllowMove(false))} onBlur={() => dispatch(setAllowMove(true))}
            value={inputvalue} onChange={(e) => { setInputValue(e.target.value) }} />
        </div>
        <hr style={{ width: '75%', color: 'black' }} />

        <div className={chat_css.scrollbox}>
          {chatList.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).map((room) => {
            const now = new Date()
            const date = room.createdAt
            var today;
            var datee;

            if (now.getFullYear() + '' + now.getMonth() + '' + now.getDate() === date.getFullYear() + '' + date.getMonth() + '' + date.getDate()) {
              const hours = room.createdAt.getHours().toString().padStart(2, '0');
              const minutes = room.createdAt.getMinutes().toString().padStart(2, '0');
              if (room.createdAt.getHours() < 12) {
                today = `${hours}:${minutes} AM`;
              }
              else {
                today = `${hours}:${minutes} PM`;
              }
            }
            else {
              const year = room.createdAt.getFullYear();
              const month = (room.createdAt.getMonth() + 1).toString().padStart(2, '0');
              const day = room.createdAt.getDate().toString().padStart(2, '0');
              const hours = room.createdAt.getHours().toString().padStart(2, '0');
              const minutes = room.createdAt.getMinutes().toString().padStart(2, '0');
              if (year === 1970) {
                today = ''
              }
              else if (year === now.getFullYear()) {
                if (room.createdAt.getHours() < 12) {
                  datee=`${month}/${day}`
                  today = `${hours}:${minutes} AM`;
                }
                else {
                  datee=`${month}/${day}`
                  today = `${hours}:${minutes} PM`;
                }

              }
              else {
                if (room.createdAt.getHours() < 12) {
                  datee=`${year}/${month}/${day}`
                  today = `${hours}:${minutes} AM`;
                }
                else {
                  datee=`${year}/${month}/${day}`
                  today = `${hours}:${minutes} PM`;
                }
  
              }
            }

            if (!`${room.chatuser}의 채팅방`.includes(inputvalue)) {
              return (<div>

              </div>)
            }
            return (
              <div>
                <div className={chat_css.chat_room} onClick={() => { dispatch(setSidebar('채팅방')); dispatch(setChatTitle(room.chatuser+'의 채팅방')); dispatch(setChatIdx(room.roomIdx)) }}>
                  <img
                    src={room.chatimg ? room.chatimg : "assets/default_profile.png"}
                    alt=""
                    style={{ borderRadius: "50%" }}
                  />
                  <div className={chat_css.chat_roomdata}>
                    <div className={chat_css.roomdata} style={{ marginBottom: '10px' }}>
                      <b>{room.chatuser ? room.chatuser+'의 채팅방 ': ' '}<span style={{ fontSize: '10px', color: 'gray' }}>{room.userCount}</span></b>

                      <div>
                        {/* <span className={chat_css.chattime}>마지막 채팅시간</span> */}
                        <span className={chat_css.chattime}></span>
                        <br />
                      </div>

                    </div>
                    <div className={chat_css.roomdata}>
                      <p className={chat_css.lastchat}>{room.message}</p>
                      <div className={chat_css.chattime} style={{ display: 'grid'}}>
                        <span>{datee}</span>
                        <span>{today}</span>
                      </div>  
                      {/* <span className={chat_css.chattime}>{today}</span> */}
                      {/* <p className={chat_css.chatcount}></p> */}
                    </div>
                  </div>
                </div>
                <hr />
              </div>)
          })}
        </div>
      </div>
    </div>
  );
};

export default Chat;
