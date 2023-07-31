import React from 'react';
import follow_css from './7follow.module.css'

const Follow: React.FC = () => {
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