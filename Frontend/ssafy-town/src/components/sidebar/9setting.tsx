import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { setModal } from '../../store/actions';
import axiosInstance from '../../interceptors';


const Setting: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const dispatch = useDispatch()
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
      <button onClick={()=>dispatch(setModal('문의'))}>1 : 1 문의</button>
      <br /><br />
      {isAdmin && (
        <div className="aaa">
          <button className={"aaa"} onClick={()=>dispatch(setModal('문의목록'))}>1 : 1 문의사항 목록조회</button>
        </div>
      )}
      <hr />
      <h1>방 이동하기</h1>
      <p>로컬용</p>
      <button onClick={()=>{window.location.href = 'http://localhost:3000/home';}}>마이룸</button>
      <button onClick={()=>{window.location.href = 'http://localhost:3000/meeting';}}>회의룸</button>
      <button onClick={()=>{window.location.href = 'http://localhost:3000/love';}}>소개팅룸</button>
      <p>서버용</p>
      <button onClick={()=>{window.location.href = 'https://i9b206.p.ssafy.io/home';}}>마이룸</button>
      <button onClick={()=>{window.location.href = 'https://i9b206.p.ssafy.io/meeting';}}>회의룸</button>
      <button onClick={()=>{window.location.href = 'https://i9b206.p.ssafy.io/love';}}>소개팅룸</button>
      {/* <button onClick={()=>{history.pushState()}}>회의룸</button> */}

      <hr />
    </div>
  );
};

export default Setting;
