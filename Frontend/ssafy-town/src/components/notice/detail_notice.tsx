import React, { useState, useEffect } from 'react';
import alert_css from '../sidebar/1alert.module.css';
import axiosInstance from '../../interceptors'; // axios 인스턴스 가져오기

import { useDispatch } from 'react-redux';
import { setModal } from '../../store/actions';

interface Props {
  backpage: () => void;
  noticeIdx: number;
}

interface Notice {
  idx: number;
  title: string;
  content: string;
  createdAt: string;
}

const DetailNotice: React.FC<Props> = ({ backpage, noticeIdx }) => {
  const dispatch = useDispatch()
  const userToken = localStorage.getItem('userToken');
  const [notice, setNotice] = useState<Notice>();

  useEffect(() => {
    axiosInstance({
      method: 'get',
      url: `https://i9b206.p.ssafy.io:9090/notice/detail/${noticeIdx}`,
      headers: {
        Authorization: 'Bearer ' + userToken
      },
    })
      .then(res => {
        setNotice(res.data.notice)
      })
      .catch(err => console.log(err))
  }, [noticeIdx, userToken, setNotice])

  return (
    <div className={alert_css.alert_modal}>
      <div className={alert_css.buttons}>
        <p className={alert_css.backbtn} onClick={backpage}>돌아가기</p>
        <p className={alert_css.closebtn} onClick={() => { dispatch(setModal(null)) }}>닫기</p>
      </div>
      <br></br>
      <div className={alert_css.alert_detail}>
        {notice ? (
          <>
            <h2 className={alert_css.alert_title}>{notice?.title}</h2>
            <p className={alert_css.alert_date}>
              {(() => {
                const date = new Date(notice.createdAt);
                return `${date.getFullYear().toString().substring(2)}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
              })()}
            </p>
            <br></br>
            <p className={alert_css.alert_content}>{notice?.content}</p>
          </>
        ) : (
          'Loading...'
        )}
      </div>
    </div>
  );
};

export default DetailNotice; 