import React from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // 백엔드
    navigate('/home');
  };

  return (
    <div className="background">
      <div className="modal">
        <img className="logo" alt="Logo" />
        <input className="input" type="text" placeholder="아이디" />
        <input className="input" type="password" placeholder="비밀번호" />
        <div className="checkContainer">
          <input className="check" id="saveid" type="checkbox" />
          <label htmlFor="saveid">아이디 저장</label>
        </div>
        <button className="enter-login" onClick={handleLogin}>로그인</button>
        <hr className="separator" />
        <button className="kakao-login">카카오 로그인 위치</button>
        <button className="google-login">구글 로그인 위치</button>
        <div className="checkContainer">
          <a className="link" href="/signup">회원가입</a>
          <a className="link" href="/findpassword">비밀번호 찾기</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
