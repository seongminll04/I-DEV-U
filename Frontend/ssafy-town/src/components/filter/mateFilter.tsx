import React, { useState, useEffect } from 'react';

import filter_css from './mateFilter.module.css'
import { useDispatch } from 'react-redux';
import { setModal } from '../../store/actions';

interface Filter {
  surveyIdx: number,
  surveyTitle: string,
  tagList: string[],
}

interface props {
  filter: Filter[],
  onfilter: (value: Filter[]) => void,
}

const MateFilter: React.FC<props> = ({ filter, onfilter }) => {
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


  useEffect(() => {
    console.log(filter)
    for (const f of filter) {
      if (f.surveyIdx === 1 && f.tagList) {
        setWorkingYears(f.tagList[0])
      }
      else if (f.surveyIdx === 2 && f.tagList) {
        setCurrentJob(f.tagList[0])
      }
      else if (f.surveyIdx === 3 && f.tagList) {
        setLanguages(f.tagList)
      }
      else if (f.surveyIdx === 4 && f.tagList) {
        setLocation(f.tagList[0])
      }
      else if (f.surveyIdx === 5 && f.tagList) {
        setProjectExperience(f.tagList[0])
      }
    }
  }, [filter])

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

  let selectedTagList = [workingYears, currentJob, location, projectExperience];
  selectedTagList.push(...languages);

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
    console.log(surveyResults)
    onfilter(surveyResults)
    dispatch(setModal(null))
  }

  const surveyForm = (
    <form onSubmit={handleSubmit}>
      <div>
        <p>👨‍💻 개발자로 근무한 기간을 선택하세요</p>
        {/* <label>
            <input type="radio" name="workingYears" onChange={() => setWorkingYears('상관없음')}  checked={workingYears==='상관없음'} />
            상관없음
          </label> */}
        {workingYearsOptions.map(option => (
          <label key={option}>
            <input type="radio" name="workingYears" value={option} onChange={() => setWorkingYears(option)} checked={workingYears === option} />
            {option}
          </label>
        ))}
      </div>

      <div>
        <p>💻 현재 직무는 무엇인가요?</p>
        {/* <label>
            <input type="radio" name="currentJob" onChange={() => setCurrentJob('상관없음')}  checked={currentJob==='상관없음'} />
            상관없음
          </label> */}
        {currentJobOptions.map(option => (
          <label key={option}>
            <input type="radio" name="currentJob" value={option} onChange={() => setCurrentJob(option)} checked={currentJob === option} />
            {option}
          </label>
        ))}
      </div>

      <div>
        <p>📚 사용하는 언어가 무엇인가요? (최대 5개)</p>
        {/* <label>
            <input type="checkbox" name="languages" onChange={() => setLanguages(languageOptions)}  checked={languages===languageOptions} />
            상관없음
          </label> */}
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
          {/* <option key={'상관없음'} value={'상관없음'} selected={location==='상관없음'}>
              무관
            </option> */}
          {locationOptions.map(option => (
            <option key={option} value={option} selected={location === option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <p>🛠️ 프로젝트 경험이 있으신가요?</p>
        {/* <label key={'상관없음'}>
            <input type="radio" name="projectExperience" value={'상관없음'} onChange={() => setProjectExperience('상관없음')} checked={projectExperience==='상관없음'} />
            상관없음
          </label> */}
        {projectOptions.map(option => (
          <label key={option}>
            <input type="radio" name="projectExperience" value={option} onChange={() => setProjectExperience(option)} checked={projectExperience === option} />
            {option}
          </label>
        ))}
      </div>
    </form>
  );

  return (
    <div className={filter_css.modal_overlay} onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) { dispatch(setModal(null)) }
    }}>
      <div className={filter_css.logout_modal}>
        <h1>동료찾기 필터</h1>
        {surveyForm}
        <div className={filter_css.button_icon}>
          <button className={filter_css.button} onClick={handleSubmit}>적용</button>
          <button className={filter_css.button} onClick={() => dispatch(setModal(null))}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default MateFilter;