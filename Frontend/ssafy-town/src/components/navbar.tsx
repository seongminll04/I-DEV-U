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


interface Props {
    onSidebar: string|null;
  }
  const Navbar: React.FC<Props> = ({ onSidebar }) => {
  return (
    <div className={ssafytown_css.navigation_bar}>
        { onSidebar==='소개팅' ? <Sogae /> :
         onSidebar==='동료' ? <Mate /> :
         onSidebar==='프로젝트' ? <Project /> :
         onSidebar==='채팅' ? <Chat /> :
         onSidebar==='화상' ? <Cam /> :
         onSidebar==='팔로우' ? <Follow /> :
         onSidebar==='마이페이지' ? <MyPage /> :
         onSidebar==='설정' ? <Setting /> : null
        }
    </div>
  );
}

export default Navbar;
