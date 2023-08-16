import React, {useState} from 'react';
import enter_css from './EnterProject.module.css';

import { useDispatch,useSelector } from 'react-redux';
import { setModal } from '../../store/actions';
import { AppState } from '../../store/state';
import { Client } from '@stomp/stompjs';

type ProjectDataType = {
  "idx": number;
  "title": string;
  "managerIdx": number;
  "nickname": string,
  "totalNum": number;
  "nowNum": number;
  "type": string;
  "languageList": { idx: number, language: string }[];
  "session": string;
  content:string;
};

interface Props {
  selpjt : ProjectDataType;
}

const EnterProject: React.FC<Props> = ({selpjt}) => {
  const dispatch=useDispatch()
  const [inputvalue, setInputValue] = useState('')
  const stompClientRef = React.useRef<Client | null>(null);
  stompClientRef.current = useSelector((state: AppState) => state.stompClientRef)
  
  const enter = () => {
    const userIdxStr = localStorage.getItem('userIdx')
    const userIdx = userIdxStr ? parseInt(userIdxStr, 10):null

    if (userIdx && stompClientRef.current) {
      const now = new Date()
      const data = {
        fromIdx:userIdx,
        type:'PROJECT',
        createdAt:now,
        projectIdx: selpjt.idx,
        comment:inputvalue
      };
      stompClientRef.current.publish({
        destination: `/pub/request/project`,
          body: JSON.stringify(data),
          });
      }
    dispatch(setModal(null))
    alert('참가 신청완료')
  }
  // input 방향키 살리기
  const handlekeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const inputElement = event.currentTarget
    const currentCursorPosition = inputElement.selectionStart || 0;
    if (event.key === 'ArrowLeft' && currentCursorPosition !== 0) {
      inputElement.setSelectionRange(currentCursorPosition - 1, currentCursorPosition - 1);
    } else if (event.key === 'ArrowRight') {
      inputElement.setSelectionRange(currentCursorPosition + 1, currentCursorPosition + 1);
    } else if (event.key === ' ') {
      inputElement.value = inputElement.value.slice(0, currentCursorPosition) + ' ' + inputElement.value.slice(currentCursorPosition,)
      inputElement.setSelectionRange(currentCursorPosition + 1, currentCursorPosition + 1);
    }
  }

  return (
    <div className={enter_css.modal_overlay} onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {dispatch(setModal(null))}}}>
        <div className={enter_css.modal}>
            <h1>프로젝트 : {selpjt.title}</h1>
            <h2>참가신청 하시겠습니까?</h2>
            <p>(선택) 가입 한마디</p>
            <input style={{width:'300px', borderRadius:'0.7rem', padding:'5px'}}
            type="text" value={inputvalue} onChange={(e)=>setInputValue(e.target.value)} onKeyDown={handlekeydown} />
            <br />
            <br />
            <button onClick={enter}>참가</button><button onClick={()=>dispatch(setModal(null))}>취소</button>
        </div>

  </div>
  );
};

export default EnterProject;
