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
  const dispatch = useDispatch();
  const userToken = localStorage.getItem('userToken')
  const [page, setPage] = useState<Number>(0); 

  const [search, setsearch] = useState<string>('');
  const [nowsearch, setnowsearch] = useState<boolean>(false);
  const [noticeList,setNoticeList] =useState<Notice[]>([]);
  const [noticeIdx, setNoticeIdx] = useState<number>(0);
  
  useEffect(()=>{
    axios({
      method:'get',
      url:'https://i9b206.p.ssafy.io:9090/notice/list/all',
      headers : {
        Authorization: 'Bearer ' + userToken
      },
    })
    .then(res => {
      console.log(res)
      setNoticeList(res.data)
    })
    .catch(err => console.log(err))
  })

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
                {noticeList.map((notice: Notice, index: number) => {
                  return (
                    <div onClick={()=> {setPage(1); setNoticeIdx(notice.idx)}} className={alert_css.notice} key={index}>
                      <span>{notice.idx}</span>
                      <span>{notice.content}</span>
                      <span>{notice.createdAt}</span>
                    </div>
                  )})}
            </div>
            :  <DetailNotice backpage={backpage} noticeIdx={noticeIdx} /> }
        </div>
  );
};

export default AllNotice;