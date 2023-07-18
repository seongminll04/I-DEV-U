import React from 'react';
import alert_css from './8mypageModal.module.css';
import axios from 'axios';
import mypage_css from './8mypage.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose}) => {
  
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, '8~14 자리, 특수문자 사용불가')
      .max(14, '8~14 자리, 특수문자 사용불가')
      .required('비밀번호를 입력해주세요.'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password') as any, null], '비밀번호가 일치하지 않습니다.')
      .required('비밀번호를 입력해주세요.'),
    // nickname: Yup.string()
    //   .min(2, '2~12 자리, 특수문자 사용불가')
    //   .max(12, '2~12 자리, 특수문자 사용불가')
    //   .required('닉네임을 입력해주세요.'),
  });

    // user from databse;
    const user = {
      email: "aaa@bbb.com",
      password: "aaaaaaaaaa",
      name: "lee",
      nickname: "leek",
      birthdate: "1999-99-99",
      gender: "1",
      intro: "", // 자기소개
      status: "", // active or not (회원탈퇴여부)
      grade: 2, // 1 : 관리자(운영자), 2 : 일반
    };

  const formik = useFormik({
    initialValues: {
      email: user.email,
      nickname: user.nickname,
      name: user.name,
      birthday: user.birthdate,
      gender: user.gender,
      password: user.password,
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert("변경 완료")
      console.log(values);
      // Add signup logic here
    },
  });

  if (!isOpen) return null;
  
  // 모달창이 열렸다면 현재 접속중인 유저 데이터 불러오기
  // else {
  //   axios({
  //     method:'get',
  //     url:'http://localhost:8080/notice/?~~~~~',
  //   })
  //   .then(res => {
  //     console.log(res)
  //     // const alert_data=res.data 
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
  // }

  return (
    <div className={alert_css.modal_overlay}  onClick={(e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {onClose()}}}>
        <div className={alert_css.alert_modal}>
          <p className={alert_css.closebtn} onClick={onClose}>닫기</p>
          <h1>공지사항</h1>
          <hr/>
          <form id="mypage-form" onSubmit={formik.handleSubmit}>
            <div className={mypage_css.mypage_info}>
              <span>이름 : </span>
              <input id="name" type="text" className={mypage_css.input} {...formik.getFieldProps('name')} readOnly/>
            </div>
            <div className={mypage_css.mypage_info}>
              <span>이메일 : </span>
              <input type="text" className={mypage_css.input} {...formik.getFieldProps('email')} readOnly/>
            </div>
            <div className={mypage_css.mypage_info}>
              <span>생년월일 : </span>
              <input type="text" className={mypage_css.input} {...formik.getFieldProps('birthday')} readOnly/>
            </div>
            <div className={mypage_css.mypage_info}>
              <span>성별 : </span>
              <input type="text" className={mypage_css.input} {...formik.getFieldProps('gender')} readOnly/>
            </div>
            <div className={mypage_css.mypage_info}>
              <span>닉네임 : </span>
              <input type="text" className={mypage_css.input} {...formik.getFieldProps('nickname')} />
            </div>
            <div className={mypage_css.mypage_info}>
              <span>비밀번호 : </span>
              <input type="password" className={mypage_css.input} {...formik.getFieldProps('password')} />
            </div>
            <div className={mypage_css.mypage_info}>
              <label htmlFor="confirmPassword">비밀번호 확인 : </label>
              <input id="confirmPassword" type="password" className={mypage_css.input} {...formik.getFieldProps('confirmPassword')} placeholder="비밀번호 확인"/>
            </div>
            {/*사진 :  <input type="file" className={mypage_css.input}/> */}
            <button className={mypage_css.button} type="submit" disabled={!formik.isValid || formik.isSubmitting}>수정</button>
          </form>
        </div>
    </div>
  );
};

export default Modal;