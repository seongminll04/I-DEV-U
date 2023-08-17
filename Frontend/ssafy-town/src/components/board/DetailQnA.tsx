import React, { useEffect, useState } from 'react';
import Create_css from './CreateQnA.module.css';

import { useDispatch } from 'react-redux';
import { setModal } from '../../store/actions';
import axiosInstance from '../../interceptors'; // axios 인스턴스 가져오기

interface Props {
  qnaid: number;
  onback: () => void;
}

interface User {
  nickname: string;
  storedFileName: string;
}

interface Question {
  idx: number;
  title: string;
  content: string;
  createdAt: string;
  user: User;
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
      onInputSubmit()
    }
  }

  useEffect(() => {
    axiosInstance({
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
    axiosInstance({
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
      axiosInstance({
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
          axiosInstance({
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
      <div className={Create_css.buttons}>
        <p className={Create_css.backbtn} onClick={onback}>돌아가기</p>
        <p className={Create_css.closebtn} onClick={() => { dispatch(setModal(null)) }}>닫기</p>
      </div>
      <div>
        <h1>Q n A 게시글</h1>
        <hr />
        <div style={{ display: 'flex', width: '100%', margin: 'auto' }}>
          <div style={{ width: '60%', textAlign: 'left', margin: '10px 5%', }}>
            {question ? (
              <>
                <div className={Create_css.title}>{question.title}</div>
                <div className={Create_css.profile}>
                  <img src={question.user.storedFileName ? question.user.storedFileName : "assets/default_profile.png"}
                    alt=""
                  />
                  <h3>{question.user.nickname}</h3>
                </div>
                <h3 className={Create_css.date}>{(qTime.getMonth() + 1).toString().padStart(2, '0')}/{qTime.getDate().toString().padStart(2, '0')} {qTime.getHours().toString().padStart(2, '0')}:{qTime.getMinutes().toString().padStart(2, '0')}</h3>
                <h2 className={Create_css.content}>{question.content}</h2>
              </>
            ) : (
              'Loading...'
            )}
          </div>

          <div style={{ width: '40%', margin: '0 2%' }}>
            <h3 style={{ margin: '5px 0' }}>댓글</h3>
            <div className={Create_css.scrollbox}>
              <div>
                <span></span>
              </div>
              {commentlist.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()).map((comment: Comment, index: number) => {
                const now = new Date()
                const date = new Date(comment.createdAt);
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const day = date.getDate().toString().padStart(2, '0');
                const hours = date.getHours().toString().padStart(2, '0');
                const minutes = date.getMinutes().toString().padStart(2, '0');

                var createdtime: string = ''
                if (now.getMonth() === date.getMonth() && now.getDate() === date.getDate()) { createdtime = hours + ' : ' + minutes }
                else {
                  createdtime = `${month}/${day} ${hours}:${minutes}`
                }
                return (
                  <div key={index} style={{ width: '90%', display: 'flex', justifyContent: 'space-between', margin: 'auto' }}>
                    <span>{comment.userNickname} : {comment.content} </span>
                    <span style={{ color: 'gray', fontSize: '12px' }}>
                      {createdtime}
                    </span>
                  </div>
                )
              })}
              {commentlist.length > 0 ? null : <h2 style={{ textAlign: "center" }}>댓글이 없습니다</h2>}
            </div>
            <br />
            <input className={Create_css.commentbox} type="text" value={inputvalue} onChange={(e) => setInputvalue(e.target.value)} onKeyDown={handlekeydown} />
            <button className={Create_css.button} onClick={onInputSubmit}>작성</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailQnA;
