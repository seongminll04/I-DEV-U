import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Town from './components/ssafytown';
import SignupForm from './components/signup';
import Findpassword from './components/findpass';
import KakaoCallback from './components/kakao';
import Mypage from './components/mypage';
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
          <Route path="/Mypage" element={<Mypage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
