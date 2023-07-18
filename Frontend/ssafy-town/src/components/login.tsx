import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import login_css from './login.module.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(localStorage.getItem('savedId') || ''); // 로컬스토리지에 아이디 저장
  const [userPassword, setUserPassword] = useState('');
  const [saveId, setSaveId] = useState(false); // 아이디 저장 버튼 off상태

  const handleLogin = async () => {
    axios({
      method:'post',
      url:'http://localhost:8080/user/login',
      data:{'email': userId, 'password': userPassword,}
    })
    .then(res => {
      console.log(res)
      if (saveId) { // 아이디 저장 누르면 on 상태
        localStorage.setItem('savedId', userId);
      } else { // 꺼놓으면 로컬에서 삭제하자
        localStorage.removeItem('savedId');
      }
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
    <div className={login_css.background}>
      <div className={login_css.modal}>
        <h1 className={login_css.logo}>I DEV U</h1>
        <input className={login_css.input} type="text" placeholder="아이디" value={userId} onChange={(e) => setUserId(e.target.value)} onKeyDown={handleKeyDown} />
        <input className={login_css.input} type="password" placeholder="비밀번호" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} onKeyDown={handleKeyDown} />
        <div className={login_css.checkContainer1}>
          <input className={login_css.check} id="saveid" type="checkbox" checked={saveId} onChange={(e) => setSaveId(e.target.checked)} />
          <label htmlFor="saveid">아이디 저장</label>
        </div>
        <button className={login_css.enter_login} onClick={handleLogin}>로그인</button>
        <hr className={login_css.separator}/>
        <button className={login_css.kakao_login} onClick={handleKakaoLogin}></button>
        <div className={login_css.checkContainer2}>
          <a className={login_css.link} href="/signup">회원가입</a>
          <a className={login_css.link} href="/findpassword">비밀번호 찾기</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
