import React, { useState } from 'react';
import filter_css from './projectFilter.module.css'
import { useDispatch } from 'react-redux';
import { setModal } from '../../store/actions';

interface Filter {
  tagList: string[],
}

interface props {
  filter: Filter[],
  onfilter: (value: Filter[]) => void,
}

const ProjectFilter: React.FC<props> = ({ filter, onfilter }) => {
  const [languages, setLanguages] = useState<string[]>([]);
  const [positions, setPositions] = useState<string[]>([]);
  const [projectType, setProjectType] = useState('PROJECT');
  const dispatch = useDispatch()

  const languageOptions = ["Python", "Java", "C", "C++", "C#", "Object-C", "Kotlin", "Swift", "Ruby", "Go", "Javascript", "typescript", "PyPy", "PHP", "Rust", "Text", "D", "기타"];
  const positionsOptions = ["프론트엔드", "백엔드"];
  const projectOptions = ["프로젝트", "스터디"];


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

  const togglePosition = (option: string) => {
    setPositions(prevPositions => {
      if (prevPositions.includes(option)) {
        // 이미 선택된 언어는 항상 제거할 수 있음
        return prevPositions.filter(position => position !== option);
      } else {
        return [...prevPositions, option];
      }
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const surveyResults = [
      {
        tagList : [projectType],
      },
      {
        tagList : languages,
      },
      {
        tagList : positions,
      }
    ]
    console.log(surveyResults)
    onfilter(surveyResults);
    dispatch(setModal(null))
  }

  const filterForm = (
    <form onSubmit={handleSubmit}>
      <div className={filter_css.input}>
        <label className={filter_css.label}><span>타</span><span>입</span></label>
        <p> : </p>
        {projectOptions.map(option => (
          <label key={option}>
            <input type="radio" name="projectType" value={option} onChange={() => setProjectType(option)} checked={projectType === option} />
            {option}
          </label>
        ))}
      </div>
      <div className={filter_css.input}>
        <label className={filter_css.label}><span>언</span><span>어</span></label>
        <p> : </p>
        <div className={filter_css.choose} style={{ width: '60%', whiteSpace: 'pre-wrap' }}>
          {languageOptions.map(option => (
            <label key={option} style={{ whiteSpace: 'pre-wrap' }}>
              <input
                type="checkbox"
                name="languages"
                value={option}
                onChange={() => toggleLanguage(option)}
                checked={languages.includes(option)}  // checked 속성을 추가하여 렌더링 시 마다 선택 상태를 업데이트함
              />
              {option}
            </label>
          ))}
        </div>
      </div>
      <div className={filter_css.input}>
        <label className={filter_css.label}><span>포</span><span>지</span><span>션</span></label>
        <p> : </p>
        <div className={filter_css.choose} style={{ width: '60%', whiteSpace: 'pre-wrap' }}>
          {positionsOptions.map(option => (
            <label key={option} style={{ whiteSpace: 'pre-wrap' }}>
              <input
                type="checkbox"
                name="positions"
                value={option}
                onChange={() => togglePosition}
                checked={positions.includes(option)}  // checked 속성을 추가하여 렌더링 시 마다 선택 상태를 업데이트함
              />
              {option}
            </label>
          ))}
        </div>
      </div>
    </form>
  )

  return (
    <div className={filter_css.modal_overlay} onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) { dispatch(setModal(null)) }
    }}>
      <div className={filter_css.logout_modal}>
        <h1>프로젝트 찾기 필터</h1>
        {filterForm}
        <div className={filter_css.button_icon}>
          <button className={filter_css.button} onClick={handleSubmit}>적용</button>
          <button className={filter_css.button} onClick={() => dispatch(setModal(null))}>취소</button>
        </div>
      </div >
    </div>

  );
};

export default ProjectFilter;