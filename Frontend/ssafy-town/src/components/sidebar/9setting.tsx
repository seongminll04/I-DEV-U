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
      <hr style={{border:'1px solid black', width:'90%'}}/>
      <h2>관리자에게 문의하기</h2>
      <button style={{width:'200px', height:'100px', borderRadius:'0.8rem',cursor:'pointer',fontSize:'18px', color:'red',}}  onClick={()=>dispatch(setModal('문의'))}>1 : 1 문의</button>
      <br /><br />
      {/* <button style={{width:'200px', height:'100px', borderRadius:'0.8rem',cursor:'pointer',fontSize:'18px', color:'red',}}  onClick={()=>dispatch(setModal('문의'))}>1 : 1 문의</button> */}
      {isAdmin && (
        <div className="aaa">
          <button className={"aaa"} onClick={()=>dispatch(setModal('문의목록'))}>1 : 1 문의사항 목록조회</button>
        </div>
      )} */}
      <button className={setting_css.button} style={{display: isAdmin? 'block' : "none"}} onClick={()=>dispatch(setModal('문의목록'))}>1 : 1 문의사항 목록조회</button>

      <hr />
      <div style={{height:'250px'}}></div>
      <hr style={{border:'1px solid black', width:'90%'}}/>
      <h2>방 이동하기</h2>
      <p>*맵 구경을 위한 이동*
        <br />(실제 화상기능은 작동하지 않습니다)</p>
      <div>
        <button style={{margin:'8px', width:'100px', height:'50px', borderRadius:'0.8rem',cursor:'pointer'}} onClick={()=>{window.location.href = '/home';}}>마이룸</button>
        <button style={{margin:'8px', width:'100px', height:'50px', borderRadius:'0.8rem',cursor:'pointer'}} onClick={()=>{localStorage.setItem('OVsession',`test_${userIdx}`); window.location.href = '/meeting';}}>회의룸</button>
        <button style={{margin:'8px', width:'100px', height:'50px', borderRadius:'0.8rem',cursor:'pointer'}} onClick={()=>{localStorage.setItem('OVsession',`test_${userIdx}`); window.location.href = '/love';}}>소개팅룸</button>
      </div>
      <hr />
    </div>
  );
};

export default Setting;
