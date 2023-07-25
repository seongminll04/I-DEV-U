import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// 회원정보 관련
import Login from './components/account/login';
import SignupForm from './components/account/signup';
import Findpassword from './components/account/findpass';
import KakaoCallback from './components/account/kakaologin';

import Town from './components/ssafytown';
import app_css from './App.module.css';
function App() {
  return (
    <Router>
      <div className={app_css.App}>
        <Routes>
          {/* 로그인여부에 따른 login, home 이동  */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/findpassword" element={<Findpassword />} />
          <Route path="/home" element={<Town />} />
          <Route path="/kakao" element={<KakaoCallback />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
