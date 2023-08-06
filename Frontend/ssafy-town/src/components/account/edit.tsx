import React, { useState } from 'react';
import edit_css from './edit.module.css';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Withdraw from '../account/withdraw';

import { useDispatch } from 'react-redux';
import { setModal } from '../../store/actions';

interface Props {
  user: {email: string;
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

const EditAccount: React.FC<Props> = ({user}) => {
  const dispatch = useDispatch()
  const [isWithdraw, setWithdraw] = useState(false);
  const [chknickname, setchknickname] = useState('no');

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
    setWithdraw(true)
    // axios({
    //   method: 'put',
    //   url: https://i9b206.p.ssafy.io:9090/notice/?~~~~~',
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
        url:`https://i9b206.p.ssafy.io:9090/user/signUp/nicknameCheck/${nickname}`
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
      userIdx : localStorage.getItem("saveid"),
      email: user.email,
      nickname: user.nickname,
      name: user.name,
      birth: user.birth,
      gender: user.gender,
      password: user.password,
      confirmPassword: '',
      intro: user.intro,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      const userToken = localStorage.getItem('usertoken');
      axios({
        method : 'put',
        url : 'https://i9b206.p.ssafy.io:9090/user/modify',
        headers : {
          Authorization: 'Bearer ' + userToken,
        },
        data : values,
      })
      .then(res => {
        console.log(res);
        alert("회원정보 변경 완료");
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
  const handlekeydown = (event:React.KeyboardEvent<HTMLInputElement>) => {
    const inputElement = event.currentTarget
    const currentCursorPosition = inputElement.selectionStart || 0;
    if (event.key === 'ArrowLeft' && currentCursorPosition!==0) {
      inputElement.setSelectionRange(currentCursorPosition - 1, currentCursorPosition - 1);
    } else if (event.key === 'ArrowRight') {
      inputElement.setSelectionRange(currentCursorPosition + 1, currentCursorPosition + 1);
    } else if (event.key === ' '){
      inputElement.value = inputElement.value.slice(0,currentCursorPosition)+ ' ' +inputElement.value.slice(currentCursorPosition,)
      inputElement.setSelectionRange(currentCursorPosition+1 , currentCursorPosition+1);
    }
  }
  
  return (
    <div className={edit_css.mypage_modal_overlay}  onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {dispatch(setModal(null)); setWithdraw(false);}}}>
        {!isWithdraw ? <div className={edit_css.mypage_alert_modal}>
          <p className={edit_css.mypage_closeBtn} onClick={()=>{dispatch(setModal(null));setWithdraw(false);}}>닫기</p>
          <h1>회원정보 수정</h1>
          <hr/>
          <form id={edit_css.mypage_form} onSubmit={formik.handleSubmit}>
            <div className={edit_css.mypage_info}>
              <span>이름</span>
            </div>
            <input id="name" type="text" className={edit_css.mypage_input} {...formik.getFieldProps('name')} readOnly/>
            <div className={edit_css.mypage_info}>
              <span>이메일</span>
            </div>
            <input type="text" className={edit_css.mypage_input} {...formik.getFieldProps('email')} readOnly/>
            <div className={edit_css.mypage_info}>
              <span>생년월일</span>
            </div>
            <input type="text" className={edit_css.mypage_input} {...formik.getFieldProps('birth')} readOnly/>
            <div className={edit_css.mypage_info}>
              <span>성별</span>
            </div>
            <input type="text" className={edit_css.mypage_input} {...formik.getFieldProps('gender')} readOnly/>
            <div className={edit_css.mypage_info}>
              <span>닉네임</span>
            </div>
            <div className={edit_css.mypage_nickname}>
              <input style={{width:'82%'}} type="text" className={edit_css.mypage_input} {...formik.getFieldProps('nickname')}  onChange={(event) => {formik.handleChange(event); setchknickname('no'); console.log(chknickname)}} 
              onKeyDown={handlekeydown}/>
              <div className={edit_css.mypage_check_nickname_btn} onClick={()=>nicknamecheck(formik.values.nickname)}>중복확인</div>
            </div>
            <div className={edit_css.mypage_info}>
              <span>자기소개</span>
            </div>
            <input type="text" className={edit_css.mypage_input} {...formik.getFieldProps('intro')} onKeyDown={handlekeydown}/>
            <div className={edit_css.mypage_info}>
              <span>비밀번호</span>
            </div>
            <input type="password" className={edit_css.mypage_input} {...formik.getFieldProps('password')} onKeyDown={handlekeydown} />
            <div className={edit_css.mypage_info}>
              <span>비밀번호 확인</span>
            </div>
            <input type="password" className={edit_css.mypage_input} {...formik.getFieldProps('confirmPassword')} placeholder="비밀번호 확인" onKeyDown={handlekeydown}/>
            <div className={edit_css.mypage_info}>
              <span>사진</span>
            </div>
            <input type="file" className={edit_css.mypage_input}/>
            <button className={edit_css.mypage_button} type="submit" disabled={chknickname==='no' ||!formik.isValid || formik.isSubmitting }>수정</button>
          </form>
          <p className={edit_css.mypage_withdrawal} onClick={goWithdrawal}>회원탈퇴</p>
        </div>:
        <div>
          <Withdraw onBack={()=>{setWithdraw(false);}} onClose={()=>{setWithdraw(false);dispatch(setModal(null));}}/>
        </div> }
    </div>
  );
};

export default EditAccount;