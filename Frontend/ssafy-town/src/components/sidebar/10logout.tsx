import React, {useEffect} from 'react';
import logout_css from './10logout.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout:() => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onLogout }) => {
  useEffect(() => { 
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  
  
  return (
    <div className={logout_css.modal_overlay} onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {onClose()}}}>
        <div className={logout_css.logout_modal}>
        <h1>로그아웃 하시겠습니까?</h1>
            <div className={logout_css.button_icon}>
                <button className={logout_css.button} onClick={onLogout}>로그아웃</button>
                <button className={logout_css.button} onClick={onClose}>뒤로가기</button>
            </div>
        </div>
    </div>
  );
};

export default Modal;