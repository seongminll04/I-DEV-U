import React from 'react';

// 모달 리스트
import Alert from '../sidebar/1alert'
import AllNotice from '../notice/all_notice';
import AllAlert from '../notice/all_alert';
import Logout from '../account/logout'
import FirstQA from '../survey/firstQA';
import QnA from '../board/QnA';

import { useSelector } from 'react-redux';
import { AppState } from '../../store/state';


const ModalOpen: React.FC = () => {
  const isModalOpen = useSelector((state: AppState) => state.isModalOpen);//사이드바 오픈여부
  return (
    <>
      { isModalOpen === '최초설문' ? <FirstQA />
      : isModalOpen === '공지알림' ?  <Alert />
      : isModalOpen === '공지전체' ? <AllNotice />
      : isModalOpen === '알림전체' ? <AllAlert />
      : isModalOpen === '로그아웃' ? <Logout />
      : isModalOpen === 'QnA게시판' ? <QnA />
      : null }
    </>
  );
}

export default ModalOpen;
