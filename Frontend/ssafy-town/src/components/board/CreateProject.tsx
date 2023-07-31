import React from 'react';
import Create_css from './CreateProject.module.css';

import { useDispatch } from 'react-redux';
import { setModal } from '../../store/actions';
import axios from 'axios';

const CreateProject: React.FC = () => {
  const dispatch=useDispatch()

  const Create = () => {
    axios({
      method:'post',
      url: 'https://~~~~~~.~~~/'
      // data: {}
    })
    .then(res => {console.log(res)})
    .catch(err => {console.log(err)})
  }

  return (
    <div className={Create_css.modal_overlay} onClick={(e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {dispatch(setModal(null))}}}>
      <div className={Create_css.modal}>
        <p className={Create_css.closebtn} onClick={() => {dispatch(setModal(null))}}>닫기</p>
        <h1>새 프로젝트 생성</h1>
        <hr />
        <div className={Create_css.info}>
          <div className={Create_css.input}>
            <label>
              <span>프</span><span>로</span><span>젝</span><span>트</span><span>명</span>
            </label>
            <p> : </p>
            <input type="text" />
          </div>
          <div className={Create_css.input}>
            <label><span>인</span><span>원</span><span>제</span><span>한</span></label>
            <p> : </p>
            <input type="number" min="1" max="12" step="1" defaultValue={4} style={{width:'10%'}}/>
          </div>
          <div className={Create_css.input}>
            <label><span>소</span><span>개</span></label>
            <p> : </p>
            <textarea name="" id=""></textarea>
          </div>
          <div className={Create_css.input}>
            <label><span>스</span><span>택</span></label>
            <p> : </p>
            <div>
              <input type="checkbox" name="" id="" />
            </div>
          </div>
          <div className={Create_css.input}>
            <label><span>언</span><span>어</span></label>
            <p> : </p>
            <div>
              <input type="checkbox" name="" id="" />
            </div>
          </div>
          <div className={Create_css.input}>
            <label><span>포</span><span>지</span><span>션</span></label>
            <p> : </p>
            <div>
              <input type="checkbox" name="" id="" />
            </div>
          </div>
          <button onClick={()=>Create()}>생성하기</button>
        </div>
      </div>
  </div>
  );
};

export default CreateProject;
