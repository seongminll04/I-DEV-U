import React, { useEffect, useState } from 'react';
import Create_css from './CreateQnA.module.css';

import { useDispatch } from 'react-redux';
import { setModal } from '../../store/actions';
import axios from 'axios';

interface Props {
  qnaid: number;
  onback: () => void;
}

interface Question {
  idx: number;
  title: string;
  content: string;
  createdAt: string;
}

interface Comment {
  boardIdx: number;
  userIdx: number;
  userNickname: string;
  content: string;
  createdAt: string;
}

const DetailQnA: React.FC<Props> = ({ qnaid, onback }) => {
  const dispatch = useDispatch()
  const [commentlist, setCommentlist] = useState<Comment[]>([])
  const [inputvalue, setInputvalue] = useState('')
  const userToken = localStorage.getItem('userToken')
  const [question, setQuestion] = useState<Question>();
  const [qTime, setQTime] = useState<Date>(new Date());

     // input 방향키 살리기
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
      } else if (event.key === 'Enter') {
        onInputSubmit()
      }
    }

  useEffect(() => {
    axios({
      method: 'get',
      url: `https://i9b206.p.ssafy.io:9090/qna/detail/${qnaid}`,
      headers: {
        Authorization: 'Bearer ' + userToken
      },
    })
      .then(res => {
        console.log(res)
        setQuestion(res.data["Q&A"])
        setQTime(new Date(res.data["Q&A"].createdAt))
      })
      .catch(err => console.log(err))
  }, [qnaid, userToken])

  useEffect(() => {
    axios({
      method: 'get',
      url: `https://i9b206.p.ssafy.io:9090/qna/comment/${qnaid}`,
      headers: {
        Authorization: 'Bearer ' + userToken
      },
    })
      .then(res => {
        // console.log(res.data);
        setCommentlist(res.data.data)
      })
      .catch(err => console.log(err))
  }, [qnaid, userToken])

  const onInputSubmit = () => {
    if (inputvalue !== '') {
      axios({
        method: 'post',
        url: `https://i9b206.p.ssafy.io:9090/qna/comment/write`,
        data: {
          'boardIdx': qnaid,
          'userIdx': Number(localStorage.getItem("userIdx")),
          'content': inputvalue,
        },
        headers: {
          Authorization: 'Bearer ' + userToken
        },
      })
        .then(res => {
          console.log(res)
          setInputvalue('')
          axios({
            method: 'get',
            url: `https://i9b206.p.ssafy.io:9090/qna/comment/${qnaid}`,
            headers: {
              Authorization: 'Bearer ' + userToken
            },
          })
            .then(res => {
              // console.log(res.data);
              setCommentlist(res.data.data)
            })
            .catch(err => console.log(err))
        })
    }
  }


  return (
    <div className={Create_css.modal}>
      <p className={Create_css.closebtn} onClick={() => { dispatch(setModal(null)) }}>닫기</p>
      <p className={Create_css.backbtn} onClick={onback}>돌아가기</p>
      <div>
        <h1>Q n A 게시글</h1>
        {question ? (
          <>
            <p>제목 : {question.title}</p>
            <p>내용 : {question.content}</p>
            <p>날짜 : {qTime.getMonth() + 1}/{qTime.getDate()} {qTime.getHours()}:{qTime.getMinutes()}</p>
          </>
        ) : (
          'Loading...'
        )}
        <h2>댓글</h2>
        <hr />
        {commentlist.map((comment: Comment, index: number) => {
          const date = new Date(comment.createdAt);
          return (
            <div key={index}>
              <span>[{comment.userNickname}] </span>
              <span>{comment.content}, </span>
              <span>
                작성시간 : {date.getMonth() + 1}/{date.getDate()} {date.getHours()}:{date.getMinutes()}
              </span>
            </div>
          )
        })}
        <input type="text" value={inputvalue} onChange={(e) => setInputvalue(e.target.value)} onKeyDown={handlekeydown} />
        <button onClick={onInputSubmit}>작성</button>
      </div>
      <hr />
    </div>
  );
};

export default DetailQnA;
