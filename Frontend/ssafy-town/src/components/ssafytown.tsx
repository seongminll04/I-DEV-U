import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ssafytown_css from './ssafytown.module.css';


import Sidebar from './sidebar'
import Navbar from './navbar'

import Alert from './sidebar/1alert'
import Logout from './account/logout'
import MyRoom from './room/myroom';

const Town: React.FC = () => {
  const navigate = useNavigate(); //페이지 이동 navigate
  const [isSidebarOpen, setSidebarOpen] = useState<string | null>(null); //사이드바 오픈여부
  const [isModalOpen, setModalOpen] = useState<string | null>(null); // 모달창 오픈여부 (알림, 로그아웃)

  return (
    <div className={ssafytown_css.container}>
      <Sidebar onSidebar={(value:string|null)=>{if (isSidebarOpen===value) {setSidebarOpen(null)} else {setSidebarOpen(value)}}}
      onModal={(value:string|null)=>{setModalOpen(value)}} />

      {/* 사이드바 오픈 */}
      {isSidebarOpen ? <Navbar onSidebar={isSidebarOpen} onModal={isModalOpen} closeSidebar={()=>setSidebarOpen(null)} closeModal={()=>setModalOpen(null)} /> : null}
      
      {/* 모달창 오픈 */}
      {isModalOpen === '알림' ? 
      <Alert onClose={()=>setModalOpen(null)}/>
       : isModalOpen === '로그아웃' ? 
      <Logout onClose={()=>setModalOpen(null)} onLogout={()=>{setModalOpen(null); navigate('/login')}} />
       : null }

      {/* Phaser 맵 */}
      <MyRoom isSidebarOpen={isSidebarOpen}/>
    </div>
  );
};

export default Town;
