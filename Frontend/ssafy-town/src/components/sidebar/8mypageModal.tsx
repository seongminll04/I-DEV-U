import React, { useState } from 'react';
import mypage_modal_css from './8mypageModal.module.css';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {email: string;
    password: string;
    name: string;
    nickname: string;
    birthdate: string;
    gender: number;
    intro: string; // 자기소개
    status: string; // active or not (회원탈퇴여부)
    grade: number; // 1 : 관리자(운영자), 2 : 일반}  
  };
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, user}) => {
  const [chknickname, setchknickname] = useState('no');
  console.log(user.email)
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

  const goWithdrawal = () => {
    // 회원탈퇴 버튼 누르면 실행
    console.log("회원탈퇴 버튼 누름");
    // axios({
    //   method: 'put',
    //   url: 'http://localhost:8080/notice/?~~~~~',
    // })
    // .then(() => {
    //   console.log("탈퇴처리 되었습니다.")
    // })
    // .catch(err => {
    //   console.log(err)
    //   console.log("탈퇴처리 중 오류가 발생함")
    // })
  }  

  const nicknamecheck = (nickname:string) => {
    
    if (nickname==='') {
      alert('닉네임을 입력해주세요.')
    }

    else if (!formik.errors.nickname) {
      axios({
        method:'get',
        url:`http://localhost:8080/user/signup/nickcheck/${nickname}`
      })
      .then(()=>{
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
      email: user.email,
      nickname: user.nickname,
      name: user.name,
      birthday: user.birthdate,
      gender: user.gender,
      password: user.password,
      confirmPassword: '',
      intro: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert("변경 완료")
      console.log(values);
      // Add signup logic here
    },
  });
  
  if (!isOpen) return null;
  
  return (
    <div className={mypage_modal_css.mypage_modal_overlay}  onClick={(e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {onClose()}}}>
        <div className={mypage_modal_css.mypage_alert_modal}>
          <p className={mypage_modal_css.mypage_closeBtn} onClick={onClose}>닫기</p>
          <h1>회원정보 수정</h1>
          <hr/>
          <form id={mypage_modal_css.mypage_form} onSubmit={formik.handleSubmit}>
            <div className={mypage_modal_css.mypage_info}>
              <span>이름</span>
            </div>
            <input id="name" type="text" className={mypage_modal_css.mypage_input} {...formik.getFieldProps('name')} readOnly/>
            <div className={mypage_modal_css.mypage_info}>
              <span>이메일</span>
            </div>
            <input type="text" className={mypage_modal_css.mypage_input} {...formik.getFieldProps('email')} readOnly/>
            <div className={mypage_modal_css.mypage_info}>
              <span>생년월일</span>
            </div>
            <input type="text" className={mypage_modal_css.mypage_input} {...formik.getFieldProps('birthday')} readOnly/>
            <div className={mypage_modal_css.mypage_info}>
              <span>성별</span>
            </div>
            <input type="text" className={mypage_modal_css.mypage_input} {...formik.getFieldProps('gender')} readOnly/>
            <div className={mypage_modal_css.mypage_info}>
              <span>닉네임</span>
            </div>
            <div className={mypage_modal_css.mypage_nickname}>
              <input style={{width:'82%'}} type="text" className={mypage_modal_css.mypage_input} {...formik.getFieldProps('nickname')}  onChange={(event) => {formik.handleChange(event); setchknickname('no'); console.log(chknickname)}} />
              <div className={mypage_modal_css.mypage_check_nickname_btn} onClick={()=>nicknamecheck(formik.values.nickname)}>중복확인</div>
            </div>
            <div className={mypage_modal_css.mypage_info}>
              <span>자기소개</span>
            </div>
            <input type="text" className={mypage_modal_css.mypage_input} {...formik.getFieldProps('intro')}/>
            <div className={mypage_modal_css.mypage_info}>
              <span>비밀번호</span>
            </div>
            <input type="password" className={mypage_modal_css.mypage_input} {...formik.getFieldProps('password')} />
            <div className={mypage_modal_css.mypage_info}>
              <span>비밀번호 확인</span>
            </div>
            <input type="password" className={mypage_modal_css.mypage_input} {...formik.getFieldProps('confirmPassword')} placeholder="비밀번호 확인"/>
            <div className={mypage_modal_css.mypage_info}>
              <span>사진</span>
            </div>
            <input type="file" className={mypage_modal_css.mypage_input}/>
            <button className={mypage_modal_css.mypage_button} type="submit" disabled={chknickname==='no' ||!formik.isValid || formik.isSubmitting}>수정</button>
          </form>
          <p className={mypage_modal_css.mypage_withdrawal} onClick={goWithdrawal}>회원탈퇴</p>
        </div>
    </div>
  );
};

export default Modal;