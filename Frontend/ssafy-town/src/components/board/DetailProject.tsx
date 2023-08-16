import React from 'react';
import Detail_css from './DetailProject.module.css';

import { useDispatch } from 'react-redux';
import { setModal } from '../../store/actions';

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
  "content": string;
};
interface Props {
  selpjt: ProjectDataType
}

const DetailProject: React.FC<Props> = ({ selpjt }) => {
  const dispatch = useDispatch()
  return (
    <div className={Detail_css.modal_overlay} onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) { dispatch(setModal(null)); }
    }} >
      <div className={Detail_css.modal}>
        <p className={Detail_css.closebtn} onClick={() => { dispatch(setModal(null)) }}>닫기</p>
        <h1>프로젝트 상세정보</h1>
        <h2>제목 : {selpjt?.title}</h2>
        <h2>내용 : {selpjt?.content}</h2>
        <h2>인원 : {selpjt.nowNum} / {selpjt.totalNum}</h2>
        <p> 언어 :
          {selpjt?.languageList.map(val => val.language).join(', ')}
        </p>
        <p> 타입 : {selpjt?.type}</p>
      </div>
    </div>
  );
};

export default DetailProject;
