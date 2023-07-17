import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/user/login', {
      id: userId,
      pw: userPassword,
    });
  
      if (response.data.resmsg === '로그인 성공') {
        // 로그인 성공하면 /home으로 이동
        navigate('/home');
      } else {
        // 실패한 경우 오류 처리
        console.error('로그인 실패');
        alert('아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.')
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className="background">
      <div className="modal">
        <div className="logo"/>
        <input className="input" type="text" placeholder="아이디" value={userId} onChange={(e) => setUserId(e.target.value)} />
        <input className="input" type="password" placeholder="비밀번호" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
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
