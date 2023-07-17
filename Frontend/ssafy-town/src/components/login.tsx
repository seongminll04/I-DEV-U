import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const handleLogin = async () => {
    axios({
      method:'post',
      url:'http://localhost:8080/user/login',
      data:{'id': userId, 'pw': userPassword,}
    })
    .then(res => {
      console.log(res)
      navigate('/home')
    })
    .catch(err => {
      console.log(err)
      alert('아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.')
    })
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  }

  const handleKakaoLogin = () => {
    const CLIENT_ID = `${process.env.REACT_APP_REST_API_KEY}`;
    const REDIRECT_URI = `${process.env.REACT_APP_REDIRECT_URL}`;
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`
    window.location.href = kakaoURL;
  };
  

  return (
    <div className="background">
      <div className="modal">
        <div className="logo"/>
        <input className="input" type="text" placeholder="아이디" value={userId} onChange={(e) => setUserId(e.target.value)} onKeyDown={handleKeyDown} />
        <input className="input" type="password" placeholder="비밀번호" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} onKeyDown={handleKeyDown} />
        <div className="checkContainer">
          <input className="check" id="saveid" type="checkbox" />
          <label htmlFor="saveid">아이디 저장</label>
        </div>
        <button className="enter-login" onClick={handleLogin}>로그인</button>
        <hr className="separator"/>
        <button className="kakao-login" onClick={handleKakaoLogin}></button>
        <div className="checkContainer">
          <a className="link" href="/signup">회원가입</a>
          <a className="link" href="/findpassword">비밀번호 찾기</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
