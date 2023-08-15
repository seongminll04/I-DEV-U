import React, { useState, useEffect } from 'react';
import QnA_css from './QnA.module.css';
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { setModal } from '../../store/actions';
import CreateQnA from './CreateQnA';
import DetailQnA from './DetailQnA';

interface Question {
  idx: number;
  content: string;
  title: string;
  createdAt: string;
}

const QnA: React.FC = () => {
  const dispatch = useDispatch()
  const [search, setsearch] = useState<string>('');
  const [nowsearch, setnowsearch] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [qnaid, setQnaid] = useState<number>(0);
  const [questionList, setQuestionList] = useState<Question[]>([]);
  const [maxpage, setMaxpage] = useState<number>(0);
  const [pagination, setPagination] = useState<number>(0);


  const [searchlocation, setSearchloaction] = useState<string>("전체")
  useEffect(() => {
    const userToken = localStorage.getItem('userToken')
    axios({
      method: 'get',
      url: 'https://i9b206.p.ssafy.io:9090/qna/list',
      headers: {
        Authorization: 'Bearer ' + userToken
      },
    })
      .then(res => {
        console.log(res.data)
        setQuestionList(res.data["Q&A"]);
        setPagination(0)
        setMaxpage(Math.ceil(res.data['Q&A'].length/10))
      })
      .catch(err => {
        console.log(err)
      })
  }, []);

  const reload = () => {
    const userToken = localStorage.getItem('userToken')
    axios({
      method: 'get',
      url: 'https://i9b206.p.ssafy.io:9090/qna/list',
      headers: {
        Authorization: 'Bearer ' + userToken
      },
    })
      .then(res => {
        setQuestionList(res.data["Q&A"]);
        setPagination(0)
        setMaxpage(Math.ceil(res.data['Q&A'].length/10))
      })
      .catch(err => {
        console.log(err)
      })
  }

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
      searchdata()
    }
  }

  const searchdata = () => {
    if (search === '') {
      if (nowsearch) {
        setnowsearch(false)
        reload()
        return
      }
      else {
        alert('검색어를 입력해주세요')
        return
      }
    }
    setnowsearch(true)

    // 여기서 모든데이터 중 검색어랑 일치하는 것만 리스트화 하는 코드작성 
    const userToken = localStorage.getItem('userToken')
    const url = searchlocation === '제목' ? 'find/title/' + search
      : searchlocation === '내용' ? 'find/content/' + search
      : 'list/'
    console.log(url)
    axios({
      method: 'get',
      url: 'https://i9b206.p.ssafy.io:9090/qna/' + url,
      headers: {
        Authorization: 'Bearer ' + userToken
      },
      params: {
        keyWord: search
      }
    })
      .then(res => {
        setQuestionList(res.data["Q&A"]);
        setPagination(0)
        setMaxpage(Math.ceil(res.data['Q&A'].length/10))
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className={QnA_css.modal_overlay} onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) { dispatch(setModal(null)) }
    }} >
      {page === 0 ?
        <div className={QnA_css.QnA_modal}>
          <p className={QnA_css.closebtn} onClick={() => { dispatch(setModal(null)) }}>닫기</p>
          <h1>Q n A 게시판</h1>
          <hr />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className={QnA_css.search_frame}>
              <select name="검색대상" id="" value={searchlocation} onChange={(e) => { setSearchloaction(e.target.value) }}>
                <option value="전체">전체</option>
                <option value="제목">제목</option>
                <option value="내용">내용</option>
              </select>
              <input type="text" value={search} onChange={(event) => { setsearch(event.target.value) }} onKeyDown={handlekeydown} />
              <button className={QnA_css.createQnA} onClick={searchdata}>검색</button>
              {!nowsearch ? <span></span> : <span className={QnA_css.movebtn} onClick={() => { setsearch(''); setnowsearch(false); reload() }}>검색취소</span>}
            </div>
            <button className={QnA_css.createQnA} onClick={() => setPage(1)}>질문하기</button>
          </div>
          <br />
          {questionList.length > 0 ? 
            questionList.map((question: Question, index: number) => {
              const date = new Date(question.createdAt);
              const month = (date.getMonth() + 1).toString().padStart(2, '0');
              const day = date.getDate().toString().padStart(2, '0');
              const hours = date.getHours().toString().padStart(2, '0');
              const minutes = date.getMinutes().toString().padStart(2, '0');

              return (
                <div>
                  {index < pagination*10 + 10  && index >= pagination*10 ?
                    <div
                    className={QnA_css.notice}
                    onClick={() => {
                      setPage(2);
                      setQnaid(question.idx);
                    }}
                    >
                    <p style={{margin:'5px'}}>{index+1}</p>
                    <p style={{margin:'5px'}}>{question.title}</p>
                    <p style={{margin:'5px'}}>
                      {month}/{day} {hours}:{minutes}
                    </p>
                    </div>: null}
                </div>
              );
            }
            )
           : 
            <div>등록된 질문이 없습니다.</div>
          }
          <br />
          {questionList.length>0 ?
          <div>
            <button className={QnA_css.createQnA} onClick={()=>{if(pagination+1===1){alert('첫 페이지입니다')} else{setPagination(pagination-1)}}}>이전 페이지</button>
            <span>  {maxpage>0 ? pagination+1 : pagination} / {maxpage}   </span>
            <button className={QnA_css.createQnA} onClick={()=>{if(pagination+1>=maxpage){alert('마지막 페이지입니다')} else{setPagination(pagination+1)}}}>다음 페이지</button>
          </div>
          :
          null }

        </div>
        : page === 1 ? <CreateQnA onback={() => { setPage(0); reload() }} />
          : <DetailQnA qnaid={qnaid} onback={() => setPage(0)} />}
    </div>
  );
};

export default QnA;
