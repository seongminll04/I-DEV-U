import React,{useEffect,useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// 회원정보 관련
import Login from './components/account/login';
import SignupForm from './components/account/signup';
import Findpassword from './components/account/findpass';
import KakaoCallback from './components/account/kakaologin';
import KakaoSignUp from './components/account/kakaosignup';

import MyRoom from './components/room/myroom';
import SogaeRoom from './components/room/sogaeroom';
import LMeetingRoom from './components/room/Lmeetingroom';

import app_css from './App.module.css';

import { Client, Message, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';


import { useDispatch, useSelector } from 'react-redux';
import { setModal, setStomp } from './store/actions';
import { AppState } from './store/state';
import NowAlert from './components/board/nowalert';

function App() {
  const dispatch=useDispatch()
  const stompClientRef = React.useRef<Client | null>(null);
  const [newmessage,setNewmessage] = useState<any|null>(null)
  const isModalOpen = useSelector((state: AppState) => state.isModalOpen);

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
      const userToken = localStorage.getItem('userToken')
      if (userToken && str.includes('연결 거부')) {
        localStorage.removeItem('userToken')
        localStorage.removeItem('userIdx')
        if (window.location.href!=='/login'){window.location.href='/login'}
      }
    }
    stompClientRef.current.reconnectDelay=1000 //자동재연결
    stompClientRef.current.heartbeatIncoming=4000
    stompClientRef.current.heartbeatOutgoing=4000
    
    stompClientRef.current.onConnect = (frame) => {
      if (stompClientRef.current) {
        const userIdxStr = localStorage.getItem('userIdx')
        const userIdx = userIdxStr ? parseInt(userIdxStr,10) : null

        // 채팅 신청에 대한 반응
        stompClientRef.current.subscribe(`/sub/user/${userIdx}`, function(message: Message) {
          const newMessage = JSON.parse(message.body);
          setNewmessage(newMessage)
        });
        // 프로젝트 가입요청에 대한 반응
        stompClientRef.current.subscribe(`/sub/request/project/${userIdx}`, function(message: Message) {
          const newMessage = JSON.parse(message.body);
          setNewmessage(newMessage)
        });
        return () => {
          if (stompClientRef.current) {
            stompClientRef.current.unsubscribe(`/sub/user/${userIdx}`)
            stompClientRef.current.unsubscribe(`/sub/request/project/${userIdx}`)
          }
        };
      }
    }
    // 연결 시도
    stompClientRef.current.activate();
    
    stompClientRef.current.onWebSocketError=function(err){
      console.log(err,',asdfsadf')
    }


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

  useEffect(()=>{
    if (isModalOpen==='실시간알림') {
      if (!newmessage) {
        dispatch(setModal(null))
      }
      return
    }

    if (window.location.href!=='https://i9b206.p.ssafy.io/home' || isModalOpen!==null) {
      setNewmessage(null)
    }
    else {
      if (newmessage) {dispatch(setModal('실시간알림'))}
    }
  },[dispatch,newmessage,isModalOpen])

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
          <Route path="/meeting" element={<LMeetingRoom />} />
          <Route path="/love" element={<SogaeRoom />} />
        </Routes>
        {isModalOpen==='실시간알림' ? <NowAlert message={newmessage} onMessage={()=>{setNewmessage(null); dispatch(setModal(null))}}/>:null}
      </div>
    </Router>
  );
}

export default App;
