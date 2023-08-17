import React,{ useState, useEffect } from 'react';

import cam_css from './6cam.module.css'
import axiosInstance from '../../interceptors'; // axios 인스턴스 가져오기

import { useDispatch } from 'react-redux';
import { setAllowMove } from '../../store/actions';


type ProjectDataType = {
  idx:number;
  title:string;
  nowNum:number;
  ovSession:string;
  modify:boolean;
  totalNumber:number;
  // name: string; // 프로젝트 이름
  // participants: string[]; // 참가자 이름 리스트
  // sessionId: string; // 각 화상방의 세션 ID
};

const Cam: React.FC = () => {
  const dispatch = useDispatch()
  // const BACKEND_SERVER_URL = process.env.REACT_APP_BACKEND_SERVER_URL;
  const BACKEND_SERVER_URL = 'https://i9b206.p.ssafy.io:9090';
  const [camList, setCamList] = useState<ProjectDataType[]>([]);
  const [inputvalue, setinputvalue] = useState<string>('');


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
    const userIdxStr = localStorage.getItem('userIdx')
    const userIdx = userIdxStr ? parseInt(userIdxStr,10): null
    const userToken = localStorage.getItem('userToken')
    axiosInstance({
      method:'get',
      url:BACKEND_SERVER_URL + `/video/list/${userIdx}`,
      headers : {
        Authorization: 'Bearer ' + userToken
      },
    }).then(res => {
      console.log(res)
        setCamList(res.data.list);
      })
      .catch(err => {
        console.log(err);
      });
  },[BACKEND_SERVER_URL]); //BACKEND_SERVER_URL는 환경변수라서 차피 안바뀌는데 에러나와서 그냥 넣어둠

  // 접속 반응
  const EnterCam = (sessionId: string) => {
    localStorage.setItem("OVsession", sessionId);  // 토큰을 로컬 스토리지에 저장
    window.location.href = "https://i9b206.p.ssafy.io/meeting";
  }
  
  return (
    <div className='sidebar_modal'>
      <h1>내 화상방</h1>
      <div className={cam_css.search}>
        <input type="text" placeholder='검색어를 입력해주세요' onKeyDown={handlekeydown} value={inputvalue} onChange={(e)=>setinputvalue(e.target.value)}
            onFocus={()=>dispatch(setAllowMove(false))} onBlur={()=>dispatch(setAllowMove(true))}/>
      </div>
      <hr style={{width:'75%', color:'black'}}/>

      <div className={cam_css.scrollbox}>
        {camList.filter(c => c.title.includes(inputvalue)).map((cam, index) => (
          <div key={index}>
            <div className={cam_css.profile}>
              <img src="assets/default_profile.png" alt="" />
              <div className={cam_css.profiledata}>
                <b>{cam.title}</b>
                <p style={{ color: 'gray' }}>
                  {/* { cam.name } */}
                  {/* {cam.participants.slice(0, 3).join(', ')}
                  {cam.participants.length > 3 && '...'} */}
                </p>
              </div>
              <div>
                <button className={cam_css.profilebtn} onClick={() => EnterCam(cam.ovSession)}>화상접속</button>
                {/* <button className={cam_css.profilebtn}>나가기</button> */}
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