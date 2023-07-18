import React from 'react';
import logout_css from './10logout.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout:() => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onLogout }) => {
  if (!isOpen) return null;

  return (
    <div className={logout_css.modal_overlay}>
        <div className={logout_css.logout_modal}>
        <div className={logout_css.logout_modal_content}>
            <h1>로그아웃 하시겠습니까?</h1>
            <button onClick={onLogout}>로그아웃</button>
            <button onClick={onClose}>뒤로가기</button>
        </div>
        </div>
    </div>
  );
};

export default Modal;