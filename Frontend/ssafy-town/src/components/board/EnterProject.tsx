import React from 'react';
import enter_css from './EnterProject.module.css';

import { useDispatch,useSelector } from 'react-redux';
import { setModal } from '../../store/actions';
import {AppState} from '../../store/state';
import axios from 'axios';

const EnterProject: React.FC = () => {
  const dispatch=useDispatch()
  const userToken = localStorage.getItem('userToken')
  const wantPJTId = useSelector((state: AppState) => state.wantPJTId);

  const enter = () => {
    const userIdxStr = localStorage.getItem('userIdx')
    var userIdx:number|null;
    if (userIdxStr) {userIdx=parseInt(userIdxStr,10)} else {userIdx=null}
    // console.log('참가신청 완료')
    // dispatch(setModal(null))
    axios({
      method:'post',
      url: 'https://i9b206.p.ssafy.io/project/video/propose',
      data:{ 'userIdx' : userIdx, 'projectIdx' : wantPJTId },
      headers : {
        Authorization: 'Bearer ' + userToken
      },
    })
    .then(res => {
        console.log(res)
        console.log('참가신청 완료')
        dispatch(setModal(null))
      }
    )
    .catch(err => {console.log(err)})
  }

  return (
    <div className={enter_css.modal_overlay} onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {dispatch(setModal(null))}}}>
        <div className={enter_css.modal}>
            <h1>OO 프로젝트</h1>
            <h2>참가신청 하시겠습니까?</h2>
            <button onClick={enter}>참가</button><button onClick={()=>dispatch(setModal(null))}>취소</button>
        </div>

  </div>
  );
};

export default EnterProject;
