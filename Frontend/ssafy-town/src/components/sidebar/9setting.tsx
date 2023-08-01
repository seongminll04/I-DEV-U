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
      style={{width:'50%',height:'50%', color:'red', backgroundColor:'blue'}}>QnA게시판 열기</button>
    </div>
  );
};

export default Setting;
