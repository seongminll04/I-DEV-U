import React from 'react';
import logout_css from './logout.module.css';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setModal } from '../../store/actions';

const Modal: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate(); //페이지 이동 navigate
  return (
    <div className={logout_css.modal_overlay} onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {dispatch(setModal(null))}}}>
        <div className={logout_css.logout_modal}>
        <h1>로그아웃 하시겠습니까?</h1>
            <div className={logout_css.button_icon}>
                <button className={logout_css.button} onClick={()=>{localStorage.removeItem('usertoken');navigate('/login');}}>로그아웃</button>
                <button className={logout_css.button} onClick={()=>dispatch(setModal(null))}>뒤로가기</button>
            </div>
        </div>
    </div>
  );
};

export default Modal;