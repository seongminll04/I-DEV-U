import React from 'react';
import edit_css from './edit.module.css';
import axiosInstance from '../../interceptors'; // axios 인스턴스 가져오기
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
  };
}

const ChangePass: React.FC<Props> = ({ user }) => {
  const dispatch = useDispatch()
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, '8~14 자리, 특수문자 사용불가')
      .max(14, '8~14 자리, 특수문자 사용불가')
      .matches(/^[A-Za-z0-9]+$/, '8~14 자리, 특수문자 사용불가')
      .required('비밀번호를 입력해주세요'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password') as any, null], '비밀번호가 일치하지 않음')
      .required('비밀번호를 확인해주세요'),
  });


  const formik = useFormik({
    initialValues: {
      userIdx: localStorage.getItem("userIdx"),
      password: '',
      confirmPassword: '',

    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      const userToken = localStorage.getItem('userToken');
      axiosInstance({
        method: 'put',
        url: 'https://i9b206.p.ssafy.io:9090/user/changePw',
        headers: {
          Authorization: 'Bearer ' + userToken,
        },
        data: values,
      })
        .then(res => {
          console.log(res);
          alert("회원정보 변경 완료");
          dispatch(setModal(null));
        })
        .catch(err => {
          console.log(err)
          alert("회원정보 변경 실패")
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
      <div className={edit_css.alert_modal}>
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
              dispatch(setModal(null))
            }}
          >
            닫기
          </span>
        </div>
        <h1>비밀번호 변경</h1>

        <form id={edit_css.mypage_form} className={edit_css.passform} onSubmit={formik.handleSubmit}>
          <div className={edit_css.mypage_info}>

            <label className={edit_css.split}>변경할 비밀번호
              <span style={{ color: 'red' }}>{formik.values.password === '' ? '비밀번호를 입력해주세요' : formik.errors.password ? formik.errors.password : <span style={{ color: 'green' }}>완료</span>}</span>
            </label>
          </div>
          <input type="password" className={edit_css.mypage_input} {...formik.getFieldProps('password')} onKeyDown={handlekeydown} />
          <div className={edit_css.mypage_info}>

            <label className={edit_css.split}>변경할 비밀번호 확인
              <span style={{ color: 'red' }}>{formik.values.confirmPassword === '' ? '비밀번호를 입력해주세요' : formik.errors.confirmPassword ? formik.errors.confirmPassword : <span style={{ color: 'green' }}>완료</span>}</span>
            </label>
          </div>
          <input type="password" className={edit_css.mypage_input} {...formik.getFieldProps('confirmPassword')} placeholder="비밀번호 확인" onKeyDown={handlekeydown} />
          <button className={edit_css.mypage_button} style={{ height: '40%', borderRadius: '1rem', width: '40%' }} type="submit" disabled={!formik.isValid || formik.isSubmitting}>수정</button>
        </form>
      </div>
    </div>
  );
};

export default ChangePass;