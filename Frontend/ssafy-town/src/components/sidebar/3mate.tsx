import React from 'react';
import mate_css from './3mate.module.css'

import { useDispatch } from 'react-redux';
import { setModal } from '../../store/actions';


const Mate: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <div className='sidebar_modal'>
          <h1>동료찾기</h1>
          <button className={mate_css.button} onClick={()=>dispatch(setModal('동료찾기필터'))}>필터</button>
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
    </div>
  );
};

export default Mate;
