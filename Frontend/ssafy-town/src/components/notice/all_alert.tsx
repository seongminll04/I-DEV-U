import React, {useState, useEffect } from 'react';
import alert_css from '../sidebar/1alert.module.css';
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { setModal } from '../../store/actions';
import DetailAlert from './detail_alert';

interface Alert {
  idx: number;
  content: string;
  title: string;
  createdAt: string;
}

const AllAlert: React.FC = () => {
  const dispatch = useDispatch()
  const userToken = localStorage.getItem('userToken')
  const [page, setPage] = useState<Number>(0); 
  const [search, setsearch] = useState<string>('');
  const [nowsearch, setnowsearch] = useState<boolean>(false);
  const [alertList,setAlertList] =useState<Alert[]>([{idx:1,content:'test1',title:'asdf',createdAt:'asdf'}]);
  
  useEffect(()=>{
    axios({
      method:'get',
      url:'https://i9b206.p.ssafy.io:9090/~~~~~/',
      headers : {
        Authorization: 'Bearer ' + userToken
      },
    })
    .then(res => {
      console.log(res)
      setAlertList(res.data)
    })
    .catch(err => console.log(err))
  })

  const searchdata = () => {
    setnowsearch(true)
    // 여기서 모든데이터 중 검색어랑 일치하는 것만 리스트화 하는 코드작성
  }
  const backpage = () => {
    setPage(0)
  }
  return (
    <div className={alert_css.modal_overlay} onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => 
        {if (e.target === e.currentTarget) {dispatch(setModal(null))}}} >
            {page===0 ? 
            <div className={alert_css.alert_modal}>
            <p className={alert_css.closebtn} onClick={() => {dispatch(setModal(null))}}>닫기</p>
            <p className={alert_css.backbtn} onClick={() => dispatch(setModal('공지알림')) }>돌아가기</p>
            <div>
                <h1 style={{margin:'-20px 0 20px 0'}}>알림</h1>
                <hr style={{border:'solid 1px gray'}}/>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    {!nowsearch ? <span></span> : <span className={alert_css.movebtn} onClick={()=> {setsearch(''); setnowsearch(false)}}>검색취소</span>}
                    <div>
                        <input type="text" value={search} onChange={(event) => {setsearch(event.target.value);}}/>
                        <button onClick={searchdata}>검색icon</button>
                    </div>
                </div>
                </div>
                <br />
                {alertList.map((alert: Alert, index: number) => {
                  return (
                    <div onClick={()=>setPage(2)} className={alert_css.notice} key={index}>
                      <span>{index+1}</span>
                      <span>{alert.content}</span>
                      <span>{alert.createdAt}</span>
                    </div>
                  )})}      
            </div>
            :  <DetailAlert backpage={backpage} /> }
        </div>
  );
};

export default AllAlert;