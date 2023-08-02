import React, {useState, useEffect } from 'react';
import alert_css from '../sidebar/1alert.module.css';
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { setModal } from '../../store/actions';
import DetailNotice from './detail_notice';

interface Notice {
  idx: number;
  content: string;
  title: string;
  createdAt: string;
}

const AllNotice: React.FC = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useState<Number>(0); 

  const [search, setsearch] = useState<string>('');
  const [nowsearch, setnowsearch] = useState<boolean>(false);
  const [noticeList,setNoticeList] =useState<Notice[]>([{idx:1,content:'strign',title:'asdf',createdAt:'asdf'}]);
  
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
    }
  }

  const searchdata = () => {
    setnowsearch(true)
    // 여기서 모든데이터 중 검색어랑 일치하는 것만 리스트화 하는 코드작성
  }
  const backpage = () => {
    setPage(0)
  }

  return (
    <div className={alert_css.modal_overlay} onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => 
        {if (e.target === e.currentTarget) {dispatch(setModal(null))}}} >
            {page===0 ? 
            <div className={alert_css.alert_modal}>
            <p className={alert_css.closebtn} onClick={() => {dispatch(setModal(null))}}>닫기</p>
            <p className={alert_css.backbtn} onClick={() => dispatch(setModal('공지알림')) }>돌아가기</p>
            <div>
                <h1 style={{margin:'-20px 0 20px 0'}}>공지사항</h1>
                <hr style={{border:'solid 1px gray'}}/>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                  <div>
                    <input type="text" value={search} onChange={(event) => {setsearch(event.target.value)}} onKeyDown={handlekeydown}/>
                    <button onClick={searchdata}>검색</button>
                    {!nowsearch ? <span></span> : <span className={alert_css.movebtn} onClick={()=> {setsearch(''); setnowsearch(false)}}>검색취소</span>}
                  </div>
                </div>
                </div>
                <br />
                <div onClick={()=>setPage(1)} className={alert_css.notice}>
                    <span>1</span>
                    <span>금일 오후 12:00 에 점검 일정이 있습니다.</span>
                    <span>07/19 00:00</span>
                </div>
            </div>
            :  <DetailNotice backpage={backpage} /> }
        </div>
  );
};

export default AllNotice;