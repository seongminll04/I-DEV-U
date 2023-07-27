import React, {useEffect} from 'react';
import sogaeFilter_css from './sogaeFilter.module.css'
interface ModalProps {
  onClose: () => void;
}

const MateFilter: React.FC<ModalProps> = ({ onClose }) => {
  useEffect(() => { //esc키로 끄기
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className={sogaeFilter_css.modal_overlay} onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {onClose()}}}>
        <div className={sogaeFilter_css.logout_modal}>
        <h1>동료찾기 필터</h1>
            <div className={sogaeFilter_css.button_icon}>
                <button className={sogaeFilter_css.button} onClick={onClose}>적용</button>
                <button className={sogaeFilter_css.button} onClick={onClose}>취소</button>
            </div>
        </div>
    </div>
  );
};

export default MateFilter;