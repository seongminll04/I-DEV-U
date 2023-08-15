import React, { useState, useEffect } from 'react';
import follow_css from './7follow.module.css'
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { setAllowMove, setModal } from '../../store/actions';
import { AppState } from '../../store/state';
import EnterChatF from '../enter/enterchatF';
import EnterCamF from '../enter/entercamF';
import FollowDetail from '../detail/followDetail';

interface FollowUser {
  followIdx: number;
  userIdx: number;
  userName: string;
  userIntro: string;
  userNickName: string;
}

const Follow: React.FC = () => {
  const [myFollowList, setMyFollowList] = useState<FollowUser[]>([]);
  const dispatch = useDispatch()
  const [inputvalue, setinputvalue] = useState<string>('');
  const [requestidx, setrequestidx] = useState<number>(0);
  const [requestname, setrequestname] = useState<string>('');
  const isModalOpen = useSelector((state: AppState) => state.isModalOpen);//사이드바 오픈여부

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
        if (res.data.data) {
          setMyFollowList(res.data.data.data)
        }
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  const refresh = () => {
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
        if (res.data.data) {
          setMyFollowList(res.data.data.data)
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

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
        <input type="text" placeholder='검색어를 입력해주세요' onKeyDown={handlekeydown} value={inputvalue} onChange={(e) => setinputvalue(e.target.value)}
          onFocus={() => dispatch(setAllowMove(false))} onBlur={() => dispatch(setAllowMove(true))} />
      </div>
      <button className={follow_css.button} onClick={() => dispatch(setModal('팔로우찾기'))}>직접 추가</button>
      <hr style={{ width: '75%', color: 'black' }} />

      <div className={follow_css.scrollbox}>
        {myFollowList.map((follow : FollowUser, index: number) => {
          if (follow.userNickName.includes(inputvalue)) {
            return (
              <>
              <div className={follow_css.profile}>
                <img src="assets/default_profile.png" alt="" />
                <div className={follow_css.profiledata}>
                  <b>{follow.userNickName}</b>
                  <p>{follow.userIntro}</p>
                </div>
                <div>
                  <button className={follow_css.profilebtn} onClick={()=>{setrequestname(follow.userNickName);setrequestidx(follow.followIdx); dispatch(setModal('팔로우채팅'))}}>채팅</button>
                  <button className={follow_css.profilebtn} onClick={()=>{setrequestname(follow.userNickName);setrequestidx(follow.followIdx); dispatch(setModal('팔로우화상'))}}>화상</button>
                </div>
              </div>
              <hr />
              </>
            )
          }
          else {
            return (
              <div key={index}></div>
            )
          }
        })}
      </div>
      {isModalOpen === '팔로우채팅' ? <EnterChatF sendusername={requestname} senduserIdx={requestidx} />
        : isModalOpen === '팔로우화상' ? <EnterCamF sendusername={requestname} senduserIdx={requestidx} />
          : isModalOpen === '팔로우찾기' ? <FollowDetail refresh={refresh} />
            : <></>}
    </div>
  );
};

export default Follow;