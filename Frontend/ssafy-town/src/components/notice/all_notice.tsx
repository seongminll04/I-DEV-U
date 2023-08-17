import React, { useState, useEffect } from 'react';
import alert_css from '../sidebar/1alert.module.css';
import axiosInstance from '../../interceptors'; // axios 인스턴스 가져오기

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
  const [page, setPage] = useState<Number>(0);

  const [noticeList, setNoticeList] = useState<Notice[]>([]);
  const [noticeIdx, setNoticeIdx] = useState<number>(0);

  useEffect(() => {
    const userToken = localStorage.getItem('userToken')
    axiosInstance({
      method: 'get',
      url: 'https://i9b206.p.ssafy.io:9090/notice/list',
      headers: {
        Authorization: 'Bearer ' + userToken
      },
    })
      .then(res => {
        console.log(res.data)
        setNoticeList(res.data.list)
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
            <p className={alert_css.backbtn} onClick={() => dispatch(setModal('공지알림'))}>돌아가기</p>
            <p className={alert_css.closebtn} onClick={() => { dispatch(setModal(null)) }}>닫기</p>
          </div>
          <div>
            <h1 style={{ margin: '-20px 0 20px 0' }}>공지사항</h1>
            <hr style={{ border: 'solid 1px gray' }} />
          </div>
          {/* <br /> */}
          {noticeList.map((notice: Notice, index: number) => {
            const date = new Date(notice.createdAt);
            return (
              <div onClick={() => { setPage(1); setNoticeIdx(notice.idx) }} className={alert_css.notice} key={index}>
                <span>{index+1}</span>
                <span>{notice.title}</span>
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