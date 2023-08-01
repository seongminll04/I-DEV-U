import React,{ useEffect } from 'react';
import ssafytown_css from './ssafytown.module.css';

import Sidebar from './sidebar'
import Navbar from './navbar'

import Alert from './sidebar/1alert'
import AllNotice from './notice/all_notice';
import AllAlert from './notice/all_alert';
import Logout from './account/logout'
import MyRoom from './room/myroom';
import FirstQA from './survey/firstQA';
import QnA from './board/QnA';

import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../store/state';
import { setAllowMove, setModal, setSidebar } from '../store/actions';

const Town: React.FC = () => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state: AppState) => state.isSidebarOpen);//사이드바 오픈여부
  const isModalOpen = useSelector((state: AppState) => state.isModalOpen);// 모달창 오픈여부 (알림, 로그아웃)
  
  // const FQA = () => {
  //   if (true) {
  //     dispatch(setModal('최초설문'))
  //   }
  // }

  useEffect(() => { //esc키로 사이드바, 모달창 끄기 : 전역설정임
    if (isModalOpen) {
      dispatch(setAllowMove(false))
    }
    else {dispatch(setAllowMove(true))}

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isModalOpen !== null) {dispatch(setModal(null))}
        else if (isSidebarOpen !== null) {dispatch(setSidebar(null))}
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
    
  }, [dispatch,isModalOpen,isSidebarOpen]);

  return (
    <div className={ssafytown_css.container}>
      <Sidebar/>

      {/* 사이드바 오픈 */}
      {isSidebarOpen ? <Navbar /> : null}
      
      {/* Phaser 맵 */}
      <MyRoom/>
       
      {/* 모달창 오픈 */}
      { isModalOpen === '최초설문' ? <FirstQA />
      : isModalOpen === '공지알림' ?  <Alert />
      : isModalOpen === '공지전체' ? <AllNotice />
      : isModalOpen === '알림전체' ? <AllAlert />
      : isModalOpen === '로그아웃' ? <Logout />
      : isModalOpen === 'QnA게시판' ? <QnA />
      : null }
    </div>
  );
};

export default Town;
