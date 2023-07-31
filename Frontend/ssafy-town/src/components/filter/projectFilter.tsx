import React from 'react';
import filter_css from './projectFilter.module.css'
import { useDispatch } from 'react-redux';
import { setModal } from '../../store/actions';

const ProjectFilter: React.FC = () => {
  const dispatch = useDispatch()
  return (
    <div className={filter_css.modal_overlay} onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {dispatch(setModal(null))}}}>
        <div className={filter_css.logout_modal}>
        <h1>프로젝트 찾기 필터</h1>
            <div className={filter_css.button_icon}>
              <button className={filter_css.button} onClick={()=>dispatch(setModal(null))}>적용</button>
              <button className={filter_css.button} onClick={()=>dispatch(setModal(null))}>취소</button>
            </div>
        </div>
    </div>
  );
};

export default ProjectFilter;