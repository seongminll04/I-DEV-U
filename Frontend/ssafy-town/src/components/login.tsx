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

  return (
    <div className="background">
      <div className="modal">
        <div className="logo"/>
        <input className="input" type="text" placeholder="아이디" value={userId} onChange={(e) => setUserId(e.target.value)} />
        <input className="input" type="password" placeholder="비밀번호" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} 
        onKeyDown={(event => {if (event.key==='Enter') {handleLogin()}})} />
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
