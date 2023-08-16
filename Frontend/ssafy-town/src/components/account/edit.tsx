import React, { useState } from 'react';
import edit_css from './edit.module.css';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useDispatch } from 'react-redux';
import { setModal } from '../../store/actions';

interface Props {
  user: {
    email: string;
    password: string;
    name: string;
    nickname: string;
    birth: string;
    gender: number;
    intro: string; // 자기소개
    status: string; // active or not (회원탈퇴여부)
    grade: number; // 1 : 관리자(운영자), 2 : 일반}  
    storedFileName : string;
  };
  change: () => void;
}

const EditAccount: React.FC<Props> = ({ user, change }) => {
  const dispatch = useDispatch()
  const [chknickname, setchknickname] = useState('no');

  const validationSchema = Yup.object().shape({
    // nickname: Yup.string()
    //   .min(2, '2~12 자리, 특수문자 사용불가')
    //   .max(12, '2~12 자리, 특수문자 사용불가')
    //   .required('닉네임을 입력해주세요.'),
  });

  const nicknamecheck = (nickname: string) => {

    if (nickname === '') {
      alert('닉네임을 입력해주세요.')
    }

    else if (!formik.errors.nickname) {
      axios({
        method: 'get',
        url: `https://i9b206.p.ssafy.io:9090/user/signUp/nicknameCheck/${nickname}`
      })
        .then(() => {
          setchknickname('yes')
          alert('사용할 수 있는 닉네임입니다.')
          console.log(chknickname)
        })
        .catch(() => {
          alert('중복된 닉네임입니다.')
        })
    }
    else {
      alert('유효하지 않은 닉네임입니다.')
    }
  };

  const formik = useFormik({
    initialValues: {
      userIdx: localStorage.getItem("userIdx"),
      email: user.email,
      nickname: user.nickname,
      name: user.name,
      birth: user.birth,
      gender: user.gender,
      intro: user.intro,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      const userToken = localStorage.getItem('userToken');
      axios({
        method: 'put',
        url: 'https://i9b206.p.ssafy.io:9090/user/modify',
        headers: {
          Authorization: 'Bearer ' + userToken,
        },
        data: values,
      })
        .then(res => {
          console.log(res);
          alert("회원정보 변경 완료");
          change()
          dispatch(setModal(null));
        })
        .catch(err => {
          console.log(err)
          alert("회원정보 변경 실패")
          dispatch(setModal(null));
        })
    }
  });

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
    <div className={edit_css.mypage_modal_overlay} onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) { dispatch(setModal(null)); }
    }}>
      <div className={edit_css.mypage_alert_modal}>
        <div className={edit_css.two_btn}>
          <span
            onClick={() => {
              dispatch(setModal('회원정보수정2'))
            }}
          >
            뒤로가기
          </span>
          <span
            onClick={() => {
              dispatch(setModal(null));
            }}
          >
            닫기
          </span>
        </div>
        <h1>내 정보 수정</h1>
        <hr />
        <form id={edit_css.mypage_form} onSubmit={formik.handleSubmit}>
          <div className={edit_css.mypage_info}>
            <span>이름</span>
          </div>
          <input type="text" className={edit_css.mypage_input} {...formik.getFieldProps('name')} readOnly />
          <div className={edit_css.mypage_info}>
            <span>생년월일</span>
          </div>
          <input type="text" className={edit_css.mypage_input} {...formik.getFieldProps('birth')} readOnly />
          <div className={edit_css.mypage_info}>
            <span>성별</span>
          </div>
          <input type="text" className={edit_css.mypage_input} {...formik.getFieldProps('gender')} readOnly />
          <div className={edit_css.mypage_info}>
            <span>닉네임</span>
          </div>
          <div className={edit_css.mypage_nickname}>
            <input style={{ width: '82%' }} type="text" className={edit_css.mypage_input} {...formik.getFieldProps('nickname')} onChange={(event) => { formik.handleChange(event); setchknickname('no'); }}
              onKeyDown={handlekeydown} />
            <div className={edit_css.mypage_check_nickname_btn} onClick={() => nicknamecheck(formik.values.nickname)}>중복확인</div>
          </div>
          <div className={edit_css.mypage_info}>
            <span>자기소개</span>
          </div>
          <input type="text" className={edit_css.mypage_input} {...formik.getFieldProps('intro')} onKeyDown={handlekeydown} />
          <button className={edit_css.mypage_button} type="submit">수정</button>
        </form>
      </div>
    </div>
  );
};

export default EditAccount;