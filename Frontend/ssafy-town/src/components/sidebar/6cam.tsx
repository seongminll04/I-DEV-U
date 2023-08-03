import React,{ useState, useEffect } from 'react';

import cam_css from './6cam.module.css'
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { setAllowMove } from '../../store/actions';
import { AppState } from '../../store/state';

type ProjectDataType = {
  name: string; // 프로젝트 이름
  participants: string[]; // 참가자 이름 리스트
  sessionId: string; // 각 화상방의 세션 ID
};

const Cam: React.FC = () => {
  const dispatch = useDispatch()
  const loginToken = useSelector((state: AppState) => state.loginToken);// 모달창 오픈여부 (알림, 로그아웃)

  // const BACKEND_SERVER_URL = process.env.REACT_APP_BACKEND_SERVER_URL;
  const BACKEND_SERVER_URL = 'https://i9b206.p.ssafy.io';
  const [camList, setCamList] = useState<ProjectDataType[]>([]);


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
  // 유저의 화상방 데이터 가져오기
  useEffect(() => {
    axios.get(BACKEND_SERVER_URL + '/video/list',{
      headers : {
        Authorization:loginToken
      },
    })
      .then(res => {
        setCamList(res.data.list);
        console.log(res);
      })
      .catch(err => {
        console.log(err);
        setCamList([]);
      });
  });

  // 접속 반응 추가하기
  const EnterCam = (sessionId: string) => {

    axios.get(`${BACKEND_SERVER_URL}/video/enter`, {
        headers : {
          Authorization:loginToken
        },
        params: {
            sessionId: sessionId,
        }
    })
    .then(res => {
      const token = res.data.token;  // 백엔드에서 전달받은 토큰
      
      localStorage.setItem("OVToken", token);  // 토큰을 로컬 스토리지에 저장

      console.log(res);
      
      // meeting 페이지로 이동
      window.location.href = "https://i9b206.p.ssafy.io/large_meeting";
    })
    .catch(err => {
      console.log(err);
    });
  }

  
  
  return (
    <div className='sidebar_modal'>
      <h1>내 화상방</h1>
      <div className={cam_css.search}>
        <input type="text" placeholder='검색어를 입력해주세요' onKeyDown={handlekeydown}
            onFocus={()=>dispatch(setAllowMove(false))} onBlur={()=>dispatch(setAllowMove(true))}/>
        <button>검색</button>
      </div>
      <hr style={{width:'75%', color:'black'}}/>

      <div className={cam_css.scrollbox}>
        {camList.map((cam, index) => (
          <div key={index}>
            <div className={cam_css.profile}>
              <img src="assets/default_profile.png" alt="" />
              <div className={cam_css.profiledata}>
                <b>{cam.name}</b>
                <p style={{ color: 'gray' }}>
                  {cam.participants.slice(0, 3).join(', ')}
                  {cam.participants.length > 3 && '...'}
                </p>
              </div>
              <div>
                <button className={cam_css.profilebtn} onClick={() => EnterCam(cam.sessionId)}>접속</button>
                <button className={cam_css.profilebtn}>나가기</button>
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cam;