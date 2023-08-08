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

import { Client, Stomp, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { setReceiveMessages, setStomp, setModal, setChatRoomList, setReceiveAlert } from './store/actions';
import { AppState } from './store/state';

function App() {
  const dispatch=useDispatch()
  const isSidebarOpen = useSelector((state: AppState) => state.isSidebarOpen);//사이드바 오픈여부
  const isModalOpen = useSelector((state: AppState) => state.isModalOpen);// 모달창 오픈여부 (알림, 로그아웃)
  const receivedMessages = useSelector((state: AppState) => state.receivedMessages);// 모달창 오픈여부 (알림, 로그아웃)
  const stompClientRef = React.useRef<Client | null>(null);
  const chatroomList = useSelector((state: AppState) => state.chatroomList);// 모달창 오픈여부 (알림, 로그아웃)
  // 나중에 주소 싸그리 바꾸자.
  // var BACKEND_URL = process.env.REACT_APP_BACKEND_SERVER_URL;
  
  useEffect(() => { 
    const userIdxStr = localStorage.getItem('userIdx')
    const userIdx = userIdxStr ? parseInt(userIdxStr, 10):null
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

    stompClientRef.current.onConnect = function(frame) {
      if (stompClientRef.current) {
        // 소개팅, 화상, 프로젝트 가입 신청 시, 알림이 오는 곳 설정 
        if (window.location.href==='https://i9b206.p.ssafy.io/home') {
          stompClientRef.current.subscribe(`/sub/alert/${userIdx}`, function(message: Message) {
            if (isModalOpen===null){
              const newMessage = message.body;
              // 받아야하는 정보 : 어떤 알림인지? - 프로젝트 가입신청, 소개팅 신청, 화상 or 채팅신청, 동료찾기 요청
              // 프로젝트면 : 어떤프로젝트, 어떤 사람인지
              // 소개팅이면 : 어떤 사람인지, 어떤 데이터가 일치하는지
              // 화상or채팅 : 어떤사람인지
              // {typeIdx:1 , }
              dispatch(setReceiveAlert([newMessage]))
              dispatch(setModal('프로젝트가입알림'))
            }
          });
        }
        else {
          stompClientRef.current.unsubscribe(`/topic/1`);
        }

        // 채팅목록 리스트 코드
        if (isSidebarOpen==='채팅목록'){
          // 내 userIdx가 들어가있는 채팅방 Idx 리스트 가져오기    
          for (const room of chatroomList) {
            stompClientRef.current.subscribe(`/sub/chatRoom/${room.chatIdx}`, function(message: Message) {
              axios({
                method:'get',
                url:'https://i9b206.p.ssafy.io:9090/chat/list',
                data:{userIdx:userIdx},
                headers : {Authorization: 'Bearer ' + userToken}})
              .then(res=>dispatch(setChatRoomList(res.data)))
              .catch(err=>console.log(err))
            });
          }
          // 그리고 새로운 방 생성에 대한 구독을 추가
          stompClientRef.current.subscribe(`/sub/addChat/${userIdx}`, function(message: Message) {
            axios({
              method:'get',
              url:'https://i9b206.p.ssafy.io:9090/chat/list',
              data:{userIdx:userIdx},
              headers : {Authorization: 'Bearer ' + userToken}})
            .then(res=>dispatch(setChatRoomList(res.data)))
            .catch(err=>console.log(err))
          }); 
        }
        else {
          for (const room of chatroomList) {
            stompClientRef.current.unsubscribe(`/sub/chatRoom/${room.chatIdx}`);}
          stompClientRef.current.unsubscribe(`/sub/addChat/${userIdx}`);}

        // 채팅방 연결시 채팅대화 코드
        if (isSidebarOpen==='채팅방'){
          stompClientRef.current.subscribe(`/sub/chatRoom/1`, function(message: Message) {
            const newMessage = message.body;
            dispatch(setReceiveMessages([...receivedMessages, newMessage]))
          });
        }
        else {
          stompClientRef.current.unsubscribe(`/sub/chatRoom/1`);
        }

        // 내 화상방 라이브 상태 코드

      }
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
  }, [stompClientRef,dispatch, isSidebarOpen, receivedMessages, isModalOpen, chatroomList]);
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
