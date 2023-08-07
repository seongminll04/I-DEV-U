import React from 'react';
import Create_css from './CreateQnA.module.css';

import { useDispatch } from 'react-redux';
import { setModal } from '../../store/actions';
// import axios from 'axios';

interface Props {
  onback : () => void;
}

const DetailQnA: React.FC<Props> = ({onback}) => {
  const dispatch=useDispatch()
  return (
      <div className={Create_css.modal}>
        <p className={Create_css.closebtn} onClick={() => {dispatch(setModal(null))}}>닫기</p>
        <p className={Create_css.backbtn} onClick={onback}>돌아가기</p>
        <h1>Q n A 게시글</h1>
        <h2>내용 : ~~~~~~~~</h2>

      </div>
  );
};

export default DetailQnA;
