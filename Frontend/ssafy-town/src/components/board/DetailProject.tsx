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
  const userIdxStr = localStorage.getItem('userIdx')
  var userIdx: number | null;
  if (userIdxStr) { userIdx = parseInt(userIdxStr, 10) } else { userIdx = null }
  const dispatch = useDispatch()
  return (
    <div className={Detail_css.modal_overlay} onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) { dispatch(setModal(null)); }
    }} >
      <div className={Detail_css.modal2}>
        <p className={Detail_css.closebtn} onClick={() => { dispatch(setModal(null)) }}>닫기</p>
        <h1 style={{ marginTop: "0px" }}>{selpjt?.type} 상세정보</h1>
        <hr></hr>
        <div className={Detail_css.detail}>
          <div className={Detail_css.title}>
            <h2 style={{ minWidth: "55px" }}>제목</h2>
            <h2 style={{ color: "black", margin: "0px 8px" }}> : </h2>
            <h2>{selpjt?.title}</h2>
          </div>

          <div className={Detail_css.content}>
            <h2 style={{ minWidth: "55px" }}>내용</h2>
            <h2 style={{ color: "black", margin: "0px 8px" }}> : </h2>
            <h2>{selpjt?.content}</h2>
          </div>

          <div className={Detail_css.people}>
            <h2 style={{ minWidth: "55px" }}>인원</h2>
            <h2 style={{ color: "black", margin: "0px 8px" }}> : </h2>
            <h2>{selpjt.nowNum} / {selpjt.totalNum}</h2>
          </div>

          <div className={Detail_css.lang}>
            <h2 style={{ minWidth: "55px" }}>언어</h2>
            <h2 style={{ color: "black", margin: "0px 8px" }}> : </h2>
            <h2>{selpjt?.languageList.map(val => val.language).join(', ')}</h2>
          </div>
        </div>
        {selpjt.userIdx === userIdx ?
          <button className={Detail_css.button} onClick={() => {
            localStorage.setItem('OVsession', selpjt.session)
            window.location.href = "https://i9b206.p.ssafy.io/meeting"
          }}>입장</button>
          :
          <button className={Detail_css.button} onClick={() => {
            if (selpjt["nowNum"] >= selpjt["totalNum"]) {
              alert('구인이 끝난 프로젝트입니다')
              return
            }
            dispatch(setModal('프로젝트참가신청'))
          }}>참가신청</button>
        }
      </div>
    </div>
  );
};

export default DetailProject;
