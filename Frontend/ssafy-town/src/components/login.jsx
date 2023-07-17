import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Background, Modal, Logo, Input, Button, Check, Link, CheckContainer, Separator } from './login_styled';

export const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // 백엔드 연결 되면 로그인 관련 기능 추가
    navigate('/home');
  };

  return (
    <Background>
      <Modal>
        <Logo/>
        <Input type="text" placeholder="아이디" />
        <Input type="password" placeholder="비밀번호" />
        <CheckContainer>
          <Check id="saveid" />
          <label htmlFor="saveid">아이디 저장</label>
        </CheckContainer>
        <Button color='gray' onClick={handleLogin}>로그인</Button>
        <Separator />
        <Button color="yellow">카카오 로그인 위치</Button>
        <Button color="red">구글 로그인 위치</Button>
        <CheckContainer>
          <Link href="/signup">회원가입</Link>
          <Link href="/findpassword">비밀번호 찾기</Link>
        </CheckContainer>
      </Modal>
    </Background>
  );
};
