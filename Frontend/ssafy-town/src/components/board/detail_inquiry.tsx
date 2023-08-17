import React, { useState, useEffect } from 'react';
import alert_css from '../sidebar/1alert.module.css';
import axiosInstance from '../../interceptors'; // axios 인스턴스 가져오기

import { useDispatch } from 'react-redux';
import { setModal } from '../../store/actions';

interface Props {
  backpage: () => void;
  inquiryIdx: number;
}

interface Inquiry {
  idx: number;
  title: string;
  content: string;
  createdAt: string;
}

const DetailNotice: React.FC<Props> = ({ backpage, inquiryIdx }) => {
  const dispatch = useDispatch()
  const userToken = localStorage.getItem('userToken');
  const [inquiry, setInquiry] = useState<Inquiry>();

  useEffect(() => {
    axiosInstance({
      method: 'get',
      url: `https://i9b206.p.ssafy.io:9090/inquiry/detail/${inquiryIdx}`,
      headers: {
        Authorization: 'Bearer ' + userToken
      },
    })
      .then(res => {
        // console.log(res)
        setInquiry(res.data.inquiry)
      })
      .catch(err => console.log(err))
  }, [inquiryIdx, userToken, setInquiry])

  return (
    <div className={alert_css.alert_modal}>
      <div className={alert_css.buttons}>
        <p className={alert_css.backbtn} onClick={backpage}>돌아가기</p>
        <p className={alert_css.closebtn} onClick={() => { dispatch(setModal(null)) }}>닫기</p>
      </div>
      <br></br>
      <div className={alert_css.alert_detail}>
        {inquiry ? (
          <>
            <h2 className={alert_css.alert_title}>{inquiry?.title}</h2>
            {/* <p className={alert_css.alert_date}>
              {(() => {
                const date = new Date(inquiry.createdAt);
                return `${date.getFullYear().toString().substring(2)}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
              })()}
            </p> */}
            <br></br>
            <p className={alert_css.alert_content}>{inquiry?.title}</p>
            <p className={alert_css.alert_content}>{inquiry?.content}</p>
          </>
        ) : (
          'Loading...'
        )}
      </div>
    </div>
  );
};

export default DetailNotice; 