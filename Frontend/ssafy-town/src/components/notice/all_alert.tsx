import React, { useState, useEffect } from 'react';
import alert_css from '../sidebar/1alert.module.css';
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { setModal } from '../../store/actions';
import DetailAlert from './detail_alert';

interface AlertProps {
  idx: number;
  createdAt: string;
  type: string;
  fromUser:{
    idx:number,
    nickname:string,
    basicAnswerList:{
      surveyIdx:number,
      tag:string,
    }[]
    gender:string,
    intro:string|null,
    storedFileName:string,
  },
  toUser:{
    idx:number,
    nickname:string,
  },
  targetIdx:number|null,
  comment:string|null
}

const AllAlert: React.FC = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useState<Number>(0);
  const [search, setsearch] = useState<string>('');
  const [nowsearch, setnowsearch] = useState<boolean>(false);
  const [alertList, setAlertList] = useState<AlertProps[]>([]);
  const [Selalert, setSelAlert] = useState<AlertProps>();

  const [maxpage, setMaxpage] = useState<number>(0);
  const [pagination, setPagination] = useState<number>(0);


  useEffect(() => {
    const userToken = localStorage.getItem('userToken')
    const userIdxStr = localStorage.getItem('userIdx')
    const userIdx = userIdxStr ? parseInt(userIdxStr, 10) : null
    axios({
      method: 'get',
      url: `https://i9b206.p.ssafy.io:9090/alarm/from/${userIdx}`,
      headers: {
        Authorization: 'Bearer ' + userToken
      },
    })
      .then(res => {
        console.log(res)
        setAlertList(res.data.data);
        setMaxpage(Math.ceil(res.data.data.length/10)|0)
      })
      .catch(err => {
        console.log(err)
      })
  },[page])

  const searchdata = () => {
    setnowsearch(true)
    // 여기서 모든데이터 중 검색어랑 일치하는 것만 리스트화 하는 코드작성
  }
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
            <h1 style={{ margin: '-20px 0 20px 0' }}>알림</h1>
            <hr style={{ border: 'solid 1px gray' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {!nowsearch ? <span></span> : <span className={alert_css.movebtn} onClick={() => { setsearch(''); setnowsearch(false) }}>검색취소</span>}
              <div>
                <input type="text" value={search} onChange={(event) => { setsearch(event.target.value); }} />
                <button onClick={searchdata}>검색icon</button>
              </div>
            </div>
          </div>
          <br />
          {alertList.length > 0 ? 
            <div>
            {alertList.map((alert: AlertProps, index: number) => {
            return (
              <div>
              {index < pagination*10 + 10  && index >= pagination*10 ?
              <div onClick={() => { setPage(2); setSelAlert(alert) }} className={alert_css.notice} key={index}>
                <span>{index+1}</span>
                <span>
                  { alert.type==='PROJECT' ? `${alert.fromUser.nickname}님의 프로젝트 가입신청입니다`
                    : alert.type==='CHAT' ? `${alert.fromUser.nickname}님의 채팅신청입니다`
                    : alert.type==='MATE' ? `${alert.fromUser.nickname}님의 동료신청입니다` :null }
                </span>
                <span>{alert.createdAt}</span>
              </div> : null}
            </div>
            )
          })}
            </div>
          
          
          : <h2>알림이 없습니다.</h2> }

          {maxpage===0 ?
          null
          :
          <div>
          <button onClick={()=>{if(pagination+1===1){alert('첫 페이지입니다')} else{setPagination(pagination-1)}}}>이전 페이지</button>
          <span>   {maxpage===0 ? pagination: pagination+1} / {maxpage}   </span>
          <button onClick={()=>{if(pagination+1===maxpage){alert('마지막 페이지입니다')} else{setPagination(pagination+1)}}}>다음 페이지</button>
        </div>}
          
        </div>
        : <DetailAlert backpage={backpage} Selalert={Selalert!} />}
    </div>
  );
};

export default AllAlert;