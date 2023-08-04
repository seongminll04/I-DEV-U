import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import login_css from './login.module.css';
import { useDispatch } from 'react-redux';
import { setNickname, setLoginToken } from '../../store/actions';

class ValidationError extends Error {
  constructor(message : string) {
    super(message);
    this.name = "ValidationError";
  }
}

const Login: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [userId, setUserId] = useState(localStorage.getItem('savedId') || ''); // 로컬스토리지에 아이디 저장
  const [userPassword, setUserPassword] = useState('');
  const [saveId, setSaveId] = useState(Boolean(localStorage.getItem('savedId'))); // 아이디 저장되어있으면 버튼 on상태

  useEffect(()=>{
    
    const userToken = localStorage.getItem('usertoken');
    if (userToken) {navigate('/home')}
  },[navigate])
  
  const handleLogin = async () => {
    axios({
      method:'post',
      url:'https://i9b206.p.ssafy.io:9090/user/login',
      data:{'email': userId, 'password': userPassword,}
    })
    .then(res => {
      console.log(res)
      // 로그인 시, 로컬 스토리지에 토큰 저장
      dispatch(setLoginToken(res.headers.authorization));
      // localStorage.setItem('usertoken',res.headers.authorization);
      // localStorage.setItem('saveid', res.data.userIdx);
      dispatch(setNickname(res.data.userIdx));
      // if (res.data.user.status === "D") {
      //   throw new ValidationError("탈퇴처리된 회원입니다!");
      // } 
      navigate('/home')
    })
    .catch(err => {
      console.log(err)
      if (err instanceof ValidationError) {
        alert(err.message);
      } else {
        alert('아이디 또는 비밀번호를 잘못 입력했습니다.\n입력하신 내용을 다시 확인해주세요.');
      }
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
        <button className={login_css.kakao_login} onClick={handleKakaoLogin}> 
        <img src="assets/kakao_logo.png" alt="" style={{width:'30px', height:'20px'}}/>
        <span>카카오 로그인</span><p></p></button>
        <div className={login_css.checkContainer2}>
          <p className={login_css.link} onClick={()=>navigate('/signup')}>회원가입</p>
          <p className={login_css.link} onClick={()=>navigate('/findpassword')}>비밀번호 찾기</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
