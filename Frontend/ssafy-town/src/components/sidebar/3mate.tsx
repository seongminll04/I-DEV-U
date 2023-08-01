import React from 'react';
import mate_css from './3mate.module.css'

import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../store/state';
import { setModal } from '../../store/actions';

import MateFilter from '../filter/mateFilter';

// import styled from 'styled-components';

// const ToggleContainer = styled.div`
//   position: relative;
//   cursor: pointer;
//   margin : 0 10px;
//   > .toggle-container {

//     width: 40px;
//     height: 20px;
//     border-radius: 30px;
//     background-color: rgb(233,233,234);}
//     //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
//   > .toggle--checked {
//     background-color: rgb(109, 206, 245);
//     transition : 0.5s
//   }

//   > .toggle-circle {
//     position: absolute;
//     top: 1px;
//     left: 1px;
//     width: 18px;
//     height: 18px;
//     border-radius: 50%;
//     background-color: rgb(255,254,255);
//     transition : 0.5s
//     //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
//   } >.toggle--checked {
//     left: 20px;
//     transition : 0.5s
//   }
// `;

const Mate: React.FC = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state: AppState) => state.isModalOpen);// 모달창 오픈여부 (알림, 로그아웃)
  // const [isOn, setisOn] = useState(true);


  // const toggleHandler = () => {
  //   // isOn의 상태를 변경하는 메소드를 구현
  //   setisOn(!isOn)
  // };
  return (
    <div>
      <div className='sidebar_modal'>
          <h1>동료찾기</h1>
          {/* <p style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'0', fontSize:'small'}}>내 정보 검색허용 
            <ToggleContainer onClick={toggleHandler}>
              <div className={`toggle-container ${isOn ? "toggle--checked" : null}`}/>
              <div style={{display:'flex',justifyContent:'center',alignItems:'center', fontSize:'small'}} className={`toggle-circle ${isOn ? "toggle--checked" : null}`}>
                {isOn ? 'On':'Off'}</div>
            </ToggleContainer>
          </p> */}
          <div style={{display:'flex', width:'85%'}}>
            <button className={mate_css.button} onClick={()=>dispatch(setModal('동료찾기필터'))}>필터</button>
            <button className={mate_css.button}>검색</button>
          </div>
          <div className={mate_css.userattribute}>
            <div className={mate_css.userInfo} style={{fontSize:'large', fontWeight:'bold'}}>유저정보</div>
            <div className={mate_css.matchRate} style={{fontSize:'large', fontWeight:'bold'}}>일치율</div>
          </div>
          <div className={mate_css.scrollbar}>

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
            <p>-더 업슴-</p>
          </div>
              {/* {getCurrentPageData().map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.matchRate}%</td>
                </tr>
              ))} */}
      </div>
      {isModalOpen==='동료찾기필터' ? <MateFilter />:null}
    </div>
  );
};

export default Mate;
