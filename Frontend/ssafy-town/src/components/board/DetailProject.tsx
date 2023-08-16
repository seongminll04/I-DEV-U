import React, { useEffect, useState } from 'react';
import Detail_css from './DetailProject.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../../store/actions';
import { AppState } from '../../store/state';
import axios from 'axios';
// import Project from '../sidebar/4project';

interface ProjectDataType {
  "idx": number;
  "title": string;
  "managerIdx": number;
  "nickname": string,
  "totalNum": number;
  "nowNum": number;
  "front": number;
  "max_front": number;
  "back": number;
  "max_back": number;
  "type": string;
  "projectLanguages": { idx: number, language: string }[];
  "session": string;
  "content": string;
};

const DetailProject: React.FC = () => {
  const dispatch=useDispatch()
  const wantPJTId = useSelector((state: AppState) => state.wantPJTId);
  const [project, setProject] = useState<ProjectDataType>();
  useEffect(()=>{
    const userToken = localStorage.getItem('userToken')
    axios({
      method:'get',
      url:`https://i9b206.p.ssafy.io:9090/project/detail/${wantPJTId}`,
      headers: {
        Authorization: 'Bearer ' + userToken
      },
    })
    .then(res =>{
      console.log(res)
      setProject(res.data.project)
    })
    .catch(err => console.log(err))
  }, [wantPJTId])

  return (
    <div className={Detail_css.modal_overlay} onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {dispatch(setModal(null));}}} >
      <div className={Detail_css.modal}>
        <p className={Detail_css.closebtn} onClick={() => {dispatch(setModal(null))}}>닫기</p>
        <h1>프로젝트 상세정보</h1>
        <h2>제목 : {project?.title}</h2>
        <h2>내용 : {project?.content}</h2>

        <p> 언어 : 
          {project?.projectLanguages.map(val => val.language).join(', ')}
        </p>        
        <p> 타입 : {project?.type}</p>
        </div>  
    </div>
  );
};

export default DetailProject;
