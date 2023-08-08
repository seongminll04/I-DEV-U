import React,{useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// 회원정보 관련
import Login from './components/account/login';
import SignupForm from './components/account/signup';
import Findpassword from './components/account/findpass';
import KakaoCallback from './components/account/kakaologin';
import KakaoSignUp from './components/account/kakaosignup';

import MyRoom from './components/room/myroom';
import SogaeRoom from './components/room/sogaeroom';
import MeetingRoom from './components/room/meetingroom';
import LMeetingRoom from './components/room/Lmeetingroom';

import app_css from './App.module.css';

import { Client, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';


import { useDispatch } from 'react-redux';
import { setStomp } from './store/actions';


function App() {
  const dispatch=useDispatch()
  const stompClientRef = React.useRef<Client | null>(null);

  // 나중에 주소 싸그리 바꾸자.
  // var BACKEND_URL = process.env.REACT_APP_BACKEND_SERVER_URL;
  
  useEffect(() => { 
    const userToken = localStorage.getItem('userToken')
    const socket = new SockJS("https://i9b206.p.ssafy.io:9090/ws-stomp");

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
  }, [dispatch]);
  console.log('asdfsadf')
  return (
    <Router>
      <div className={app_css.App}>
        <Routes>
          {/* 로그인여부에 따른 login, home 이동  */}
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
