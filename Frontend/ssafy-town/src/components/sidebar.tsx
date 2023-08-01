import React from 'react';
import ssafytown_css from './ssafytown.module.css';

import { useDispatch } from 'react-redux';
import { setModal,setSidebar } from '../store/actions';

const Sidebar: React.FC= () => {
  const dispatch = useDispatch();
  return (
        <div className={ssafytown_css.sidebar}>
          <img style={{marginTop:'20px'}} src={'assets/사이드바/알림.png'} alt={'알림 icon'} onClick={()=>dispatch(setModal('공지알림'))} />
          <hr />
          <img src={'assets/사이드바/소개팅.png'} alt={'소개팅 icon'} onClick={()=>{dispatch(setSidebar('소개팅'));}} />
          <img src={'assets/사이드바/동료.png'} alt={'동료 icon'} onClick={()=>dispatch(setSidebar('동료'))} />
          <img src={'assets/사이드바/프로젝트.png'} alt={'프로젝트 icon'} onClick={()=>dispatch(setSidebar('프로젝트'))} />
          <hr />
          <img src={'assets/사이드바/채팅.png'} alt={'채팅 icon'} onClick={()=>dispatch(setSidebar('채팅'))}/>
          <img src={'assets/사이드바/화상.png'} alt={'화상 icon'} onClick={()=>dispatch(setSidebar('화상'))}/>
          <img src={'assets/사이드바/팔로우.png'} alt={'팔로우 icon'} onClick={()=>dispatch(setSidebar('팔로우'))}/>
          <hr />
          <img src={'assets/사이드바/마이페이지.png'} alt={'마이페이지 icon'} onClick={()=>dispatch(setSidebar('마이페이지'))}/>
          <img src={'assets/사이드바/설정.png'} alt={'설정 icon'} onClick={()=>dispatch(setSidebar('설정'))}/>
          <img style={{marginBottom:'20px'}} src={'assets/사이드바/로그아웃.png'} alt={'로그아웃 icon'} onClick={()=>dispatch(setModal('로그아웃'))}/>
        </div>

  );
}

export default Sidebar;
