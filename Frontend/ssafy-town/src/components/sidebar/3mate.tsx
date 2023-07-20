import React, { useState } from 'react';
import mate_css from './3mate.module.css'
import styled from 'styled-components';

const ToggleContainer = styled.div`
  position: relative;
  cursor: pointer;
  margin : 20px;
  > .toggle-container {

    width: 60px;
    height: 30px;
    border-radius: 30px;
    background-color: rgb(233,233,234);}
    //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
  > .toggle--checked {
    background-color: rgb(109, 206, 245);
    transition : 0.5s
  }

  > .toggle-circle {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background-color: rgb(255,254,255);
    transition : 0.5s
    //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
  } >.toggle--checked {
    left: 31px;
    transition : 0.5s
  }
`;




const Mate = () => {
  const [isOn, setisOn] = useState(true);
  const toggleHandler = () => {
    // isOn의 상태를 변경하는 메소드를 구현
    setisOn(!isOn)
  };
  return (
    <div>
      <div className='sidebar_modal'>
          <h1>너 내 동료가 되라!</h1>
          <img src="assets/onepiece.jpg" alt="" style={{width:'350px', height:'auto'}}/>
          <p style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'0'}}>내 정보 검색허용 
            <ToggleContainer onClick={toggleHandler}>
              <div className={`toggle-container ${isOn ? "toggle--checked" : null}`}/>
              <div style={{display:'flex',justifyContent:'center',alignItems:'center'}} className={`toggle-circle ${isOn ? "toggle--checked" : null}`}>
                {isOn ? 'On':'Off'}</div>
            </ToggleContainer>
          </p>
          <button className={mate_css.button}>필터</button>
          <table className={mate_css.table}>
            <thead>
              <tr>
                <th className={mate_css.userInfo}>유저 정보</th>
                <th className={mate_css.matchRate}>일치율</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                  <td>user.name</td>
                  <td>user.matchRate</td>
              </tr>
              {/* {getCurrentPageData().map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.matchRate}%</td>
                </tr>
              ))} */}
            </tbody>
          </table>
      </div>
    </div>
  );
};

export default Mate;
