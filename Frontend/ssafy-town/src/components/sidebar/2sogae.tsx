import React, { useState, useEffect } from 'react';
import sogae_css from './2sogae.module.css';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../../store/actions';
import { AppState } from '../../store/state';
import SecondQAModal from '../survey/secondQA';
import SogaeDetail from '../detail/sogaedetail';

type User = {
  userIdx:number,
  nickname: string;
  face:string;
  age: number;
  percent:number;
};

const Sogae: React.FC = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state: AppState) => state.isModalOpen);//사이드바 오픈여부

  const [userdetail,setUserDetail]=useState<number>(0);
  // const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [survey,setServey]=useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([
    { userIdx:1, nickname: "홍길동1", face:'고양이상', age:25 ,percent: 95 },])
    // { name: "홍길동2", matchRate: 90 },
    // { name: "홍길동3", matchRate: 87 },
    // { name: "홍길동4", matchRate: 89 },
    // { name: "홍길동5", matchRate: 91 },
    // { name: "홍길동6", matchRate: 85 },
    // { name: "홍길동7", matchRate: 88 },
    // { name: "홍길동8", matchRate: 92 },
    // { name: "홍길동9", matchRate: 90 },
    // { name: "홍길동10", matchRate: 94 },
    // { name: "홍길동11", matchRate: 93 }
  // ])
  // .sort((a, b) => b.matchRate - a.matchRate));

  useEffect(() => {
    const userToken = localStorage.getItem('userToken')
    const userIdxStr = localStorage.getItem('userIdx')
    const userIdx = userIdxStr ? parseInt(userIdxStr, 10):null
    // 소개팅 설문 여부 체크
    axios({
      method:'get',
      url:`https://i9b206.p.ssafy.io:9090/date/survey/${userIdx}`,
      headers : {
        Authorization: 'Bearer ' + userToken
      },
    })
    .then(res => {
      if (res.data.resmsg==='설문 했음') {
        setServey(true)
      }
    })
    .catch(err => console.log(err))

  }, []);

  useEffect(()=>{
    const userToken = localStorage.getItem('userToken')
    // 필터에 해당하는 유저 리스트
    if (survey) {
      axios({
        method:'get',
        url:'https://i9b206.p.ssafy.io:9090/date/list',
        headers : {
          Authorization: 'Bearer ' + userToken
        },
      })
      .then(res => {
        console.log(res)
        setUsers(res.data.user_list)
      })
      .catch(err => console.log(err))
    }
  },[survey])

  return (
    <div className='sidebar_modal'>
      <h1>if(소개팅) {"{🤍=❤️}"}</h1>
        {!survey ? 
          <>
            <button className={sogae_css.button} onClick={()=>dispatch(setModal('소개팅설문'))}>등록하기</button>
            <div>
              <span className={sogae_css.redText}>소개팅 정보가 등록되어 있지 않습니다.</span><br/>
              <span className={sogae_css.redText}> 추가 사용을 원하시면 정보를 등록하셔야합니다.</span>
              <br/><br/>
            </div>
            <img src="assets/sogae_blur.png" alt="" style={{width:'85%'}}/>
          </>
         : 
          <>
          <div style={{display:'flex', width:'85%'}}>
            <button className={sogae_css.button} onClick={()=>dispatch(setModal('소개팅설문'))}>설문 수정하기</button>
            <button className={sogae_css.button} onClick={()=>dispatch(setModal('소개팅필터'))}>필터</button>
          </div>
          
          <div className={sogae_css.userattribute}>
              <div className={sogae_css.userInfo} style={{fontSize:'large', fontWeight:'bold'}}>유저정보</div>
              <div className={sogae_css.matchRate} style={{fontSize:'large', fontWeight:'bold'}}>일치율</div>
            </div>
          {users.length > 0 ?
          <>
            <div className={sogae_css.scrollbar}>
            {users.map((user, index) => (
              <div className={sogae_css.usertable} key={index} onClick={()=>{setUserDetail(user.userIdx); dispatch(setModal('소개팅상세정보'))}}>
                <div className={sogae_css.userInfo}>
                  <div className={sogae_css.profile}>
                    <img src="assets/default_profile.png" alt=""/>
                    <div className={sogae_css.profiledata}>
                      <b>{user.nickname}</b>
                      <p style={{color:'gray'}}>#{user.age} #{user.face}</p>
                    </div>
                  </div>
                </div>
                <div className={sogae_css.matchRate}>{user.percent}%</div>
              </div>
              ))}
              <p>-더 업슴-</p>
            </div>
            <button className={sogae_css.button}>매칭</button>
            </>
            :
            <div className={sogae_css.scrollbar}>
              <h4 style={{width:'80%', marginLeft:'10%'}}>😢 데이터가 존재하지 않습니다 😢</h4>
            </div>}  
        </>}
        { isModalOpen === '소개팅설문' ? <SecondQAModal survey={survey} onsurvey={(value)=>setServey(value)} />
        : isModalOpen === '소개팅상세정보' ? <SogaeDetail userIdx={userdetail} />
        : null}
      </div>
  
  );
};

export default Sogae;