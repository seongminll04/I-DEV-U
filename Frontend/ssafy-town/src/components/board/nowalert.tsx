import React from 'react';
import QnA_css from './QnA.module.css';


import { useDispatch } from 'react-redux';
import { setModal } from '../../store/actions';

interface Props {
    message:any
}

const NowAlert: React.FC<Props> = ({message}) => {
  const dispatch = useDispatch()

  return (
    <div className={QnA_css.modal_overlay} onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) { dispatch(setModal(null)) }
    }} >
        <div className={QnA_css.QnA_modal}>
            <h1>실시간 알림</h1>
        </div>
 
    </div>
  );
};

export default NowAlert;
