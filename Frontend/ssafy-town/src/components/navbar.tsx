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
    onModal:string|null;
    closeSidebar:()=>void;
    closeModal:()=>void;
  }
const Navbar: React.FC<Props> = ({ onSidebar,onModal,closeSidebar,closeModal }) => {
  return (
    <div className={ssafytown_css.navigation_bar}>
        { onSidebar==='소개팅' ? <Sogae onModal={onModal} closeSidebar={()=>closeSidebar()} closeModal={()=>closeModal()} /> :
         onSidebar==='동료' ? <Mate onModal={onModal} closeSidebar={()=>closeSidebar()} closeModal={()=>closeModal()} /> :
         onSidebar==='프로젝트' ? <Project onModal={onModal} closeSidebar={()=>closeSidebar()} closeModal={()=>closeModal()} /> :
         onSidebar==='채팅' ? <Chat onModal={onModal} closeSidebar={()=>closeSidebar()} closeModal={()=>closeModal()} /> :
         onSidebar==='화상' ? <Cam onModal={onModal} closeSidebar={()=>closeSidebar()} closeModal={()=>closeModal()} /> :
         onSidebar==='팔로우' ? <Follow onModal={onModal} closeSidebar={()=>closeSidebar()} closeModal={()=>closeModal()} /> :
         onSidebar==='마이페이지' ? <MyPage onModal={onModal} closeSidebar={()=>closeSidebar()} closeModal={()=>closeModal()} /> :
         onSidebar==='설정' ? <Setting onModal={onModal} closeSidebar={()=>closeSidebar()} closeModal={()=>closeModal()} /> : null
        }
    </div>
  );
}

export default Navbar;
