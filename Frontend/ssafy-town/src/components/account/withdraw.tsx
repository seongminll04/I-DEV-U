import React from 'react';
import withdraw_css from './withdraw.module.css';

interface Props {
    onBack: () => void;
    onClose: () => void;
  }

// const Withdraw: React.FC<Props>  = ({}) => {
const Withdraw: React.FC<Props>  = ({onBack, onClose}) => {
  return (
    <div className={withdraw_css.withdraw_modal}>
    <div className={withdraw_css.two_btn}>
        <span onClick={()=> {onBack()}}>뒤로가기</span>
        <span onClick={()=>{onClose()}}>닫기</span>
        </div>
      <h1 style={{color:'red', fontSize:'40px', marginBottom:'20px'}}>회원탈퇴</h1>
      <br />
      <p>* 회원탈퇴 시 계정 복구가 불가능합니다.</p>
      <p>* 회원탈퇴를 원하시면 양식에 맞추어 입력해주세요. ex) 김싸피/회원탈퇴</p>
      <br />

      <input className={withdraw_css.input} type="text" />
      <br />
      <div className={withdraw_css.btn}>
        <button>탈퇴</button>
        <button onClick={onBack}>취소</button>
      </div>
    </div>
  );
};

export default Withdraw;
