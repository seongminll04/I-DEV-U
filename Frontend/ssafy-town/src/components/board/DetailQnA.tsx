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
  content: string;
  title: string;
  createAt: string;
}

const DetailQnA: React.FC<Props> = ({ qnaid, onback }) => {
  const dispatch = useDispatch()
  const [commentlist, setCommentlist] = useState()
  const [inputvalue, setInputvalue] = useState('')
  const userToken = localStorage.getItem('userToken')
  const [question, setQuestion] = useState<Question>();
  const loadcomment = () => {
    axios({
      method: 'get',
      url: `https://i9b206.p.ssafy.io:9090/qna/comment/${qnaid}`,
      headers: {
        Authorization: 'Bearer ' + userToken
      },
    })
      .then(res => {
        console.log(res.data);
        setCommentlist(res.data)
      })
      .catch(err => console.log(err))
  }

  const onInputSubmit = () => {
    if (inputvalue !== '') {
      axios({
        method: 'post',
        url: '',
        headers: {
          Authorization: 'Bearer ' + userToken
        },
      })
        .then(res => console.log(res))
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
      })
      .catch(err => console.log(err))
  })

  return (
    <div className={Create_css.modal}>
      <p className={Create_css.closebtn} onClick={() => { dispatch(setModal(null)) }}>닫기</p>
      <p className={Create_css.backbtn} onClick={onback}>돌아가기</p>
      <div>
        <h1>Q n A 게시글</h1>
        {question ? (
          <>
            <p>{question?.title}</p>
            <p>{question?.content}</p>
            <p>{question?.createAt}</p>
          </>
        ) : (
          'Loading...'
        )}
      </div>
      <hr />
    </div>
  );
};

export default DetailQnA;
