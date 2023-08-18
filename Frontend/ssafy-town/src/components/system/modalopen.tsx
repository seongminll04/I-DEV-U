import React from 'react';

// 모달 리스트
import Alert from '../sidebar/1alert'
import AllNotice from '../notice/all_notice';
import AllAlert from '../notice/all_alert';
import Logout from '../account/logout'
import FirstQA from '../survey/firstQA';
import ReFirstQA from '../survey/RefirstQA';
import QnA from '../board/QnA';

import SogaeFilter from '../filter/sogaeFilter';

import { useSelector } from 'react-redux';
import { AppState } from '../../store/state';
import CheckPass from '../account/checkpass';
import EditSel from '../account/editsel';
import Withdraw from '../account/withdraw';
import Inquiry from '../board/inquiry'
import InquiryList from '../board/all_inquiry'
import GameModal from '../map/gamemodal'

const ModalOpen: React.FC = () => {
  const isModalOpen = useSelector((state: AppState) => state.isModalOpen);//사이드바 오픈여부
  return (
    <div style={{ zIndex: 1000 }}>
      { isModalOpen === '최초설문' ? <FirstQA />
      : isModalOpen === 'Re최초설문' ? <ReFirstQA />
      : isModalOpen === '공지알림' ? <Alert />
      : isModalOpen === '공지전체' ? <AllNotice />
      : isModalOpen === '알림전체' ? <AllAlert />
      : isModalOpen === '로그아웃' ? <Logout />
      : isModalOpen === 'QnA게시판' ? <QnA />
      : isModalOpen === '소개팅필터' ? <SogaeFilter />
      : isModalOpen === '회원정보수정1' ? <CheckPass />
      : isModalOpen === '회원정보수정2' ? <EditSel />
      : isModalOpen === '회원탈퇴' ? <Withdraw />
      : isModalOpen === '문의' ? <Inquiry />
      : isModalOpen === '문의목록' ? <InquiryList />
      : isModalOpen === '게임' ? <GameModal/>
      : null }
    </div>
  );
}

export default ModalOpen;
