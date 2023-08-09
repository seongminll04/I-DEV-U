import React, { useEffect } from 'react';
import Detail_css from './DetailProject.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../../store/actions';
import { AppState } from '../../store/state';
import axios from 'axios';

const DetailProject: React.FC = () => {
  const dispatch=useDispatch()
  const wantPJTId = useSelector((state: AppState) => state.wantPJTId);
  const userToken = localStorage.getItem('userToken')

  useEffect(()=>{
    axios({
      method:'get',
      url:`https://i9b206.p.ssafy.io:9090/project/detail/${wantPJTId}`,
      headers: {
        Authorization: 'Bearer ' + userToken
      },
    })
    .then(res =>{
      console.log(res)
    })
    .catch(err => console.log(err))
  })

  return (
    <div className={Detail_css.modal_overlay} onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {dispatch(setModal(null));}}} >
      <div className={Detail_css.modal}>
        <p className={Detail_css.closebtn} onClick={() => {dispatch(setModal(null))}}>닫기</p>
        <h1>프로젝트 상세정보</h1>
        <h2>프로젝트1</h2>
        {wantPJTId}

        </div>  
    </div>
  );
};

export default DetailProject;
