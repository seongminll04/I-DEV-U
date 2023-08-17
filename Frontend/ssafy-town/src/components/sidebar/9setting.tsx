import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { setModal } from '../../store/actions';
import axiosInstance from '../../interceptors';
import setting_css from './9setting.module.css';

const Setting: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const dispatch = useDispatch()
  const userIdx=localStorage.getItem('userIdx')
  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    const userIdxStr = localStorage.getItem('userIdx')
    var userIdx: number | null;
    if (userIdxStr) { userIdx = parseInt(userIdxStr, 10) } else { userIdx = null }
    axiosInstance({
      method: 'get',
      url: `https://i9b206.p.ssafy.io:9090/user/admin/${userIdx}`,
      headers: {
        Authorization: 'Bearer ' + userToken
      }
    }).then(() => {
      console.log("관리자셔유")
      setIsAdmin(true);
    }).catch((err) => {
      console.log("댁은 관리자가 아녀유")
    })
  }, [])
  return (
    <div className='sidebar_modal'>
      <h1>Setting</h1>
      <br /><br />
      <button className={setting_css.button} onClick={()=>dispatch(setModal('문의'))}>1 : 1 문의</button>
      <br /><br />
      {/* {isAdmin && (
        <div>
          <button className={setting_css.button2} onClick={()=>dispatch(setModal('문의목록'))}>1 : 1 문의사항 목록조회</button>
        </div>
      )} */}
      <button className={setting_css.button} style={{display: isAdmin? 'block' : "none"}} onClick={()=>dispatch(setModal('문의목록'))}>1 : 1 문의사항 목록조회</button>

      <hr />
      <h1>방 이동하기(구경)</h1>
      <button className={setting_css.button} onClick={()=>{window.location.href = '/home';}}>마이룸</button>
      <button className={setting_css.button} onClick={()=>{localStorage.setItem('OVsession',`test_${userIdx}`); window.location.href = '/meeting';}}>회의룸</button>
      <button className={setting_css.button} onClick={()=>{localStorage.setItem('OVsession',`test_${userIdx}`); window.location.href = '/love';}}>소개팅룸</button>
      <hr />
    </div>
  );
};

export default Setting;
