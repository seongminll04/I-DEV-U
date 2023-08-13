import React, { useState, useEffect } from 'react';
import follow_css from './7follow.module.css'
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { setAllowMove } from '../../store/actions';

interface FollowUser {
  userIdx: number;
  userName: string;
  userIntro: string;
}

const Follow: React.FC = () => {
  const [myFollowList, setMyFollowList] = useState<FollowUser[]>([]);
  const dispatch = useDispatch()
  const [inputvalue, setinputvalue] = useState<string>('');
  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    const userIdxStr = localStorage.getItem('userIdx');
    const userIdx = userIdxStr ? parseInt(userIdxStr, 10) : null

    axios({
      method: 'get',
      url: `https://i9b206.p.ssafy.io:9090/user/getFollowList/${userIdx}`,
      headers: {
        Authorization: 'Bearer ' + userToken
      },
    })
      .then(res => {
        if (res.data.data){
          console.log(res.data.data.data)
          setMyFollowList(res.data.data.data)
        }
      })
      .catch(err => {
        console.log(err);
      })
  },[])

  // input 방향키 살리기
  const handlekeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const inputElement = event.currentTarget
    const currentCursorPosition = inputElement.selectionStart || 0;
    if (event.key === 'ArrowLeft' && currentCursorPosition !== 0) {
      inputElement.setSelectionRange(currentCursorPosition - 1, currentCursorPosition - 1);
    } else if (event.key === 'ArrowRight') {
      inputElement.setSelectionRange(currentCursorPosition + 1, currentCursorPosition + 1);
    } else if (event.key === ' ') {
      inputElement.value = inputElement.value.slice(0, currentCursorPosition) + ' ' + inputElement.value.slice(currentCursorPosition,)
      inputElement.setSelectionRange(currentCursorPosition + 1, currentCursorPosition + 1);
    }
  }

  return (
    <div className='sidebar_modal'>
      <h1>내 팔로우 목록</h1>
      <div className={follow_css.search}>
        <input type="text" placeholder='검색어를 입력해주세요' onKeyDown={handlekeydown} value={inputvalue} onChange={(e)=>setinputvalue(e.target.value)}
          onFocus={() => dispatch(setAllowMove(false))} onBlur={() => dispatch(setAllowMove(true))} />
        {/* <button>검색</button> */}
      </div>
      <hr style={{ width: '75%', color: 'black' }} />

      <div className={follow_css.scrollbox}>
        {myFollowList.map((follow : FollowUser, index: number) => {
          if (follow.userName.includes(inputvalue)) {
            return (
              <>
              <div className={follow_css.profile}>
                <img src="assets/default_profile.png" alt="" />
                <div className={follow_css.profiledata}>
                  <b>{follow.userName}</b>
                  <p>{follow.userIntro}</p>
                </div>
                <div>
                  <button className={follow_css.profilebtn} onClick={()=>{}}>채팅</button>
                  <button className={follow_css.profilebtn}>화상</button>
                </div>
              </div>
              <hr />
              </>
            )
          }
          else {
            return (
              <div></div>
            )
          }
        })}
      </div>
    </div>
  );
};

export default Follow;