import React from 'react';
import { useDispatch } from 'react-redux';
import { setModal } from '../../store/actions';

const Setting: React.FC = () => {
  const dispatch = useDispatch()
  return (
    <div className='sidebar_modal'>
      <h1>Setting</h1>
      <br /><br /><br /><br />
      <button onClick={()=>dispatch(setModal('QnA게시판'))}
      style={{width:'50%',height:'30%', color:'red', backgroundColor:'blue'}}>QnA게시판 열기</button>

      <hr />
      <h1>방 이동하기</h1>
      <button onClick={()=>{window.location.href = 'http://localhost:3000/home';}}>마이룸</button>
      <button onClick={()=>{window.location.href = 'http://localhost:3000/meeting';}}>회의룸</button>
      <button onClick={()=>{window.location.href = 'http://localhost:3000/love';}}>소개팅룸</button>
    </div>
  );
};

export default Setting;
