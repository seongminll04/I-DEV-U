import React, { useState, useEffect } from "react";
import project_css from "./4project.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { setAllowMove, setModal } from '../../store/actions';
import axios from "axios";
import { AppState } from "../../store/state";
import ProjectFilter from "../filter/projectFilter";
import EnterProject from "../board/EnterProject";
import CreateProject from "../board/CreateProject";
import DetailProject from "../board/DetailProject";

// const BACKEND_SERVER_URL = process.env.REACT_APP_BACKEND_SERVER_URL;

type ProjectDataType = {
  "idx": number;
  "title": string;
  "userIdx": number;
  "nickname": string,
  "totalNum": number;
  "nowNum": number;
  "type": string;
  "languageList": { idx: number, language: string }[];
  "session": string;
  content:string;
};

interface Filter {
  type: string,
  languageList: string[],
}

const Project: React.FC = () => {
  const dispatch = useDispatch();
  const [projectList, setProjectList] = useState<ProjectDataType[]>([]);
  const [inputvalue, setInputValue] = useState<string>('');
  const isModalOpen = useSelector((state: AppState) => state.isModalOpen);// 모달창 오픈여부 (알림, 로그아웃)
  const [projectFilter, setProjectFilter] = useState<Filter>();
  const [survey, setSurvey] = useState<boolean>(false);
  const [selpjt, setSelpjt] = useState<ProjectDataType>();
  const userIdxStr = localStorage.getItem('userIdx')
  var userIdx: number | null;
  if (userIdxStr) { userIdx = parseInt(userIdxStr, 10) } else { userIdx = null }
  // 프로젝트 필터
  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    // const userIdxStr = localStorage.getItem('userIdx')
    // var userIdx: number | null;
    // if (userIdxStr) { userIdx = parseInt(userIdxStr, 10) } else { userIdx = null }
    if (survey) {
      setSurvey(false)
      axios({
        method: 'post',
        url: 'https://i9b206.p.ssafy.io:9090/project/filter',
        headers: {
          Authorization: 'Bearer ' + userToken
        },
        data: projectFilter
      })
        .then(res => {
          console.log("프로젝트 필터링결과")
          console.log(res.data)
          setProjectList(res.data.list);
        })
        .catch(err => {
          alert("알 수 없는 오류 발생! 새로고침 후 다시 시도해주세요!")
          console.log(err)
        })
    }
  }, [survey, projectFilter])

  // 처음에 가져오는 프로젝트 리스트
  useEffect(() => {
    console.log("first");
    const userToken = localStorage.getItem('userToken')
    axios({
      method: 'get',
      url: 'https://i9b206.p.ssafy.io:9090/project/list',
      headers: {
        Authorization: 'Bearer ' + userToken
      },
      data: { keyword: "" }
    }).then(res => {
      console.log(res.data)
      setProjectList(res.data.list)
    })
      .catch(err => { console.log(err); });
  }, [])

  // 키워드로 프로젝트 검색
  const loaddata = () => {
    const userToken = localStorage.getItem('userToken')
    axios({
      method: 'get',
      url: `https://i9b206.p.ssafy.io:9090/project/list/${inputvalue}`,
      headers: {
        Authorization: 'Bearer ' + userToken
      },
    }).then(res => {
      setProjectList(res.data.list)
    })
      .catch(err => { console.log(err); });

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
    } else if (event.key === 'Enter') {
      loaddata()
    }
  }

  return (
    <div className="sidebar_modal">
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1>Project</h1>
        <div className={project_css.search}>
          <input type="text" placeholder='검색어를 입력해주세요' onKeyDown={handlekeydown}
            onFocus={() => dispatch(setAllowMove(false))} onBlur={() => dispatch(setAllowMove(true))}
            value={inputvalue} onChange={(e) => setInputValue(e.target.value)} />
          <button onClick={loaddata}>검색</button>
        </div>
        <div style={{ display: 'flex', width: '85%' }}>
          <button className={project_css.button} onClick={() => dispatch(setModal('프로젝트필터'))}>필터</button>
          <button className={project_css.button} onClick={() => dispatch(setModal('프로젝트생성'))}>방 생성</button>
        </div>
        <div className={project_css.scrollbox}>
          <hr style={{ width: '75%', color: 'black' }} />
          {Array.isArray(projectList) && projectList.length === 0 ? '조회 결과가 없습니다' : null}
          {Array.isArray(projectList) && projectList.map((project, idx) => (
            <div key={idx}>
              <div className={project_css.project}>
                <div className={project_css.project_detail} onClick={() => {
                  dispatch(setModal('프로젝트상세정보'))
                  setSelpjt(project)
                }}>
                  <img src="assets/default_profile.png" alt="" />
                  <div className={project_css.project_data}>
                    <b>{project["title"]}</b>
                    <p style={{ color: 'gray' }}>
                      {project.languageList.map((lang, idx2) => (
                        <span key={idx2}>#{lang.language} </span>
                      ))}
                    </p>
                  </div>
                </div>
                <div>
                  {project.userIdx === userIdx ? 
                  <button className={project_css.btn} style={{color:'red'}} onClick={() => {
                    localStorage.setItem('OVsession',project.session)
                    window.location.href = "https://i9b206.p.ssafy.io/meeting"}}>입장</button>
                  :
                    <button className={project_css.btn} onClick={() => {
                    if (project["nowNum"]>=project["totalNum"]){
                      alert('구인이 끝난 프로젝트입니다')
                      return
                    }
                    dispatch(setModal('프로젝트참가신청'))
                    setSelpjt(project)}}>참가신청</button>
                  }
                  <span>{project["nowNum"]}/{project["totalNum"]}</span>
                </div>
              </div>
              <hr />
            </div>
          ))}
        </div>
      </div>
      {isModalOpen === '프로젝트필터' ? <ProjectFilter onSurvey={(value: boolean) => setSurvey(value)} onfilter={(value: Filter) => setProjectFilter(value)} />
      : isModalOpen === '프로젝트참가신청' ? <EnterProject selpjt={selpjt!}/>
      : isModalOpen === '프로젝트상세정보' ? <DetailProject selpjt={selpjt!}/>
      : isModalOpen === '프로젝트생성' ? <CreateProject />
      : null}
    </div>
  );
};

export default Project;
