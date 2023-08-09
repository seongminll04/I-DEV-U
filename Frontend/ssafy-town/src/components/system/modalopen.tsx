import React from 'react';

// 모달 리스트
import Alert from '../sidebar/1alert'
import AllNotice from '../notice/all_notice';
import AllAlert from '../notice/all_alert';
import Logout from '../account/logout'
import FirstQA from '../survey/firstQA';
import ReFirstQA from '../survey/RefirstQA';
import QnA from '../board/QnA';

import ProjectFilter from '../filter/projectFilter';
import CreateProject from '../board/CreateProject';
import EnterProject from '../board/EnterProject';
import MateFilter from '../filter/mateFilter';
import SogaeFilter from '../filter/sogaeFilter';
import SecondQAModal from '../survey/secondQA';

import { useSelector,useDispatch } from 'react-redux';
import { AppState } from '../../store/state';
import { setModal } from '../../store/actions';
import DetailProject from '../board/DetailProject';
import AlertResponse from '../board/AlertResponse';
import CheckPass from '../account/checkpass';
import EditSel from '../account/editsel';

const ModalOpen: React.FC = () => {
  const dispatch = useDispatch()
  const isModalOpen = useSelector((state: AppState) => state.isModalOpen);//사이드바 오픈여부
  return (
    <>
      { isModalOpen === '최초설문' ? <FirstQA />
      : isModalOpen === 'Re최초설문' ? <ReFirstQA />
      : isModalOpen === '공지알림' ? <Alert />
      : isModalOpen === '공지전체' ? <AllNotice />
      : isModalOpen === '알림전체' ? <AllAlert />
      : isModalOpen === '로그아웃' ? <Logout />
      : isModalOpen === 'QnA게시판' ? <QnA />
      : isModalOpen === '프로젝트필터' ? <ProjectFilter />
      : isModalOpen === '프로젝트생성' ? <CreateProject />
      : isModalOpen === '프로젝트참가신청' ? <EnterProject />
      : isModalOpen === '프로젝트상세정보' ? <DetailProject />
      : isModalOpen === '동료찾기필터' ? <MateFilter />
      : isModalOpen === '소개팅설문' ? <SecondQAModal onClose={()=>dispatch(setModal(null))} onConfirm={()=>{}} />
      : isModalOpen === '소개팅필터' ? <SogaeFilter />
      : isModalOpen === '프로젝트가입알림' ? <AlertResponse />
      : isModalOpen === '회원정보수정1' ? <CheckPass />
      : isModalOpen === '회원정보수정2' ? <EditSel />
      // : isModalOpen === '회원정보수정2' ? <EditSel />
      : null }
    </>
  );
}

export default ModalOpen;
