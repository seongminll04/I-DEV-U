import React from 'react';
import ssafytown_css from './ssafytown.module.css';

import Sidebar from './sidebar'
import Navbar from './navbar'

import Alert from './sidebar/1alert'
import Logout from './account/logout'
import MyRoom from './room/myroom';
import FirstQA from './survey/firstQA'

import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../store/state';
import { setModal } from '../store/actions';

const Town: React.FC = () => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state: AppState) => state.isSidebarOpen);//사이드바 오픈여부
  const isModalOpen = useSelector((state: AppState) => state.isModalOpen);// 모달창 오픈여부 (알림, 로그아웃)
  const FQA = () => {
    if (true) {
      dispatch(setModal('최초설문'))
    }
  }
  return (
    <div className={ssafytown_css.container}>
      <Sidebar/>

      {/* 사이드바 오픈 */}
      {isSidebarOpen ? <Navbar /> : null}
      
      {/* 모달창 오픈 */}
      { isModalOpen === '최초설문' ?
      <FirstQA onClose={()=>dispatch(setModal(null))} onConfirm={(value)=>{console.log(value)}} />
      : isModalOpen === '알림' ? 
      <Alert onClose={()=>dispatch(setModal(null))}/>
       : isModalOpen === '로그아웃' ? 
      <Logout onClose={()=>dispatch(setModal(null))} />
       : null }

      {/* Phaser 맵 */}
      <MyRoom/>
    </div>
  );
};

export default Town;
