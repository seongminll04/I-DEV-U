import React from 'react';
import Detail_css from './DetailProject.module.css';

import { useDispatch } from 'react-redux';
import { setModal } from '../../store/actions';
// import axios from 'axios';

const DetailProject: React.FC = () => {
  const dispatch=useDispatch()
  return (
    <div className={Detail_css.modal_overlay} onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {dispatch(setModal(null))}}} >
      <div className={Detail_css.modal}>
        <p className={Detail_css.closebtn} onClick={() => {dispatch(setModal(null))}}>닫기</p>
        <h1>프로젝트 상세정보</h1>
        <h2>프로젝트1</h2>

        </div>  
    </div>
  );
};

export default DetailProject;
