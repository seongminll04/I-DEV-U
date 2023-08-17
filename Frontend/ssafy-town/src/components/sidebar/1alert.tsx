import React, { useState, useEffect } from 'react';
import alert_css from './1alert.module.css';
import axiosInstance from '../../interceptors'; // axios 인스턴스 가져오기

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

interface AlertProps {
  idx: number;
  createdAt: string;
  type: string;
  fromUser: {
    idx: number,
    nickname: string,
    basicAnswerList: {
      surveyIdx: number,
      tag: string,
    }[]
    gender: string,
    intro: string | null,
    storedFileName: string,
  },
  toUser: {
    idx: number,
    nickname: string,
  },
  targetIdx: number | null,
  comment: string | null
}

const Alert: React.FC = () => {
  const dispatch = useDispatch()
  const [noticeList, setNoticeList] = useState<Notice[]>([]);
  const [alertList, setAlertList] = useState<AlertProps[]>([]);
  const [page, setPage] = useState<Number>(0)
  const [noticeIdx, setNoticeIdx] = useState<number>(0);
  const [Selalert, setSelAlert] = useState<AlertProps>();

  const stompClientRef = React.useRef<Client | null>(null);
  stompClientRef.current = useSelector((state: AppState) => state.stompClientRef)

  useEffect(() => {
    // 모달창이 열렸다면 공지사항 데이터 불러오기
    const userToken = localStorage.getItem('userToken')
    axiosInstance({
      method: 'get',
      url: 'https://i9b206.p.ssafy.io:9090/notice/list/top',
      headers: {
        Authorization: 'Bearer ' + userToken
      },
    })
      .then(res => {
        setNoticeList(res.data.list);
      })
      .catch(err => {
        console.log(err)
      })
  }, [page])

  useEffect(() => {
    // 모달창이 열렸다면 읽지 않은 알림 데이터 불러오기
    const userIdxStr = localStorage.getItem('userIdx')
    const userIdx = userIdxStr ? parseInt(userIdxStr, 10) : null
    const userToken = localStorage.getItem('userToken')
    axiosInstance({
      method: 'get',
      url: `https://i9b206.p.ssafy.io:9090/alarm/from/${userIdx}`,
      headers: {
        Authorization: 'Bearer ' + userToken
      },
    })
      .then(res => {
        console.log(res.data.data)
        if (res.data.data && res.data.data.length > 4) {
          setAlertList(res.data.data.slice(0, 4));
        }
        else {
          setAlertList(res.data.data);
        }
      })
      .catch(err => {
        console.log(err)
      })
  }, [page])
  const backpage = () => {
    setPage(0)
  }
  return (
    <div className={alert_css.modal_overlay} onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => { if (e.target === e.currentTarget) { dispatch(setModal(null)) } }} >
      {page === 0 ?
        <div className={alert_css.alert_modal}>
          <p className={alert_css.closebtn} onClick={() => { dispatch(setModal(null)) }}>닫기</p>
          <div>
            <h1 style={{ margin: '-20px 0 20px 0' }}>공지사항 / 알림</h1>
            <div className={alert_css.container}>
              <div className={alert_css.noticetype}>
                <p>공지사항</p>
                <p className={alert_css.movebtn} onClick={() => { dispatch(setModal('공지전체')) }}>전체보기</p>
              </div>
              {noticeList.map((notice: Notice, index: number) => {
                const date = new Date(notice.createdAt);
                return (
                  <div onClick={() => { setPage(1); setNoticeIdx(notice.idx) }} className={alert_css.notice}>
                    <span>{notice.idx}</span>
                    <span>{notice.title}</span>
                    <span>{date.getMonth() + 1}/{date.getDate()} {date.getHours()}:{date.getMinutes()}</span>
                    {/* <span>{date.getMonth() + 1}/{date.getDate()}</span> */}
                  </div>
                );
              })}
            </div>
            <br />
            <div className={alert_css.container}>
              <div className={alert_css.noticetype}>
                <p>알림 </p>
                <p className={alert_css.movebtn} onClick={() => { dispatch(setModal('알림전체')) }}>전체보기</p>
              </div>
              {alertList.length > 0 ?
                <div>
                  {alertList.map((alert: AlertProps, index: number) => {
                    const date = new Date(alert.createdAt);
                    const month = (date.getMonth() + 1).toString().padStart(2, '0');
                    const day = date.getDate().toString().padStart(2, '0');
                    const hours = date.getHours().toString().padStart(2, '0');
                    const minutes = date.getMinutes().toString().padStart(2, '0');

                    return (
                      <div key={index} onClick={() => { setPage(2); setSelAlert(alert) }} className={alert_css.notice}>
                        <span>{index + 1}</span>
                        <span>
                          {alert.type === 'PROJECT' ? `${alert.fromUser.nickname}님의 프로젝트 가입신청입니다`
                            : alert.type === 'CHAT' ? `${alert.fromUser.nickname}님의 채팅신청입니다`
                              : alert.type === 'SOGAE' ? `${alert.fromUser.nickname}님의 소개팅신청입니다`
                                : alert.type === 'MATE' ? `${alert.fromUser.nickname}님의 동료신청입니다` : null}
                        </span>
                        <span>{month}/{day} {hours}:{minutes}</span>

                      </div>
                    );
                  })}
                </div>
                :
                null
              }
            </div>
          </div>
        </div>
        : page === 1 ? <DetailNotice backpage={backpage} noticeIdx={noticeIdx} /> : <DetailAlert backpage={backpage} Selalert={Selalert!} />}
    </div>
  );
};

export default Alert;