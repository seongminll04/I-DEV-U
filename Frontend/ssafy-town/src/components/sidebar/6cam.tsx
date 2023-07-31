import React,{ useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import cam_css from './6cam.module.css'
import axios from 'axios';

type CamProps = {
  name: string;
  info: string;
};

const Cam: React.FC = () => {
  const navigate = useNavigate()
  const [camList, setCamList] = useState<CamProps[]>([
    {name:'프로젝트 1',info:'프로젝트 소개'},
    {name:'프로젝트 2',info:'프로젝트 소개'}]);

  // 접속 반응 추가하기
  const EnterCam = () => {
    axios({
      method:'',
      url:'https://~~~~~.~~~~/'
      // data:
    })
    .then(res =>{
      // 응답 
      console.log(res)
      navigate('???')  // 성공시 이동주소?
    })
    .catch(err=>{console.log(err)})
  }

  // 유저의 화상방 데이터 가져오기
  useEffect(()=>{
    axios({
      method:'get',
      url:'https://~~~~~.~~~~/'
      // data:
    })
    .then(res =>{
      // setCamList()   데이터 받아서 여기에 저장
      console.log(res)
    })
    .catch(err=>{console.log(err)})
  })
  
  return (
    <div className='sidebar_modal'>
      <h1>내 화상방</h1>
      <div className={cam_css.search}>
        <input type="text" placeholder='검색어를 입력해주세요'/>
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
          <button className={cam_css.profilebtn} onClick={EnterCam}>접속</button>
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
