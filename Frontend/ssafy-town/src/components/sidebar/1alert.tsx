import React, {useState, useEffect} from 'react';
import alert_css from './1alert.module.css';
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { setModal } from '../../store/actions';

import DetailAlert from '../notice/detail_alert';
import DetailNotice from '../notice/detail_notice';

interface Notice {
  idx: number;
  content: string;
  title: string;
  createdAt: string;
}

const Alert: React.FC = () => {
  const dispatch = useDispatch()
  const [noticeList,setNoticeList] =useState<Notice[]>([]);
  const [page,setPage] = useState<Number>(0)

  useEffect(()=>{
    // 모달창이 열렸다면 공지사항 데이터 불러오기
    axios({
      method:'get',
      url:'https://i9b206.p.ssafy.io:9090/notice/list/easy',
    })
    .then(res => {
      // console.log(res.data)
      setNoticeList(res.data.list);
    })
    .catch(err => {
      console.log(err)
    })
  })
  const backpage = () => {
    setPage(0)
  }
  return (
    <div className={alert_css.modal_overlay} onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => 
      {if (e.target === e.currentTarget) {dispatch(setModal(null))}}} >
        {page===0 ? 
          <div className={alert_css.alert_modal}>
          <p className={alert_css.closebtn} onClick={() => {dispatch(setModal(null))}}>닫기</p>
          <div>
            <h1 style={{margin:'-20px 0 20px 0'}}>공지사항 / 알림</h1>
              <div className={alert_css.container}>
                <div className={alert_css.notice}>
                  <p>공지사항</p>
                  <p className={alert_css.movebtn} onClick={() => {dispatch(setModal('공지전체'))}}>전체보기</p>
                </div>
                {noticeList.map((notice: Notice, index: number) => {
                  const date = new Date(notice.createdAt);
                  return (
                    <div onClick={() =>setPage(1)} className={alert_css.notice}>
                      <span>{index}</span>
                      <span>{notice.title}</span>
                      <span>{date.getMonth() + 1}/{date.getDate()} {date.getHours()}:{date.getMinutes()}</span>
                    </div>
                    );})}
              </div>
              <br />
              <div className={alert_css.container}>
                <div className={alert_css.notice}>
                  <p>알림 </p>
                  <p className={alert_css.movebtn} onClick={() => {dispatch(setModal('알림전체'))}}>전체보기</p>
                </div>
                <div onClick={() =>setPage(2)} className={alert_css.notice}>
                  <span>1</span>
                  <span>Title</span>
                  <span>07/19 00:00</span>
                </div>
              </div>
          </div>
        </div>
      :page === 1 ? <DetailNotice backpage={backpage} /> :<DetailAlert backpage={backpage} />}
    </div>
  );
};

export default Alert;