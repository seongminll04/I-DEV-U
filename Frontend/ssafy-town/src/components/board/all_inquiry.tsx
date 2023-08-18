import React, { useState, useEffect } from 'react';
import alert_css from '../sidebar/1alert.module.css';
import axiosInstance from '../../interceptors'; // axios 인스턴스 가져오기

import { useDispatch } from 'react-redux';
import { setModal } from '../../store/actions';
import DetailInquiry from './detail_inquiry';

interface Inquiry {
  idx: number;
  content: string;
  title: string;
  createdAt: string;
}

const AllNotice: React.FC = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState<Number>(0);

  const [inquiryList, setInquiryList] = useState<Inquiry[]>([]);
  const [noticeIdx, setInquiryIdx] = useState<number>(0);

  useEffect(() => {
    const userToken = localStorage.getItem('userToken')
    axiosInstance({
      method: 'get',
      url: 'https://i9b206.p.ssafy.io:9090/inquiry/list',
      headers: {
        Authorization: 'Bearer ' + userToken
      },
    })
      .then(res => {
        setInquiryList(res.data.data)
      })
      .catch(err => console.log(err))
  }, [])

  const backpage = () => {
    setPage(0)
  }

  return (
    <div className={alert_css.modal_overlay} onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => { if (e.target === e.currentTarget) { dispatch(setModal(null)) } }} >
      {page === 0 ?
        <div className={alert_css.alert_modal}>
          <div className={alert_css.buttons}>
            <p className={alert_css.backbtn} style={{visibility: "hidden"}} onClick={() => dispatch(setModal('문의목록'))}>돌아가기</p>
            <p className={alert_css.closebtn} onClick={() => { dispatch(setModal(null)) }}>닫기</p>
          </div>
          <div>
            <h1 style={{ margin: '-20px 0 20px 0' }}>1 : 1 문의 목록</h1>
            <hr style={{ border: 'solid 1px gray' }} />
          </div>
          {/* <br /> */}
          {inquiryList.map((inquiry: Inquiry, index: number) => {
            // const date = new Date(inquiry.createdAt);
            return (
              <div onClick={() => { setPage(1); setInquiryIdx(inquiry.idx) }} className={alert_css.inquiry} key={index}>
                <span>{inquiry.idx}</span>
                <span>{inquiry.content}</span>
                {/* <span>
                  {date.getMonth() + 1}/{date.getDate()} {date.getHours()}:{date.getMinutes()}
                </span> */}
              </div>
            )
          })}
        </div>
        : <DetailInquiry backpage={backpage} inquiryIdx={noticeIdx} />}
    </div>
  );
};

export default AllNotice;