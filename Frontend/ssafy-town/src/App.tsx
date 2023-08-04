import React from 'react';
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
import KakaoLoading from './components/account/kakaoloading';

function App() {
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
          <Route path="/kakaoloading" element={<KakaoLoading />} />
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
