import React from 'react';
import { useDispatch } from 'react-redux';
import { setModal, setSelectMap } from '../../store/actions';

const Setting: React.FC = () => {
  const dispatch = useDispatch()
  return (
    <div className='sidebar_modal'>
      <h1>Setting</h1>
      <br /><br /><br /><br />
      <button onClick={()=>dispatch(setModal('QnA게시판'))}
      style={{width:'50%',height:'50%', color:'red', backgroundColor:'blue'}}>QnA게시판 열기</button>
      <button onClick={()=>dispatch(setSelectMap('B'))}>B로 바꾸기</button>
    </div>
  );
};

export default Setting;
