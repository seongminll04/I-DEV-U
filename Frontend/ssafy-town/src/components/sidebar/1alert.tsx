import React, {useState, useEffect} from 'react';
import alert_css from './1alert.module.css';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../../store/actions';

import DetailAlert from '../notice/detail_alert';
import DetailNotice from '../notice/detail_notice';
import { Client } from '@stomp/stompjs';
import { AppState } from '../../store/state';

interface Notice {
  idx: number;
  title: string;
  content: string;
  createdAt: string;
}
interface AlertProps{
  idx:number;
  checked:string;
  content:string;
  createdAt:string;
  dataType:string;
  user:Object;
}
const Alert: React.FC = () => {
  const dispatch = useDispatch()
  const [noticeList,setNoticeList] =useState<Notice[]>([]);
  const [alertList,setAlertList] =useState<AlertProps[]>([]);
  const [page,setPage] = useState<Number>(0)

  const stompClientRef = React.useRef<Client | null>(null);
  stompClientRef.current = useSelector((state: AppState) => state.stompClientRef)


  useEffect(()=>{
    // 모달창이 열렸다면 공지사항 데이터 불러오기
    const userToken = localStorage.getItem('userToken')
    const userIdxStr = localStorage.getItem('userIdx')
    const userIdx = userIdxStr ? parseInt(userIdxStr, 10):null
    axios({
      method:'get',
      url:'https://i9b206.p.ssafy.io:9090/notice/list/top',
      headers : {
        Authorization: 'Bearer ' + userToken
      },
    })
    .then(res => {
      setNoticeList(res.data.list);
    })
    .catch(err => {
      console.log(err)
    })
    axios({
      method:'get',
      url:`https://i9b206.p.ssafy.io:9090/noti/list/top/${userIdx}`,
      headers : {
        Authorization: 'Bearer ' + userToken
      },
    })
    .then(res => {
      console.log(res.data.data)
      setAlertList(res.data.data);
    })
    .catch(err => {
      console.log(err)
    })
  },[])
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
                <div className={alert_css.noticetype}>
                  <p>공지사항</p>
                  <p className={alert_css.movebtn} onClick={() => {dispatch(setModal('공지전체'))}}>전체보기</p>
                </div>
                {noticeList.map((notice: Notice, index: number) => {
                  const date = new Date(notice.createdAt);
                  return (
                    <div onClick={() => {setPage(1); localStorage.setItem("noticeIdx", String(notice.idx))}} className={alert_css.notice}>
                      <span>{index+1}</span>
                      <span>{notice.title}</span>
                      <span>{date.getMonth() + 1}/{date.getDate()} {date.getHours()}:{date.getMinutes()}</span>
                      {/* <span>{date.getMonth() + 1}/{date.getDate()}</span> */}
                    </div>
                    );})}
              </div>
              <br />
              <div className={alert_css.container}>
                <div className={alert_css.noticetype}>
                  <p>알림 </p>
                  <p className={alert_css.movebtn} onClick={() => {dispatch(setModal('알림전체'))}}>전체보기</p>
                </div>
                {alertList.map((alert: AlertProps, index: number) => {
                  const date = new Date(alert.createdAt);
                  return (
                    <div key={index} onClick={() => {setPage(2); localStorage.setItem("noticeIdx", String(alert.idx))}} className={alert_css.notice}>
                      <span>{index+1}</span>
                      <span>{alert.content}</span>
                      <span>{date.getMonth() + 1}/{date.getDate()} {date.getHours()}:{date.getMinutes()}</span>
                      {/* <span>{date.getMonth() + 1}/{date.getDate()}</span> */}
                    </div>
                    );})}

              </div>
          </div>
        </div>
      :page === 1 ? <DetailNotice backpage={backpage} /> :<DetailAlert backpage={backpage} />}
    </div>
  );
};

export default Alert;