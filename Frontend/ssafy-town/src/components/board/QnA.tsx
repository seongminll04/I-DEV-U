import React from 'react';
import QnA_css from './QnA.module.css';

interface Props {
  onClose : () => void;
}

const QnA: React.FC<Props> = ({onClose}) => {
  return (
    <div className={QnA_css.modal_overlay} onClick={(e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {onClose()}}}>
      <div className={QnA_css.QnA_modal}>
      <h1>QnA 게시판</h1>
          <div className={QnA_css.button_icon}>
              <button className={QnA_css.button}>글쓰기</button>
              <button className={QnA_css.button} onClick={onClose}>닫기</button>
          </div>
      </div>
  </div>
  );
};

export default QnA;
