import React, { useEffect, useState } from 'react';
import mate_css from './3mate.module.css'

import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/state';
import { setModal } from '../../store/actions';

import axiosInstance from '../../interceptors'; // axios 인스턴스 가져오기
import MateFilter from '../filter/mateFilter';
import MateDetail from '../detail/matedetail';

interface Matep {
  userIdx: number;
  name: string;
  nickname: string;
  percent: number;
  languageList: string[];
  storedFileName: string;
}

interface Filter {
  surveyIdx: number,
  surveyTitle: string,
  tagList: string[],
}

const Mate: React.FC = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state: AppState) => state.isModalOpen);//사이드바 오픈여부
  const [
    matefilter, setMateFilter] = useState<Filter[]>([])
  const [mateIdx, setMateIdx] = useState<number>(0)
  const [matePercent, setMatePercent] = useState<number>(0);
  const [mateList, setMateList] = useState<Matep[]>([]);

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    const userIdxStr = localStorage.getItem('userIdx')
    var userIdx: number | null;
    if (userIdxStr) { userIdx = parseInt(userIdxStr, 10) } else { userIdx = null }
    var tList: string[] = []
    for (const filter of matefilter) {
      tList = [...tList, ...filter.tagList]
    }
    if (tList[0]) {
      axiosInstance({
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
          setMateList(res.data.userList.filter((user: Matep) => user.userIdx !== userIdx));
        })
        .catch(err => console.log(err))
    }
    else {
      axiosInstance({
        method: 'post',
        url: 'https://i9b206.p.ssafy.io:9090/partner/list',
        headers: {
          Authorization: 'Bearer ' + userToken
        },
      })
        .then(res => {
          setMateList(res.data.userList.filter((user: Matep) => user.userIdx !== userIdx));
        })
        .catch(err => console.log(err))
    }
  }, [matefilter])

  return (
    <div>
      <div className='sidebar_modal'>
        <h1>동료찾기</h1>
        <button className={mate_css.button} onClick={() => dispatch(setModal('동료찾기필터'))}>필터</button>
        {matefilter[0] ?
          <>
            <div className={mate_css.userattribute}>
              <div className={mate_css.userInfo} style={{ fontSize: 'large', fontWeight: 'bold' }}>유저정보</div>
              <div className={mate_css.matchRate} style={{ fontSize: 'large', fontWeight: 'bold' }}>일치율</div>
            </div>
            <div className={mate_css.scrollbar}>
              {mateList.map((mate: Matep, index: number) => {
                return (
                  <div className={mate_css.usertable} onClick={() => { setMateIdx(mate.userIdx); setMatePercent(mate.percent); dispatch(setModal('동료상세정보')) }}>
                    <div className={mate_css.userInfo}>
                      <div className={mate_css.profile}>
                        <img
                          src={mate.storedFileName ? mate.storedFileName : "assets/default_profile.png"}
                          alt=""
                          style={{ borderRadius: "50%" }}
                        />
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
          </>

          :
          <>
            <p>일치율을 확인하시려면 필터를 선택해주세요</p>
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
                        <img
                          src={mate.storedFileName ? mate.storedFileName : "assets/default_profile.png"}
                          alt=""
                          style={{ borderRadius: "50%" }}
                        />
                        <div className={mate_css.profiledata}>
                          <b>{mate.nickname}</b>
                          {mate.languageList.map((lang: string) => {
                            return (<p style={{ color: 'gray', marginTop: '5px', marginBottom: '0', overflow:'hidden' }}>
                              #{lang} </p>)
                          })}
                        </div>
                      </div>
                    </div>
                    <div className={mate_css.matchRate}>X</div>
                  </div>
                )
              })}
              {/* <p>-마지막입니다-</p> */}
            </div>
          </>

        }
      </div>
      {isModalOpen === '동료찾기필터' ? <MateFilter filter={matefilter} onfilter={(value: Filter[]) => setMateFilter(value)} />
        : isModalOpen === '동료상세정보' ? <MateDetail userIdx={mateIdx} percent={matefilter[0] ? matePercent:-1} />
          : null}
    </div>
  );
};

export default Mate;
