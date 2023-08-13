import React from 'react';
import { useDispatch } from 'react-redux';
import { setModal } from '../../store/actions';

const Setting: React.FC = () => {
  const dispatch = useDispatch()
  return (
    <div className='sidebar_modal'>
      <h1>Setting</h1>
      <br /><br /><br /><br />
      <hr />
      <h1>방 이동하기</h1>
      <p>로컬용</p>
      <button onClick={()=>{window.location.href = 'http://localhost:3000/home';}}>마이룸</button>
      <button onClick={()=>{window.location.href = 'http://localhost:3000/meeting';}}>회의룸</button>
      <button onClick={()=>{window.location.href = 'http://localhost:3000/love';}}>소개팅룸</button>
      <p>서버용</p>
      <button onClick={()=>{window.location.href = 'https://i9b206.p.ssafy.io/home';}}>마이룸</button>
      <button onClick={()=>{window.location.href = 'https://i9b206.p.ssafy.io/meeting';}}>회의룸</button>
      <button onClick={()=>{window.location.href = 'https://i9b206.p.ssafy.io/love';}}>소개팅룸</button>
    
      <hr />
      <button onClick={()=>dispatch(setModal('프로젝트가입알림'))}>프로젝트 가입알림</button>
    </div>
  );
};

export default Setting;
