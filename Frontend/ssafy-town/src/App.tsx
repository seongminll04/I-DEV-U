import React,{useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// 회원정보 관련
import Login from './components/account/login';
import SignupForm from './components/account/signup';
import Findpassword from './components/account/findpass';
import KakaoCallback from './components/account/kakaologin';

import MyRoom from './components/room/myroom';
import SogaeRoom from './components/room/sogaeroom';
import MeetingRoom from './components/room/meetingroom';
import LMeetingRoom from './components/room/Lmeetingroom';

import app_css from './App.module.css';
import MyComponent from './components/TEST';
import KakaoSignUp from './components/account/kakaosignup';

import { Client, Stomp, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

import { useDispatch, useSelector } from 'react-redux';
import { setReceiveMessages, setStomp } from './store/actions';
import { AppState } from './store/state';
import axios from 'axios';

function App() {
  const dispatch=useDispatch()
  const isSidebarOpen = useSelector((state: AppState) => state.isSidebarOpen);//사이드바 오픈여부
  const isModalOpen = useSelector((state: AppState) => state.isModalOpen);// 모달창 오픈여부 (알림, 로그아웃)
  const receivedMessages = useSelector((state: AppState) => state.receivedMessages);// 모달창 오픈여부 (알림, 로그아웃)
  const stompClientRef = React.useRef<Client | null>(null);

  // 나중에 주소 싸그리 바꾸자.
  // var BACKEND_URL = process.env.REACT_APP_BACKEND_SERVER_URL;

  useEffect(() => { 
    const userToken = localStorage.getItem('userToken')
    const socket = new SockJS("http://localhost:8080/chatting");

    stompClientRef.current = Stomp.over(socket);
    stompClientRef.current.connectHeaders={
      Authorization: "Bearer " + userToken
    }
    stompClientRef.current.debug= function(str){
      console.log(str)
    }
    stompClientRef.current.reconnectDelay=5000 //자동재연결
    stompClientRef.current.heartbeatIncoming=4000
    stompClientRef.current.heartbeatOutgoing=4000

    stompClientRef.current.onConnect = function(frame) {
      if (stompClientRef.current) {

        // 소개팅, 화상, 프로젝트 가입 신청 시, 알림이 오는 곳 설정 
        if (window.location.href==='http://localhost:3000/home') {
          stompClientRef.current.subscribe(`/alert/:idx`, function(message: Message) {
            if (isModalOpen===null){
              const newMessage = message.body;
              dispatch(setReceiveMessages([...receivedMessages, newMessage]))
            }
          });
        }
        else {
          stompClientRef.current.unsubscribe(`/topic/1`);
        }

        // 채팅목록 리스트 코드
        if (isSidebarOpen==='채팅목록'){
          
          // 내 userIdx가 들어가있는 채팅방 Idx 리스트 가져오기
          axios({
            method:'get',
            url:'',
          })
          .then(res=>console.log(res))
          .catch(err=>console.log(err))

          stompClientRef.current.subscribe(`/topic/1`, function(message: Message) {
            const newMessage = message.body;
            dispatch(setReceiveMessages([...receivedMessages, newMessage]))
          });
        }
        else {
          stompClientRef.current.unsubscribe(`/topic/1`);
        }

        // 채팅방 연결시 채팅대화 코드
        if (isSidebarOpen==='채팅방'){
          stompClientRef.current.subscribe(`/topic/1`, function(message: Message) {
            const newMessage = message.body;
            dispatch(setReceiveMessages([...receivedMessages, newMessage]))
          });
        }
        else {
          stompClientRef.current.unsubscribe(`/topic/1`);
        }

        // 내 화상방 라이브 상태 코드


        // test 서버 연결 코드
        if (window.location.href==='http://localhost:3000/test') {
          stompClientRef.current.subscribe(`/topic/1`, function(message: Message) {
            const newMessage = message.body;
            dispatch(setReceiveMessages([...receivedMessages, newMessage]))
          });
        }
        else {
          stompClientRef.current.unsubscribe(`/topic/1`);
        }
      }
      console.log(window.location.href)
    }
    // 연결 시도
    stompClientRef.current.activate();

    if (stompClientRef.current){
      dispatch(setStomp(stompClientRef.current))
    }

    return () => {
      // 컴포넌트 언마운트 시 연결 해제
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
    };
  }, [stompClientRef,dispatch, isSidebarOpen, receivedMessages, isModalOpen]);
  
  return (
    <Router>
      <div className={app_css.App}>
        <Routes>
          {/* 로그인여부에 따른 login, home 이동  */}
          <Route path="/test" element={<MyComponent />} />
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/findpassword" element={<Findpassword />} />
          <Route path="/kakao" element={<KakaoCallback />} />
          <Route path="/kakaosignup" element={<KakaoSignUp />} />
          {/* 맵 이동 관련 */}
          <Route path="/home" element={<MyRoom />} />
          <Route path="/meeting" element={<MeetingRoom />} />
          <Route path="/large_meeting" element={<LMeetingRoom />} />
          <Route path="/love" element={<SogaeRoom />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
