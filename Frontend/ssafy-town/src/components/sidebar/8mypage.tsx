import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import mypage_css from './8mypage.module.css';
import axios from 'axios';
import EditAcount from '../account/edit';
import CheckPass from '../account/checkpass'


import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../store/state';
import { setModal } from '../../store/actions';

const ToggleContainer = styled.div`
  position: relative;
  cursor: pointer;
  margin : 20px;
  > .toggle-container {

    width: 50px;
    height: 24px;
    border-radius: 30px;
    background-color: rgb(233,233,234);}
    //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
  > .toggle--checked {
    background-color: rgb(0,200,102);
    transition : 0.5s
  }

  > .toggle-circle {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: rgb(255,254,255);
    transition : 0.5s
    //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
  } >.toggle--checked {
    left: 27px;
    transition : 0.5s
  }
`;

const Desc = styled.div`
  //설명 부분의 CSS를 구현
  display: flex;
  align-items: center;
  text-align: center;
  margin: 20px;
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
  const [isOn, setisOn] = useState(false);
  const isModalOpen = useSelector((state: AppState) => state.isModalOpen);// 모달창 오픈여부 (알림, 로그아웃)
  useEffect(() => {
    // 프로필정보 로딩
    const userToken = localStorage.getItem('userToken')
    const userIdxStr = localStorage.getItem('userIdx')
    var userIdx: number | null;
    if (userIdxStr) { userIdx = parseInt(userIdxStr, 10) } else { userIdx = null }

    axios({
      method: 'get',
      url: `https://i9b206.p.ssafy.io:9090/user/detail/${userIdx}`,
      headers: {
        Authorization: 'Bearer ' + userToken
      },
    })
      .then(res => {
        console.log(res)
        setUser(res.data.data)
      })
      .catch(err => {
        console.log(err)
        console.log("유저 정보가 정확하지 않음")
      })
  }, [setUser])

  // toggle

  useEffect(() => {
    console.log(user.invite);
    if (user.invite === "true") {
      setisOn(true);
    } else {
      setisOn(false);
    }
  }, [setisOn, user])

  const toggleHandler = () => {
    // isOn의 상태를 변경하는 메소드를 구현
    const userToken = localStorage.getItem('userToken');
    const userIdx = localStorage.getItem('userIdx');
    // setisOn(!isOn);
    var user1 = user
    user1.invite = "true" ? "false" : "true"
    axios({
      method: 'put',
      url: 'https://i9b206.p.ssafy.io:9090/user/setting',
      headers: {
        Authorization: 'Bearer ' + userToken
      },
      data: {
        'userIdx': userIdx,
        'invite': user1.invite
      },
    })
      .then((res) => {
        console.log(res);
        console.log("초대설정 성공");
        setUser(user1)
        alert("초대설정 성공");
        if (user.invite === "true") {
          setisOn(true);
        } else {
          setisOn(false);
        }
      })

      .catch((err) => {
        console.log(err);
        console.log("초대설정 실패")
      });
  };

  // 소개팅 등록한 경우 등록철회
  const unregistMeeting = () => {
    console.log("이제 소개팅 안할래!");
    const userIdx = localStorage.getItem('userIdx');
    const userToken = localStorage.getItem('userToken');
    axios({
      method: 'delete',
      url: `https://i9b206.p.ssafy.io:9090/date/release/${userIdx}`,
      headers: {
        Authorization: 'Bearer ' + userToken
      }
    })
      .then(res => {
        console.log(res)
        alert("소개팅 등록해제 성공");
      })
      .catch(err => {
        console.log(err);
        alert("소개팅 등록해제 실패");
      })
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
            안녕하세요! {user.name} 님
          </div>
          <button className={mypage_css.button} onClick={() => dispatch(setModal('회원정보수정1'))}>회원정보 수정</button>
          <div className={mypage_css.mypage_togglebox}>
            <div className={mypage_css.mypage_toggle}>
              {isOn === false ?
                <Desc><div className={mypage_css.OFF}>초대 거부</div></Desc> :
                <Desc><div className={mypage_css.ON}>초대 수락</div></Desc>}
              <ToggleContainer
                // 클릭하면 토글이 켜진 상태(isOn)를 boolean 타입으로 변경하는 메소드가 실행
                onClick={toggleHandler}
              >
                {/* 아래에 div 엘리먼트 2개가 있다. 각각의 클래스를 'toggle-container', 'toggle-circle' 로 지정 */}
                {/* Toggle Switch가 ON인 상태일 경우에만 toggle--checked 클래스를 div 엘리먼트 2개에 모두 추가. 조건부 스타일링을 활용*/}
                <div className={`toggle-container ${isOn ? "toggle--checked" : null}`} />
                <div className={`toggle-circle ${isOn ? "toggle--checked" : null}`} />
              </ToggleContainer>
              {/* Desc 컴포넌트를 활용*/}
              {/* Toggle Switch가 ON인 상태일 경우에 Desc 컴포넌트 내부의 텍스트를 'Toggle Switch ON'으로, 그렇지 않은 경우 'Toggle Switch OFF'. 조건부 렌더링을 활용. */}
            </div>
          </div>
          <button className={mypage_css.button} onClick={unregistMeeting}>소개팅 등록 취소</button>
          <button className={mypage_css.button} onClick={() => dispatch(setModal('Re최초설문'))}>최초 설문 수정</button>
        </div>
        {isModalOpen === '회원정보수정1' ? <CheckPass /> : null}
        {isModalOpen === '회원정보수정2' ? <EditAcount user={user} /> : null}
      </div>
    </div>

  );
};

export default Mypage;
