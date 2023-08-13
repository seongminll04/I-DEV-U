import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import mypage_css from './8mypage.module.css';
import axios from 'axios';
import EditAcount from '../account/edit';

import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../store/state';
import { setModal } from '../../store/actions';
import ChangePass from '../account/changepass';

const ToggleContainer = styled.div`
  position: relative;
  cursor: pointer;
  margin : 0 10px;
  > .toggle-container {

    width: 40px;
    height: 20px;
    border-radius: 30px;
    background-color: rgb(233,233,234);}
    //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
  > .toggle--checked {
    background-color: rgb(109, 206, 245);
    transition : 0.5s
  }

  > .toggle-circle {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: rgb(255,254,255);
    transition : 0.5s
    //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
  } >.toggle--checked {
    left: 20px;
    transition : 0.5s
  }
`;

let userdata = {
  email: '',
  password: '',
  name: '',
  nickname: '',
  birth: '',
  gender: 0,
  intro: '', // 자기소개
  status: '', // active or not (회원탈퇴여부)
  grade: 0, // 1 : 관리자(운영자), 2 : 일반
  invite: ''
};

const Mypage: React.FC = () => {
  const dispatch = useDispatch();
  // const isSidebarOpen = useSelector((state: AppState) => state.isSidebarOpen);//사이드바 오픈여부
  const [user, setUser] = useState(userdata)
  const [sogae, setSogae] = useState(true)
  const isModalOpen = useSelector((state: AppState) => state.isModalOpen);// 모달창 오픈여부 (알림, 로그아웃)

  const [changeDate, setChangeData] = useState(true)

  const toggleHandler = () => {
    const userToken = localStorage.getItem('userToken')
    const userIdxStr = localStorage.getItem('userIdx')
    var userIdx: number | null;
    if (userIdxStr) { userIdx = parseInt(userIdxStr, 10) } else { userIdx = null }

    axios({
      method: 'put',
      url: `https://i9b206.p.ssafy.io:9090/user/setting`,
      data: {
        userIdx: userIdx,
        invite: user.invite === 'true' ? 'false' : 'true'
      },
      headers: {
        Authorization: 'Bearer ' + userToken
      },
    })
      .then(() => {
        axios({
          method: 'get',
          url: `https://i9b206.p.ssafy.io:9090/user/detail/${userIdx}`,
          headers: {
            Authorization: 'Bearer ' + userToken
          },
        })
          .then(res => {
            setUser(res.data.data)
          })
          .catch(() => {
            console.log("유저 정보가 정확하지 않음")
          })
      })
  };


  useEffect(() => {
    const userToken = localStorage.getItem('userToken')
    const userIdxStr = localStorage.getItem('userIdx')
    const userIdx = userIdxStr ? parseInt(userIdxStr, 10) : null
    axios({
      method: 'get',
      url: `https://i9b206.p.ssafy.io:9090/date/${userIdx}`,
      headers: {
        Authorization: 'Bearer ' + userToken
      },
    })
      .then(res => {
        console.log(res.data)
        if (res.data.remmag === "등록 했음") {
          setSogae(true)
        } else if (res.data.remmag === "등록 안함") {
          setSogae(false)
        }
      })
      .catch((err) => {
        console.log("소개팅 등록여부 조회 실패")
        console.log(err)
      })
  })
  useEffect(() => {
    const userToken = localStorage.getItem('userToken')
    const userIdxStr = localStorage.getItem('userIdx')
    const userIdx = userIdxStr ? parseInt(userIdxStr, 10) : null

    if (changeDate) {
      axios({
        method: 'get',
        url: `https://i9b206.p.ssafy.io:9090/user/detail/${userIdx}`,
        headers: {
          Authorization: 'Bearer ' + userToken
        },
      })
        .then(res => {
          setUser(res.data.data)
          setChangeData(false)
        })
        .catch(() => {
          console.log("유저 정보가 정확하지 않음")
        })
    }

  }, [changeDate])

  // 소개팅 등록 상태 전환
  const onregistMeeting = () => {
    const userIdx = localStorage.getItem('userIdx');
    const userToken = localStorage.getItem('userToken');

    if (sogae) {
      axios({
        method: 'delete',
        url: `https://i9b206.p.ssafy.io:9090/date/release/${userIdx}`,
        headers: {
          Authorization: 'Bearer ' + userToken
        }
      })
        .then(() => {
          setSogae(false)
        })
        .catch(() => {
          alert("소개팅 등록해제 실패");
        })
    }
    else {
      axios({
        method: 'post',
        url: `https://i9b206.p.ssafy.io:9090/date/register/${userIdx}`,
        headers: {
          Authorization: 'Bearer ' + userToken
        }
      })
        .then(() => {
          setSogae(true)
        })
        .catch(() => {
          alert("소개팅 등록 실패");
        })
    }
  }



  return (
    <div>
      <div className='sidebar_modal' id={mypage_css.modal}>
        <h1>내 프로필</h1>
        <div className={mypage_css.mypage_photo}>
          <img src="assets/default_profile.png" alt="" style={{ width: '100px', height: '100px' }} />
        </div>
        <div className={mypage_css.mypage_view}>
          <div className={mypage_css.mypage_welcome}>
            안녕하세요! {user.nickname} 님
          </div>
          <button className={mypage_css.button}
            onClick={() => {
              if (!user.email.includes('@')) {
                dispatch(setModal('회원정보수정2'))
                localStorage.setItem('kakao', '1')
              }
              else { dispatch(setModal('회원정보수정1')) }
            }}>회원정보 수정</button>

          <p className={mypage_css.mypage_toggle}>내 정보 검색 허용
            <ToggleContainer onClick={() => { toggleHandler() }}>
              <div className={`toggle-container ${user.invite === 'true' ? "toggle--checked" : null}`} />
              <div className={`${mypage_css.mypage_toggle} toggle-circle ${user.invite === 'true' ? "toggle--checked" : null}`}>
                {user.invite === 'true' ? 'On' : 'Off'}</div>
            </ToggleContainer>
          </p>

          <p className={mypage_css.mypage_toggle}>소개팅 등록
            <ToggleContainer onClick={() => { onregistMeeting() }}>
              <div className={`toggle-container ${sogae ? "toggle--checked" : null}`} />
              <div className={`${mypage_css.mypage_toggle} toggle-circle ${sogae ? "toggle--checked" : null}`}>
                {sogae ? 'On' : 'Off'}</div>
            </ToggleContainer>
          </p>

          <button className={mypage_css.button} onClick={() => dispatch(setModal('Re최초설문'))}>최초 설문 수정</button>
        </div>
        {isModalOpen === '회원정보수정3' ? <EditAcount user={user} change={() => setChangeData(true)} /> :
          isModalOpen === '비밀번호변경' ? <ChangePass user={user} /> : null}
      </div>
    </div>

  );
};

export default Mypage;
