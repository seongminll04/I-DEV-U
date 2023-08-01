import React from 'react';
import follow_css from './7follow.module.css'

import { useDispatch } from 'react-redux';
import { setAllowMove } from '../../store/actions';

const Follow: React.FC = () => {
  const dispatch = useDispatch()
  // input 방향키 살리기
  const handlekeydown = (event:React.KeyboardEvent<HTMLInputElement>) => {
    const inputElement = event.currentTarget
    const currentCursorPosition = inputElement.selectionStart || 0;
    if (event.key === 'ArrowLeft' && currentCursorPosition!==0) {
      inputElement.setSelectionRange(currentCursorPosition - 1, currentCursorPosition - 1);
    } else if (event.key === 'ArrowRight') {
      inputElement.setSelectionRange(currentCursorPosition + 1, currentCursorPosition + 1);
    } else if (event.key === ' '){
      inputElement.value = inputElement.value.slice(0,currentCursorPosition)+ ' ' +inputElement.value.slice(currentCursorPosition,)
      inputElement.setSelectionRange(currentCursorPosition+1 , currentCursorPosition+1);
    }
  }
  return (
    <div className='sidebar_modal'>
      <h1>내 친구목록</h1>
      <div className={follow_css.search}>
        <input type="text" placeholder='검색어를 입력해주세요' onKeyDown={handlekeydown}
          onFocus={()=>dispatch(setAllowMove(false))} onBlur={()=>dispatch(setAllowMove(true))}/>
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