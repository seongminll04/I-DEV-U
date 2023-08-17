import React, { useState, useEffect } from 'react';
import chat_css from "./5chat.module.css";

import { Client, Message } from '@stomp/stompjs';

import { useDispatch, useSelector } from 'react-redux';
import { setAllowMove, setSidebar } from '../../store/actions';
import { AppState } from '../../store/state';
import axiosInstance from '../../interceptors'; // axios 인스턴스 가져오기

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface messageProps {
  userIdx: number,
  roomIdx: number,
  nickname: string,
  idx: number,
  message: string,
  createdAt: Date,
}

const Chatroom: React.FC = () => {
  const dispatch = useDispatch()
  const [messageInput, setMessageInput] = useState('');
  const stompClientRef = React.useRef<Client | null>(null);
  stompClientRef.current = useSelector((state: AppState) => state.stompClientRef)
  const [firstSc, setFirstSc] = useState(true)

  const [sch, setSch] = useState<number>()
  const [receiveMessages, setReceiveMessages] = useState<messageProps[]>([])
  const chatScrollRef = React.useRef<HTMLDivElement | null>(null); // Ref for chat_scroll div
  const isChatIdx = useSelector((state: AppState) => state.isChatIdx);
  const isChatTitle = useSelector((state: AppState) => state.isChatTitle);
  const userIdxStr = localStorage.getItem('userIdx')
  var userIdx: number | null;
  if (userIdxStr) { userIdx = parseInt(userIdxStr, 10) } else { userIdx = null }

  useEffect(() => {
    const userToken = localStorage.getItem('userToken')
    axiosInstance({
      method: 'get',
      url: `https://i9b206.p.ssafy.io:9090/chat/rooms/${isChatIdx}/last`,
      headers: {
        Authorization: 'Bearer ' + userToken
      },
    })
      .then(res => {
        const lastidx = res.data.data.idx + 1
        axiosInstance({
          method: 'get',
          url: `https://i9b206.p.ssafy.io:9090/chat/rooms/${isChatIdx}/messages`,
          params: {
            messageIdx: lastidx,
            size: 30,
          },
          headers: {
            Authorization: 'Bearer ' + userToken
          }
        })
          .then(res => {
            const chats: messageProps[] = [];
            for (const data of res.data.data) {
              data.createdAt = new Date(data.createdAt)
              chats.push(data)
            }
            setReceiveMessages([...chats])
            setFirstSc(false)
          })
          .catch(err => console.log(err))

      })
      .catch(err => console.log(err))
  }, [isChatIdx])

  useEffect(() => {
    if (chatScrollRef.current) {
      if (firstSc === false) {
        chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
        setFirstSc(true)
      }
      else if (sch && sch !== -1) {
        chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight - chatScrollRef.current.clientHeight - sch
        setSch(-1)
      }
      else if ((chatScrollRef.current.scrollHeight - (chatScrollRef.current.scrollTop + chatScrollRef.current.clientHeight)) < 100) {
        chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
      }

    }
  }, [receiveMessages, firstSc, sch]);

  // 구독등록
  useEffect(() => {
    if (stompClientRef.current) {
      const subscription = stompClientRef.current.subscribe(`/sub/rooms/${isChatIdx}`, function (message: Message) {
        const newMessage = JSON.parse(message.body);
        const date = new Date(newMessage.createdAt)
        const newd = [{
          'userIdx': newMessage.userIdx,
          'nickname': newMessage.nickname,
          'roomIdx': newMessage.roomIdx,
          'idx': newMessage.messageIdx,
          'message': newMessage.message,
          'createdAt': date,
        }]
        setReceiveMessages(prevMessages => [...prevMessages, ...newd]);
      });
      return () => {
        if (stompClientRef.current) {
          subscription.unsubscribe();
        }
      };
    }
  }, [isChatIdx]);

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
    } else if (event.key === 'Enter') {
      sendMessage(messageInput)
    }
  }

  const sendMessage = (message: string) => {
    if (stompClientRef.current) {
      const now = new Date()
      const data = {
        userIdx: userIdx, // Set the sender's userId here
        roomIdx: isChatIdx,
        message: message,
        createdAt: now
      };
      // console.log(data)
      stompClientRef.current.publish({
        destination: '/pub/messages',
        body: JSON.stringify(data),
      });
      setMessageInput('');
    }
  };


  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {

    const target = event.currentTarget;
    if (target.scrollHeight > target.clientHeight && target.scrollTop === 0) {
      // Load more messages when scrolling to the top
      const userToken = localStorage.getItem('userToken')
      var aaa = target.scrollHeight - target.clientHeight
      axiosInstance({
        method: 'get',
        url: `https://i9b206.p.ssafy.io:9090/chat/rooms/${isChatIdx}/messages`,
        params: {
          messageIdx: receiveMessages[0].idx,
          size: 30
        },
        headers: {
          Authorization: 'Bearer ' + userToken
        }
      })
        .then(res => {
          const chats: messageProps[] = [];
          for (const data of res.data.data) {
            data.createdAt = new Date(data.createdAt)
            chats.push(data)
          }
          setReceiveMessages(prevMessages => [...chats, ...prevMessages]);
          setSch(aaa);
        })
        .catch(err => console.log(err))
    }
  };


  // 방 나가기 
  const roomout = () => {
    const userToken = localStorage.getItem('userToken')
    axiosInstance({
      method: 'DELETE',
      url: `https://i9b206.p.ssafy.io:9090/rooms/${isChatIdx}/users/?userIdx=${userIdx}`,
      headers: {
        Authorization: 'Bearer ' + userToken
      }
    })
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  return (
    <div className="sidebar_modal">
      <div style={{ width: '80%' }}>
        <div className={chat_css.chatstatus}>
          <ArrowBackIcon className={chat_css.chatback} onClick={() => dispatch(setSidebar('채팅목록'))} />
          <h3>{isChatTitle}</h3>
          <p className={chat_css.chatout} onClick={roomout}>나가기</p>
        </div>
        <hr />
      </div>
      <div className={chat_css.chat_scroll} onScroll={handleScroll} style={{ height: '80vh' }} ref={chatScrollRef}>
        {receiveMessages.sort((a, b) => a.idx - b.idx).map((message, index) => (
          <div className={chat_css.chat_container} key={index}>
            {message.userIdx === userIdx ?
              <><div style={{ alignSelf: 'flex-end', marginTop: '10px' }}>{message.nickname}</div>
                <div style={{ alignSelf: 'flex-end', marginTop: '5px', display: 'flex', justifyContent: 'flex-end' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-end', marginRight: '10px', fontSize: '12px' }}>
                    {message.createdAt.getHours() + ' : ' + message.createdAt.getMinutes()}
                  </div>
                  <div style={{ backgroundColor: 'rgba(109, 206, 245, 1)', padding: '10px', borderRadius: '1rem', maxWidth: '60%', textAlign: 'left' }}>
                    {message.message}
                  </div></div></>
              : <><div style={{ alignSelf: 'flex-start', marginTop: '10px' }}>{message.nickname}</div>
                <div style={{ alignSelf: 'flex-start', marginTop: '5px', display: 'flex' }}>
                  <div style={{ backgroundColor: '#EAEAEA', padding: '10px', borderRadius: '1rem', maxWidth: '60%', textAlign: 'left' }}>
                    {message.message}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', marginLeft: '10px', fontSize: '12px' }}>
                    {message.createdAt.getHours() + ' : ' + message.createdAt.getMinutes()}
                  </div>
                </div></>}
          </div>))}
      </div>

      <hr style={{ width: '80%' }} />
      <div style={{ width: '85%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <input className={chat_css.sendmsg} type="text" value={messageInput} onChange={(e) => setMessageInput(e.target.value)} style={{ width: '80%' }} onKeyDown={handlekeydown}
          onFocus={() => dispatch(setAllowMove(false))} onBlur={() => dispatch(setAllowMove(true))} />
        <img className={chat_css.sendbtn} src="assets/sendmsg.png" alt="" style={{ width: '30px', height: '30px' }} onClick={() => sendMessage(messageInput)} />
      </div>
    </div>
  );
};

export default Chatroom;