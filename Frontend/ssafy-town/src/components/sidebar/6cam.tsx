import React,{ useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import cam_css from './6cam.module.css'
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { setAllowMove } from '../../store/actions';

type CamProps = {
  name: string;
  info: string;
  sessionId: string; // 각 화상방의 세션 ID
};

const Cam: React.FC = () => {
  const dispatch = useDispatch()
  const BACKEND_SERVER_URL = process.env.REACT_APP_BACKEND_SERVER_URL;

  const navigate = useNavigate()
  const [camList, setCamList] = useState<CamProps[]>([
    {name:'',info:'',sessionId: ''}]);

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
  useEffect(()=>{
    axios.get(BACKEND_SERVER_URL+'/video/list', {
      data : '', // 여기 유저 아이디가 들어가야할듯? 아이디 어떻게 받아왔는지 이전꺼에 하셨으면 통일합시다. (api명세서 빠져있어서 대충추가함)
    })
    .then(res =>{
      setCamList(res.data); // 백엔드에서 잘 보내줘야할듯 name / info / sessionId 잘맞춰서 받아야함. 백엔드와 소통 ㄱ
      console.log(res)
    })
    .catch(err=>{console.log(err)
      setCamList([])})
  })

  // 접속 반응 추가하기
  const EnterCam = (sessionId: string) => {
    axios.post(BACKEND_SERVER_URL+'/video/enter', {
      // 이거 백엔드에 들어가서 세션과 유저 아이디를 사용해서 openvidu에서 토큰을 요청하고
      // 받은 토큰을 DB(project_participation)에 저장하고 토큰을 다시 전해줘야함
      sessionId: sessionId
    })
    .then(res =>{
      // const token = res.data.token;
      const map = res.data.map;

      // 토큰을 사용하여 OpenVidu에 접속하는 코드 (OpenVidu SDK를 사용)
      // 예: openVidu.joinSession(token);

      console.log(res)
      navigate(map);  // 성공시 이동주소 L1 M1 S1 L2 M2 이런식으로 받아와서 navigate말고 바로 들어가는형식으로 ㅇㅇ
    })
    .catch(err=>{console.log(err)})
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
        <>
        <div className={cam_css.profile} key={index}>
        <img src="assets/default_profile.png" alt=""/>
        <div className={cam_css.profiledata}>
          <b>{cam.name}</b>
          <p style={{color:'gray'}}>{cam.info}</p>
        </div>
        <div>
        <button className={cam_css.profilebtn} onClick={() => EnterCam(cam.sessionId)}>접속</button>
          <button className={cam_css.profilebtn}>삭제</button>
          </div>
        </div>
        <hr />
        </>
      ))}

      <p>-더 업슴-</p>
      </div>
    </div>
  );
};

export default Cam;
