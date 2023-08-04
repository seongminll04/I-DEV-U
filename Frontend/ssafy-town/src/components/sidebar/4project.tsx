import React, { useState } from "react";
import project_css from "./4project.module.css";
import { useDispatch } from 'react-redux';
import { setAllowMove, setModal, setWantPJTId } from '../../store/actions';
import axios from "axios";

const BACKEND_SERVER_URL = process.env.REACT_APP_BACKEND_SERVER_URL;

type ProjectDataType = {
    "idx":number;
    "title (VARCHAR)": string;
    "totalNum (INT)": number;
    "nowNum (INT)": number;
    "front(INT)": number;
    "maxFront(INT)": number;
    "back(INT)": number;
    "maxBack(INT)": number;
    "language(List)": string[];
};

const Project: React.FC = () => {
    const dispatch = useDispatch();
    const [projectList, setProjectList] = useState<ProjectDataType[]>([{
      "idx":1,
      "title (VARCHAR)": 'OO 프로젝트',
      "totalNum (INT)": 4,
      "nowNum (INT)": 2,
      "front(INT)": 1,
      "maxFront(INT)": 2,
      "back(INT)": 1,
      "maxBack(INT)": 2,
      "language(List)": ['asdf',],
    }]);


    const loadproject = () => {
      const userToken = localStorage.getItem('userToken')
      axios.get(BACKEND_SERVER_URL + '/project/register',{
        headers : {
          Authorization: 'Bearer ' + userToken
        },
      })
          .then(res => {
              console.log(res);
              if (res.data.resmsg === "프로젝트 리스트 조회 성공") {
                  setProjectList(res.data.list);
              }
          })
          .catch(err => {
              console.log(err);
          });
    };




  // input 방향키 살리기
  const handlekeydown = (event:React.KeyboardEvent<HTMLInputElement>) => {
    loadproject() //일단 박아둠 에러안뜨게
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

    return (
      <div className="sidebar_modal">
        <div style={{width:'100%', display:'flex',flexDirection:'column', alignItems:'center'}}>
          <h1>Project</h1>
          <div className={project_css.search}>
            <input type="text" placeholder='검색어를 입력해주세요' onKeyDown={handlekeydown}
            onFocus={()=>dispatch(setAllowMove(false))} onBlur={()=>dispatch(setAllowMove(true))}/>
            <button>검색</button>
          </div>
          <div style={{display:'flex', width:'85%'}}>
            <button className={project_css.button} onClick={()=>dispatch(setModal('프로젝트필터'))}>필터</button>
            <button className={project_css.button} onClick={()=>dispatch(setModal('프로젝트생성'))}>방 생성</button>
          </div>
          <hr style={{width:'75%', color:'black'}}/>
          <div className={project_css.scrollbox}>
                {projectList.map((project, idx) => (
                    <div key={idx}>
                        <div className={project_css.project}>
                            <div className={project_css.project_detail} onClick={() => dispatch(setModal('프로젝트상세정보'))}>
                                <img src="assets/default_profile.png" alt="" />
                                <div className={project_css.project_data}>
                                    <b>{project["title (VARCHAR)"]}</b>
                                    <p style={{ color: 'gray' }}>#{project["language(List)"].join(' #')}</p>
                                </div>
                            </div>
                            <div>
                                <button className={project_css.btn} onClick={() => { dispatch(setModal('프로젝트참가신청')) 
                              dispatch(setWantPJTId(project.idx))}}>참가신청</button>
                                <span>{project["nowNum (INT)"]}/{project["totalNum (INT)"]}</span>
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
