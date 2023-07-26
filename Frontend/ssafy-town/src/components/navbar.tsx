import React from 'react';
import ssafytown_css from './ssafytown.module.css';
// import { useNavigate } from 'react-router-dom';

// 사이드바 리스트
import Sogae from './sidebar/2sogae';
import Mate from './sidebar/3mate';
import Project from './sidebar/4project';
import Chat from './sidebar/5chat';
import Cam from './sidebar/6cam';
import Follow from './sidebar/7follow';
import MyPage from './sidebar/8mypage';
import Setting from './sidebar/9setting';

import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../store/state';
import { setModal,setSidebar } from '../store/actions';

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state: AppState) => state.isSidebarOpen);//사이드바 오픈여부

  return (
    <div className={ssafytown_css.navigation_bar}>
        { isSidebarOpen==='소개팅' ? <Sogae closeSidebar={()=>dispatch(setSidebar(null))} closeModal={()=>dispatch(setModal(null))} /> :
         isSidebarOpen==='동료' ? <Mate closeSidebar={()=>dispatch(setSidebar(null))} closeModal={()=>dispatch(setModal(null))} /> :
         isSidebarOpen==='프로젝트' ? <Project closeSidebar={()=>dispatch(setSidebar(null))} closeModal={()=>dispatch(setModal(null))} /> :
         isSidebarOpen==='채팅' ? <Chat closeSidebar={()=>dispatch(setSidebar(null))} closeModal={()=>dispatch(setModal(null))} /> :
         isSidebarOpen==='화상' ? <Cam closeSidebar={()=>dispatch(setSidebar(null))} closeModal={()=>dispatch(setModal(null))} /> :
         isSidebarOpen==='팔로우' ? <Follow closeSidebar={()=>dispatch(setSidebar(null))} closeModal={()=>dispatch(setModal(null))} /> :
         isSidebarOpen==='마이페이지' ? <MyPage closeSidebar={()=>dispatch(setSidebar(null))} closeModal={()=>dispatch(setModal(null))} /> :
         isSidebarOpen==='설정' ? <Setting closeSidebar={()=>dispatch(setSidebar(null))} closeModal={()=>dispatch(setModal(null))} /> : null
        }
    </div>
  );
}

export default Navbar;
