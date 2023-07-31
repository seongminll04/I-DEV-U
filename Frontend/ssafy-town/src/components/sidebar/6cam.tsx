import React from 'react';
import cam_css from './6cam.module.css'

const Cam: React.FC = () => {
  return (
    <div className='sidebar_modal'>
      <h1>내 화상방</h1>
      <div className={cam_css.search}>
        <input type="text" placeholder='검색어를 입력해주세요'/>
        <button>검색</button>
      </div>
      <hr style={{width:'75%', color:'black'}}/>

      <div className={cam_css.scrollbox}>
      <div className={cam_css.profile}>
        <img src="assets/default_profile.png" alt=""/>
        <div className={cam_css.profiledata}>
          <b>프로젝트 이름</b>
          <p>프로젝트 소개글</p>
        </div>
        <div>
          <button className={cam_css.profilebtn}>접속</button>
          <button className={cam_css.profilebtn}>삭제</button>
        </div>
      </div>
      <hr />



      <div className={cam_css.profile}>
        <img src="assets/default_profile.png" alt=""/>
        <div className={cam_css.profiledata}>
          <b>프로젝트 이름</b>
          <p>프로젝트 소개글</p>
        </div>
        <div>
          <button className={cam_css.profilebtn}>접속</button>
          <button className={cam_css.profilebtn}>삭제</button>
        </div>
      </div>
      <hr />


 
      <div className={cam_css.profile}>
        <img src="assets/default_profile.png" alt=""/>
        <div className={cam_css.profiledata}>
          <b>프로젝트 이름</b>
          <p>프로젝트 소개글</p>
        </div>
        <div>
          <button className={cam_css.profilebtn}>접속</button>
          <button className={cam_css.profilebtn}>삭제</button>
        </div>
      </div>
      <hr />
      <div className={cam_css.profile}>
        <img src="assets/default_profile.png" alt=""/>
        <div className={cam_css.profiledata}>
          <b>프로젝트 이름</b>
          <p>프로젝트 소개글</p>
        </div>
        <div>
          <button className={cam_css.profilebtn}>접속</button>
          <button className={cam_css.profilebtn}>삭제</button>
        </div>
      </div>
      <hr />

      <div className={cam_css.profile}>
        <img src="assets/default_profile.png" alt=""/>
        <div className={cam_css.profiledata}>
          <b>프로젝트 이름</b>
          <p>프로젝트 소개글</p>
        </div>
        <div>
          <button className={cam_css.profilebtn}>접속</button>
          <button className={cam_css.profilebtn}>삭제</button>
        </div>
      </div>
      <hr />
      <div className={cam_css.profile}>
        <img src="assets/default_profile.png" alt=""/>
        <div className={cam_css.profiledata}>
          <b>프로젝트 이름</b>
          <p>프로젝트 소개글</p>
        </div>
        <div>
          <button className={cam_css.profilebtn}>접속</button>
          <button className={cam_css.profilebtn}>삭제</button>
        </div>
      </div>
      <hr />
      <div className={cam_css.profile}>
        <img src="assets/default_profile.png" alt=""/>
        <div className={cam_css.profiledata}>
          <b>프로젝트 이름</b>
          <p>프로젝트 소개글</p>
        </div>
        <div>
          <button className={cam_css.profilebtn}>접속</button>
          <button className={cam_css.profilebtn}>삭제</button>
        </div>
      </div>
      <hr />
      <div className={cam_css.profile}>
        <img src="assets/default_profile.png" alt=""/>
        <div className={cam_css.profiledata}>
          <b>프로젝트 이름</b>
          <p>프로젝트 소개글</p>
        </div>
        <div>
          <button className={cam_css.profilebtn}>접속</button>
          <button className={cam_css.profilebtn}>삭제</button>
        </div>
      </div>
      <hr />
      <p>-더 업슴-</p>
      </div>
    </div>
  );
};

export default Cam;
