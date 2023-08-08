import React, { useState, useEffect } from 'react';
import alert_css from '../sidebar/1alert.module.css';
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { setModal } from '../../store/actions';

interface Props {
  backpage: () => void;
}

interface Notice {
  idx: number;
  title: string;
  content: string;
  createdAt: string;
}

const DetailNotice: React.FC<Props> = ({ backpage }) => {
  const dispatch = useDispatch()
  const userToken = localStorage.getItem('userToken');
  let noticeIdx = Number(localStorage.getItem('noticeIdx'));
  const [notice, setNotice] = useState<Notice>();

  useEffect(() => {
    axios({
      method: 'get',
      url: `https://i9b206.p.ssafy.io:9090/notice/detail/${noticeIdx}`,
      headers: {
        Authorization: 'Bearer ' + userToken
      },
    })
      .then(res => {
        console.log(res)
        setNotice(res.data.notice)
      })
      .catch(err => console.log(err))
  })
  return (
    <div className={alert_css.alert_modal}>
      <p className={alert_css.closebtn} onClick={() => { dispatch(setModal(null)) }}>닫기</p>
      <p className={alert_css.backbtn} onClick={backpage}>돌아가기</p>
      <div>
        <p>공지사항 상세정보</p>
        {notice ? notice.title : 'Loading...'} {/* Conditionally render notice.title */}
      </div>
    </div>
  );
};

export default DetailNotice; 