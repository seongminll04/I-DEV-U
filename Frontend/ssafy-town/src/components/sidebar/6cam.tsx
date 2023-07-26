import React,{useEffect} from 'react';
import cam_css from './6cam.module.css'

interface Props {
  onModal: string|null;
  closeSidebar:()=>void;
  closeModal:()=>void;
}
const Cam: React.FC<Props> = ({onModal, closeSidebar, closeModal}) => {
  useEffect(() => { //esc키로 끄기
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (onModal!==null) {closeModal()} else {closeSidebar()}
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onModal,closeSidebar,closeModal]);

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
      </div>

    </div>
  );
};

export default Cam;
