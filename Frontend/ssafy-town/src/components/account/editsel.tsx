import React from 'react';
import checkpass_css from './checkpass.module.css';

import { useDispatch } from 'react-redux';
import { setModal } from '../../store/actions';

const EditSel: React.FC = () => {

  const dispatch = useDispatch();

  function onClose() {
    dispatch(setModal(null));
  }
  
  return (
    <div>
      <div className={checkpass_css.withdraw_modal}>
        <div className={checkpass_css.two_btn}>
        <span></span>
          <span
            onClick={() => {
              onClose();
            }}
          >
            닫기
          </span>
        </div>
        <h1 style={{ marginBottom: '20px' }}>
          회원정보 수정
        </h1>
        <br />
        <br />
        <br />
        <div className={checkpass_css.btn}>
          <button onClick={()=>{dispatch(setModal('회원정보수정3'))}}>내 정보 수정</button>
          <button onClick={()=>{dispatch(setModal('비밀번호변경'))}}>비밀번호 변경</button>
        </div>
      <p className={checkpass_css.mypage_withdrawal} onClick={()=>{}}>회원탈퇴</p>
      </div>
    </div>
  );
};

export default EditSel;
