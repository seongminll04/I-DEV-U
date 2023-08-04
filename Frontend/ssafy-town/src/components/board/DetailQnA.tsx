import React, { useEffect } from 'react';
import Create_css from './CreateQnA.module.css';

import { useDispatch } from 'react-redux';
import { setModal } from '../../store/actions';
import axios from 'axios';

interface Props {
  qnaid : number;
  onback : () => void;
}

const DetailQnA: React.FC<Props> = ({qnaid,onback}) => {
  const dispatch=useDispatch()
  const userToken = localStorage.getItem('usertoken')
  useEffect(()=>{
    axios({
      method:'get',
      url:`https://i9b206.p.ssafy.io:9090/qna/detail/${qnaid}`,
      headers : {
        Authorization: 'Bearer ' + userToken
      },
    })
    .then(res =>console.log(res))
    .catch(err => console.log(err))
  },[qnaid, userToken])

  return (
      <div className={Create_css.modal}>
        <p className={Create_css.closebtn} onClick={() => {dispatch(setModal(null))}}>닫기</p>
        <p className={Create_css.backbtn} onClick={onback}>돌아가기</p>
        <h1>Q n A 게시글</h1>
        <h2>내용 : ~~~~~~~~</h2>

      </div>
  );
};

export default DetailQnA;
