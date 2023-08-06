import React from 'react';
import ssafytown_css from './ssafytown.module.css';

// 사이드바 리스트
import Sogae from '../sidebar/2sogae';
import Mate from '../sidebar/3mate';
import Project from '../sidebar/4project';
import Chat from '../sidebar/5chat';
import Chatroom from '../sidebar/5chatroom';
import Cam from '../sidebar/6cam';
import Follow from '../sidebar/7follow';
import MyPage from '../sidebar/8mypage';
import Setting from '../sidebar/9setting';

import { useSelector } from 'react-redux';
import { AppState } from '../../store/state';


const Navbar: React.FC = () => {
  const isSidebarOpen = useSelector((state: AppState) => state.isSidebarOpen);//사이드바 오픈여부
  return (
    <div className={ssafytown_css.navigation_bar}>
        { isSidebarOpen==='소개팅' ? <Sogae /> :
         isSidebarOpen==='동료' ? <Mate /> :
         isSidebarOpen==='프로젝트' ? <Project /> :
         isSidebarOpen==='채팅목록' ? <Chat /> :
         isSidebarOpen==='채팅방' ? <Chatroom /> :
         isSidebarOpen==='화상' ? <Cam /> :
         isSidebarOpen==='팔로우' ? <Follow /> :
         isSidebarOpen==='마이페이지' ? <MyPage /> :
         isSidebarOpen==='설정' ? <Setting /> : null
        }
    </div>
  );
}

export default Navbar;
