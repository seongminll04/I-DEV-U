import React, { useState,useEffect } from "react";
import project_css from "./4project.module.css";
import { useDispatch } from 'react-redux';
import { setAllowMove, setModal, setWantPJTId } from '../../store/actions';
import axios from "axios";

// const BACKEND_SERVER_URL = process.env.REACT_APP_BACKEND_SERVER_URL;

type ProjectDataType = {
    "idx":number;
    "title": string;
    "totalNum": number;
    "nowNum": number;
    "front": number;
    "max_front": number;
    "back": number;
    "max_back": number;
    "projectLanguages": {idx:number,language:string}[];
    "projectTechs": string[];
    "type":string;
    "session":string;
};

const Project: React.FC = () => {
  const dispatch = useDispatch();
  const [projectList, setProjectList] = useState<ProjectDataType[]>([]);
  const [inputvalue, setInputValue] = useState<string>('');
  
  useEffect(()=>{
    const userToken = localStorage.getItem('userToken')
    axios({
      method:'get',
      url:'https://i9b206.p.ssafy.io:9090/project/list',
      headers : {
        Authorization: 'Bearer ' + userToken
      },
      data:{keyword:""}
    }).then(res => {
        setProjectList(res.data.list)})
    .catch(err => {console.log(err);});
  },[])

  const loaddata = () => {
    const userToken = localStorage.getItem('userToken')
    axios({
      method:'get',
      url:`https://i9b206.p.ssafy.io:9090/project/list/${inputvalue}`,
      headers : {
        Authorization: 'Bearer ' + userToken
      },
    }).then(res => {
      setProjectList(res.data.list)})
    .catch(err => {console.log(err);});
    
  }

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
    } else if (event.key ==='Enter') {
      loaddata()
    }
  }

    return (
      <div className="sidebar_modal">
        <div style={{width:'100%', display:'flex',flexDirection:'column', alignItems:'center'}}>
          <h1>Project</h1>
          <div className={project_css.search}>
            <input type="text" placeholder='검색어를 입력해주세요' onKeyDown={handlekeydown}
            onFocus={()=>dispatch(setAllowMove(false))} onBlur={()=>dispatch(setAllowMove(true))}
            value={inputvalue} onChange={(e)=>setInputValue(e.target.value)}/>
            <button onClick={loaddata}>검색</button>
          </div>
          <div style={{display:'flex', width:'85%'}}>
            <button className={project_css.button} onClick={()=>dispatch(setModal('프로젝트필터'))}>필터</button>
            <button className={project_css.button} onClick={()=>dispatch(setModal('프로젝트생성'))}>방 생성</button>
          </div>
          <hr style={{width:'75%', color:'black'}}/>
          <div className={project_css.scrollbox}>
            {projectList.length===0 ? '조회 결과가 없습니다':null}
            {projectList.map((project, idx) => (
                <div key={idx}>
                    <div className={project_css.project}>
                        <div className={project_css.project_detail} onClick={() => {dispatch(setModal('프로젝트상세정보')) 
                          dispatch(setWantPJTId(project.idx))}}>
                            <img src="assets/default_profile.png" alt="" />
                            <div className={project_css.project_data}>
                                <b>{project["title"]}</b>
                                <p style={{ color: 'gray' }}>
                                  {project.projectLanguages.map((language,index)=>(
                                    <span>#{language.language} </span>
                                  ))}
                                </p>
                            </div>
                        </div>
                        <div>
                            <button className={project_css.btn} onClick={() => {dispatch(setModal('프로젝트참가신청')) 
                          dispatch(setWantPJTId(project.idx))}}>참가신청</button>
                            <span>{project["nowNum"]}/{project["totalNum"]}</span>
                        </div>
                    </div>
                    <hr />
                </div>
                ))}
            </div>

        </div>
      </div>
    );
};

  export default Project;
