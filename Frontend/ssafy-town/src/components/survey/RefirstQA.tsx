import React, { useState } from 'react';
import qa_css from './firstQA.module.css';

import { useDispatch } from 'react-redux';
import { setModal } from '../../store/actions';
import axiosInstance from '../../interceptors'; // axios 인스턴스 가져오기

const ReQAModal: React.FC = () => {
  const dispatch = useDispatch()
  const [workingYears, setWorkingYears] = useState<string>("");
  const [currentJob, setCurrentJob] = useState<string>("");
  const [languages, setLanguages] = useState<string[]>([]);
  const [location, setLocation] = useState<string>("");
  const [projectExperience, setProjectExperience] = useState<string>("");

  const workingYearsOptions = ["경력없음", "1년미만", "3년미만", "5년미만", "7년미만", "9년미만", "9년이상"];
  const currentJobOptions = ["서버/백엔드", "프론트엔드", "풀스택", "머신러닝/인공지닝", "데이터엔지니어링", "시스템소프트웨어", "데브옵스", "응용프로그램", "안드로이드", "iOS", "임베디드", "게임클라이언트", "개발PM", "학생", "보기에없음"];
  const languageOptions = ["Python", "Java", "C", "C++", "C#", "Object-C", "Kotlin", "Swift", "Ruby", "Go", "Javascript", "typescript", "PyPy", "PHP", "Rust", "Text", "D", "기타"];
  const locationOptions = ["서울", "경기", "부산", "인천", "세종", "대전", "광주", "대구", "울산", "충남", "충북", "전남", "전북", "경남", "경북", "강원", "제주", "해외", "기타"];
  const projectOptions = ["있다", "없다"];

  const toggleLanguage = (option: string) => {
    setLanguages(prevLanguages => {
      if (prevLanguages.includes(option)) {
        // 이미 선택된 언어는 항상 제거할 수 있음
        return prevLanguages.filter(language => language !== option);
      } else {
        // 아직 선택되지 않은 언어는 최대 5개까지만 선택 가능
        if (prevLanguages.length < 5) {
          return [...prevLanguages, option];
        } else {
          return prevLanguages;
        }
      }
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const surveyResults = [
      {
        surveyIdx: 1,
        surveyTitle: '개발자로 근무한 기간을 선택하세요',
        tagList: [workingYears],
      },
      {
        surveyIdx: 2,
        surveyTitle: '현재 직무는 무엇인가요?',
        tagList: [currentJob],
      },
      {
        surveyIdx: 3,
        surveyTitle: '사용하는 언어가 무엇인가요? (최대 5개)',
        tagList: languages,
      },
      {
        surveyIdx: 4,
        surveyTitle: '거주중인 지역은 어디인가요?',
        tagList: [location],
      },
      {
        surveyIdx: 5,
        surveyTitle: '프로젝트 경험이 있으신가요?',
        tagList: [projectExperience],
      },
    ];

    // onConfirm(surveyResults);
    
    const userToken = localStorage.getItem('userToken')
    const userIdxStr = localStorage.getItem('userIdx')
    var userIdx:number|null;
    if (userIdxStr) {userIdx=parseInt(userIdxStr,10)} else {userIdx=null}

    axiosInstance({
      method:'post',
      url:`https://i9b206.p.ssafy.io:9090/basicSurvey/modify`,
      data:{
        'userIdx':userIdx,
        'surveyResult':surveyResults
      },
      headers : {
        Authorization: 'Bearer ' + userToken
      },
    })
    .then(() =>{
      dispatch(setModal(null))
      alert('설문 수정 완료')
    })
    .catch(()=>alert('설문 수정 실패') )
  }

  const surveyForm = (
    <form onSubmit={handleSubmit}>
      <div>
        <p>👨‍💻 개발자로 근무한 기간을 선택하세요</p>
        {workingYearsOptions.map(option => (
          <label key={option}>
            <input type="radio" name="workingYears" value={option} onChange={() => setWorkingYears(option)} />
            {option}
          </label>
        ))}
      </div>

      <div>
        <p>💻 현재 직무는 무엇인가요?</p>
        {currentJobOptions.map(option => (
          <label key={option}>
            <input type="radio" name="currentJob" value={option} onChange={() => setCurrentJob(option)} />
            {option}
          </label>
        ))}
      </div>

      <div>
        <p>📚 사용하는 언어가 무엇인가요? (최대 5개)</p>
        {languageOptions.map(option => (
          <label key={option}>
          <input 
            type="checkbox" 
            name="languages" 
            value={option} 
            onChange={() => toggleLanguage(option)}
            checked={languages.includes(option)} // checked 속성을 추가하여 렌더링 시 마다 선택 상태를 업데이트함
          />
          {option}
        </label>
        ))}
      </div>

      <div>
        <p>🗺️ 거주중인 지역은 어디인가요?</p>
        <select name="location" onChange={(e) => setLocation(e.target.value)}>
          <option disabled selected value="" hidden>선택</option>
          {locationOptions.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <p>🛠️ 프로젝트 경험이 있으신가요?</p>
        {projectOptions.map(option => (
          <label key={option}>
            <input type="radio" name="projectExperience" value={option} onChange={() => setProjectExperience(option)} />
            {option}
          </label>
        ))}
      </div>

      <input type="submit" value="제출하기" disabled={!(workingYears && currentJob && languages.length && location && projectExperience)} />
    </form>
  );

  return (
    <div className={qa_css.modal_overlay}>
  <div className={qa_css.qa_modal}>
    <p className={qa_css.closebtn} onClick={() => { dispatch(setModal(null))}}>닫기</p>
    <h1>I DEV U</h1>
    <h2>📝 신규 유저 설문조사</h2>
    <h3>* 저희 서비스를 이용하기 위해 첫 로그인시 설문조사가 필요합니다. *</h3>
    {surveyForm}
  </div>
</div>
  );
};

export default ReQAModal;
