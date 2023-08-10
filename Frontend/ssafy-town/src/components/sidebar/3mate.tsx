import React, { useEffect, useState } from 'react';
import mate_css from './3mate.module.css'

import { useDispatch } from 'react-redux';
import { setModal } from '../../store/actions';

import axios from 'axios';

interface Matep {
  name: string;
  nickname: string;
  percent: number;
}

const Mate: React.FC = () => {
  const dispatch = useDispatch();
  const userToken = localStorage.getItem('userToken');
  const [mateList, setMateList] = useState<Matep[]>([
    { "name": "김싸피", "nickname": "김김김", "percent": 55 },
    { "name": "이싸피", "nickname": "이이이", "percent": 46 },
    { "name": "박싸피", "nickname": "박박박", "percent": 37 },
    { "name": "최싸피", "nickname": "최최최", "percent": 28 },
  ]);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://i9b206.p.ssafy.io:9090/partner/list',
      headers: {
        Authorization: 'Bearer ' + userToken
      },
    })
      .then(res => {
        console.log(res.data)
        setMateList(res.data.userList);
      })
      .catch(err => console.log(err))
  })

  return (
    <div>
      <div className='sidebar_modal'>
        <h1>동료찾기</h1>
        <button className={mate_css.button} onClick={() => dispatch(setModal('동료찾기필터'))}>필터</button>
        <div className={mate_css.userattribute}>
          <div className={mate_css.userInfo} style={{ fontSize: 'large', fontWeight: 'bold' }}>유저정보</div>
          <div className={mate_css.matchRate} style={{ fontSize: 'large', fontWeight: 'bold' }}>일치율</div>
        </div>
        <div className={mate_css.scrollbar}>
          {mateList.map((mate: Matep, index: number) => {
            return (
              <div className={mate_css.usertable}>
                <div className={mate_css.userInfo}>
                  <div className={mate_css.profile}>
                    <img src="assets/default_profile.png" alt="" />
                    <div className={mate_css.profiledata}>
                      <b>{mate.name}</b>
                    </div>
                  </div>
                </div>
                <div className={mate_css.matchRate}>{mate.percent} %</div>
              </div>
            )
          })}
        </div>

        {/* 
        <div className={mate_css.usertable}>
              <div className={mate_css.userInfo}>
                <div className={mate_css.profile}>
                  <img src="assets/default_profile.png" alt=""/>
                  <div className={mate_css.profiledata}>
                    <b>김싸피</b>
                    <p style={{color:'gray'}}>#Python #Java #JavaScript #React</p>
                  </div>
                </div>
              </div>
              <div className={mate_css.matchRate}>96%</div>
        </div>
        */}
        <p>-더 없음-</p>
      </div>
      {/* {getCurrentPageData().map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.matchRate}%</td>
                </tr>
              ))} */}
    </div>
  );
};

export default Mate;
