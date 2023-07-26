import React,{useEffect} from 'react';

import { useSelector } from 'react-redux';
import { AppState } from '../../store/state';

interface Props {
  closeSidebar:()=>void;
  closeModal:()=>void;
}
const Setting: React.FC<Props> = ({closeSidebar, closeModal}) => {
  const isModalOpen = useSelector((state: AppState) => state.isModalOpen);// 모달창 오픈여부 (알림, 로그아웃)
  useEffect(() => { //esc키로 끄기
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isModalOpen!==null) {closeModal()} else {closeSidebar()}
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen,closeSidebar,closeModal]);

  return (
    <div className='sidebar_modal'>
      Setting
    </div>
  );
};

export default Setting;
