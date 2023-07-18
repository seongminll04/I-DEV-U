import React from 'react';
import alert_css from './1alert.module.css';
import axios from 'axios';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}


const Modal: React.FC<ModalProps> = ({ isOpen, onClose}) => {
  
 
  if (!isOpen) return null;
  
  // 모달창이 열렸다면 공지사항 데이터 불러오기
  else {
    axios({
      method:'get',
      url:'http://localhost:8080/notice/?~~~~~',
    })
    .then(res => {
      console.log(res)
      // const alert_data=res.data 
    })
    .catch(err => {
      console.log(err)
    })
  }


  return (
    <div className={alert_css.modal_overlay}  onClick={(e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {onClose()}}}>
        <div className={alert_css.alert_modal}>
        <p className={alert_css.closebtn} onClick={onClose}>닫기</p>
        <h1>공지사항</h1>
        <hr/>
        <div>
            <p> <span>a</span> <span>b</span> <span>c</span></p>
            <p> <span>a</span> <span>b</span> <span>c</span></p>
        </div>
        </div>
    </div>
  );
};

export default Modal;