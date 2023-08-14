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

const ProjectFilter: React.FC<props> = ({ filter, onfilter}) => {
  const languages = ["Python", "Java", "C", "C++", "C#", "Object-C", "Kotlin", "Swift", "Ruby", "Go", "Javascript", "typescript", "PyPy", "PHP", "Rust", "Text", "D", "기타"];
  const positions = ["프론트엔드", "백엔드"];
  const [selectedLanguages, setSelectedLanguages] = useState<{ language: string; }[]>([]);
  // const [selectedPositions, setSelectedPositions] = useState<{ position: string; }[]>([]);
  const [projectType, setProjectType] = useState('PROJECT');
  const dispatch = useDispatch()

  const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (e.target.checked) {
      if (selectedLanguages.length < 5) {
        setSelectedLanguages(prev => [...prev, { language: value }]);
      } else {
        e.preventDefault();
        alert('최대 5개의 언어만 선택할 수 있습니다.');
      }
    } else {
      setSelectedLanguages(prev => prev.filter(lang => lang.language !== value));
    }
  }

  const handlePositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      
  }

  return (
    <div className={filter_css.modal_overlay} onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) { dispatch(setModal(null)) }
    }}>
      <div className={filter_css.logout_modal}>
        <h1>프로젝트 찾기 필터</h1>
        <div className={filter_css.input}>
          <label className={filter_css.label}><span>타</span><span>입</span></label>
          <p> : </p>
          <span>
            <input
              type="radio"
              value="PROJECT"
              checked={projectType === 'PROJECT'}
              onChange={(e) => setProjectType(e.target.value)}
            />
            프로젝트
          </span>
          <span>
            <input
              type="radio"
              value="STUDY"
              checked={projectType === 'STUDY'}
              onChange={(e) => setProjectType(e.target.value)}
            />
            스터디
          </span>
        </div>

        <div className={filter_css.input}>
          <label className={filter_css.label}><span>언</span><span>어</span></label>
          <p> : </p>
          <div className={filter_css.choose} style={{ width: '60%', whiteSpace: 'pre-wrap' }}>
            {languages.map((lang, index) => (
              <label key={index} style={{ whiteSpace: 'pre-wrap' }}>
                <input
                  type="checkbox"
                  value={lang}
                  onChange={handleLanguageChange}
                  checked={selectedLanguages.some(selLang => selLang.language === lang)}
                />
                <span> {lang} </span>
              </label>
            ))}
          </div>
        </div>
        <div className={filter_css.input}>
          <label className={filter_css.label}><span>포</span><span>지</span><span>션</span></label>
          <p> : </p>
          <div className={filter_css.choose} style={{ width: '60%', whiteSpace: 'pre-wrap' }}>
            {positions.map((pos, index) => (
              <label key={index} style={{ whiteSpace: 'pre-wrap' }}>
                <input
                  type="checkbox"
                  value={pos}
                  onChange={handlePositionChange}
                  checked={selectedLanguages.some(selLang => selLang.language === pos)}
                />
                <span> {pos} </span>
              </label>
            ))}
          </div>
        </div>
        <div className={filter_css.button_icon}>
          <button className={filter_css.button} onClick={() => dispatch(setModal(null))}>적용</button>
          <button className={filter_css.button} onClick={() => dispatch(setModal(null))}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default ProjectFilter;