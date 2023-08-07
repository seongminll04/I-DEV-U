import React from 'react';
import enter_css from './EnterProject.module.css';

import { useDispatch } from 'react-redux';
import { setModal } from '../../store/actions';
import axios from 'axios';

const EnterProject: React.FC = () => {
  const dispatch=useDispatch()

  const enter = () => {
    axios({
      method:'post',
      url: 'https://~~~~~~.~~~/'
      // data: {}
    })
    .then(res => {console.log(res)})
    .catch(err => {console.log(err)})
  }

  return (
    <div className={enter_css.modal_overlay} onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {dispatch(setModal(null))}}}>
        <div className={enter_css.modal}>
            <h1>OO 프로젝트</h1>
            <h2>참가신청 하시겠습니까?</h2>
            <button onClick={enter}>참가</button><button>취소</button>
        </div>

  </div>
  );
};

export default EnterProject;
