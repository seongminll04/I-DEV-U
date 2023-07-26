import React,{useEffect} from 'react';
import follow_css from './7follow.module.css'

import { useSelector } from 'react-redux';
import { AppState } from '../../store/state';



interface Props {
  closeSidebar:()=>void;
  closeModal:()=>void;
}
const Follow: React.FC<Props> = ({closeSidebar, closeModal}) => {
  const isModalOpen = useSelector((state: AppState) => state.isModalOpen);// 모달창 오픈여부 (알림, 로그아웃)
  useEffect(() => { //esc키로 끄기
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isModalOpen!==null) {closeModal()} else {closeSidebar()}
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen,closeSidebar,closeModal]);

  return (
    <div className='sidebar_modal'>
      <h1>내 친구목록</h1>
      <div className={follow_css.search}>
        <input type="text" placeholder='검색어를 입력해주세요'/>
        <button>검색</button>
      </div>
      <hr style={{width:'75%', color:'black'}}/>

      <div className={follow_css.scrollbox}>
      <div className={follow_css.profile}>
        <img src="assets/default_profile.png" alt=""/>
        <div className={follow_css.profiledata}>
          <b>이름</b>
          <p>프로필 소개글</p>
        </div>
        <div>
          <button className={follow_css.profilebtn}>채팅</button>
          <button className={follow_css.profilebtn}>화상</button>
        </div>
      </div>
      <hr />



      <div className={follow_css.profile}>
        <img src="assets/default_profile.png" alt=""/>
        <div className={follow_css.profiledata}>
          <b>이름</b>
          <p>프로필 소개글</p>
        </div>
        <div>
          <button className={follow_css.profilebtn}>채팅</button>
          <button className={follow_css.profilebtn}>화상</button>
        </div>
      </div>
      <hr />


 
      <div className={follow_css.profile}>
        <img src="assets/default_profile.png" alt=""/>
        <div className={follow_css.profiledata}>
          <b>이름</b>
          <p>프로필 소개글</p>
        </div>
        <div>
          <button className={follow_css.profilebtn}>채팅</button>
          <button className={follow_css.profilebtn}>화상</button>
        </div>
      </div>
      <hr />
      <div className={follow_css.profile}>
        <img src="assets/default_profile.png" alt=""/>
        <div className={follow_css.profiledata}>
          <b>이름</b>
          <p>프로필 소개글</p>
        </div>
        <div>
          <button className={follow_css.profilebtn}>채팅</button>
          <button className={follow_css.profilebtn}>화상</button>
        </div>
      </div>
      <hr />

      <div className={follow_css.profile}>
        <img src="assets/default_profile.png" alt=""/>
        <div className={follow_css.profiledata}>
          <b>이름</b>
          <p>프로필 소개글</p>
        </div>
        <div>
          <button className={follow_css.profilebtn}>채팅</button>
          <button className={follow_css.profilebtn}>화상</button>
        </div>
      </div>
      <hr />
      <div className={follow_css.profile}>
        <img src="assets/default_profile.png" alt=""/>
        <div className={follow_css.profiledata}>
          <b>이름</b>
          <p>프로필 소개글</p>
        </div>
        <div>
          <button className={follow_css.profilebtn}>채팅</button>
          <button className={follow_css.profilebtn}>화상</button>
        </div>
      </div>
      <hr />
      <div className={follow_css.profile}>
        <img src="assets/default_profile.png" alt=""/>
        <div className={follow_css.profiledata}>
          <b>이름</b>
          <p>프로필 소개글</p>
        </div>
        <div>
          <button className={follow_css.profilebtn}>채팅</button>
          <button className={follow_css.profilebtn}>화상</button>
        </div>
      </div>
      <hr />
      <div className={follow_css.profile}>
        <img src="assets/default_profile.png" alt=""/>
        <div className={follow_css.profiledata}>
          <b>이름</b>
          <p>프로필 소개글</p>
        </div>
        <div>
          <button className={follow_css.profilebtn}>채팅</button>
          <button className={follow_css.profilebtn}>화상</button>
        </div>
      </div>
      <hr />
      </div>

    </div>
  );
};

export default Follow;