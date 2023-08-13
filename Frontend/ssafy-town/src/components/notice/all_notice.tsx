import React, { useState, useEffect } from 'react';
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
  const [noticeList, setNoticeList] = useState<Notice[]>([]);
  const [noticeIdx, setNoticeIdx] = useState<number>(0);
  const [searchlocation, setSearchloaction] = useState<string>("전체")

  useEffect(() => {
    const userToken = localStorage.getItem('userToken')
    axios({
      method: 'get',
      url: 'https://i9b206.p.ssafy.io:9090/notice/list',
      headers: {
        Authorization: 'Bearer ' + userToken
      },
    })
      .then(res => {
        // console.log(res.data)
        setNoticeList(res.data.list)
      })
      .catch(err => console.log(err))
  }, [])

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
    }
  }
  let url = searchlocation === '제목' ? 'find/title'
    : searchlocation === '내용' ? 'find/content'
      : 'find'

  const searchdata = () => {
    axios({
      method: 'get',
      url: 'https://localhost:9090/notice/' + url,
      headers: {
        Authorization: 'Bearer ' + userToken
      },
      params: {
        keyWord: search
      }
    })
      .then(res => {
        // console.log(res.data.list)
        setNoticeList(res.data.list)
      })
    setnowsearch(true)
    // 여기서 모든데이터 중 검색어랑 일치하는 것만 리스트화 하는 코드작성
  }
  const backpage = () => {
    setPage(0)
  }

  return (
    <div className={alert_css.modal_overlay} onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => { if (e.target === e.currentTarget) { dispatch(setModal(null)) } }} >
      {page === 0 ?
        <div className={alert_css.alert_modal}>
          <div className={alert_css.buttons}>
            <p className={alert_css.backbtn} onClick={() => dispatch(setModal('공지알림'))}>돌아가기</p>
            <p className={alert_css.closebtn} onClick={() => { dispatch(setModal(null)) }}>닫기</p>
          </div>
          <div>
            <h1 style={{ margin: '-20px 0 20px 0' }}>공지사항</h1>
            <hr style={{ border: 'solid 1px gray' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <select name="검색대상" id="" value={searchlocation} onChange={(e) => { setSearchloaction(e.target.value) }}>
                  <option value="전체">전체</option>
                  <option value="제목">제목</option>
                  <option value="내용">내용</option>
                </select>
                <input type="text" value={search} onChange={(event) => { setsearch(event.target.value) }} onKeyDown={handlekeydown} />
                <button onClick={searchdata}>검색</button>
                {!nowsearch ? <span></span> : <span className={alert_css.movebtn} onClick={() => { setsearch(''); setnowsearch(false) }}>검색취소</span>}
              </div>
            </div>
          </div>
          {/* <br /> */}
          {noticeList.map((notice: Notice, index: number) => {
            const date = new Date(notice.createdAt);
            return (
              <div onClick={() => { setPage(1); setNoticeIdx(notice.idx) }} className={alert_css.notice} key={index}>
                <span>{notice.idx}</span>
                <span>{notice.content}</span>
                <span>
                  {date.getMonth() + 1}/{date.getDate()} {date.getHours()}:{date.getMinutes()}
                </span>
              </div>
            )
          })}
        </div>
        : <DetailNotice backpage={backpage} noticeIdx={noticeIdx} />}
    </div>
  );
};

export default AllNotice;