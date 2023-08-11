import React, { useEffect, useState } from 'react';
import mate_css from './3mate.module.css'

import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/state';
import { setModal } from '../../store/actions';

import axios from 'axios';
import MateFilter from '../filter/mateFilter';
import MateDetail from '../detail/matedetail';

interface Matep {
  userIdx: number;
  name: string;
  nickname: string;
  percent: number;
  languageList: string[];
}

interface Filter {
  surveyIdx: number,
  surveyTitle: string,
  tagList: string[],
}

const Mate: React.FC = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state: AppState) => state.isModalOpen);//사이드바 오픈여부
  const [matefilter, setMateFilter] = useState<Filter[]>([])
  const [mateIdx, setMateIdx] = useState<number>(0)
  const [mateList, setMateList] = useState<Matep[]>([
    { userIdx: 0, "name": "김싸피", "nickname": "김김김", "percent": 55, "languageList": [] },
    { userIdx: 1, "name": "이싸피", "nickname": "이이이", "percent": 46, "languageList": [] },
    { userIdx: 2, "name": "박싸피", "nickname": "박박박", "percent": 37, "languageList": [] },
    { userIdx: 3, "name": "최싸피", "nickname": "최최최", "percent": 28, "languageList": [] },
  ]);

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
<<<<<<< HEAD
    const userIdxStr = localStorage.getItem('userIdx')
    const userIdx = userIdxStr ? parseInt(userIdxStr, 10):null
=======
    var tList: string[] = []
    for (const filter of matefilter) {
      tList = [...tList, ...filter.tagList]
    }
    console.log(tList);
>>>>>>> f44196d741f24414f599170dc902a33a09cc005f
    axios({
      method: 'post',
      url: 'https://i9b206.p.ssafy.io:9090/partner/list',
      headers: {
        Authorization: 'Bearer ' + userToken
      },
      data: {
        tagList: tList
      },
    })
      .then(res => {
<<<<<<< HEAD
        setMateList(res.data.userList.filter((user : Matep) =>user.userIdx !== userIdx));
=======
        console.log(res);
        setMateList(res.data.userList);
>>>>>>> f44196d741f24414f599170dc902a33a09cc005f
      })
      .catch(err => console.log(err))
  }, [matefilter])

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
              <div className={mate_css.usertable} onClick={() => { setMateIdx(mate.userIdx); dispatch(setModal('동료상세정보')) }}>
                <div className={mate_css.userInfo}>
                  <div className={mate_css.profile}>
                    <img src="assets/default_profile.png" alt="" />
                    <div className={mate_css.profiledata}>
                      <b>{mate.nickname}</b>
                      {mate.languageList.map((lang: string) => {
                        return (<p style={{ color: 'gray', marginTop: 0, marginBottom: 0 }}>
                          # {lang}
                        </p>)
                      })}
                    </div>
                  </div>
                </div>
                <div className={mate_css.matchRate}>{mate.percent} %</div>
              </div>
            )
          })}
          <p>-더 없음-</p> 
        </div>
      </div>
      {isModalOpen === '동료찾기필터' ? <MateFilter filter={matefilter} onfilter={(value: Filter[]) => setMateFilter(value)} />
        : isModalOpen === '동료상세정보' ? <MateDetail userIdx={mateIdx} />
          : null}
    </div>
  );
};

export default Mate;
