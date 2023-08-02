import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import signup_css from './signup.module.css';
import axios from 'axios';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('유효하지 않은 이메일입니다')
    .max(50, '이메일의 글자 수는 50자 이내로 설정해주세요')
    .required('이메일을 입력해주세요'),
  password: Yup.string()
    .min(8, '8~14 자리, 특수문자 사용불가')
    .max(14, '8~14 자리, 특수문자 사용불가')
    .required('비밀번호를 입력해주세요'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password') as any, null], '비밀번호가 일치하지 않음')
    .required('비밀번호를 확인해주세요'),
  nickname: Yup.string()
    .min(2, '2~12 자리, 특수문자 사용불가')
    .max(12, '2~12 자리, 특수문자 사용불가')
    .required('닉네임을 입력해주세요'),
  name: Yup.string()
    .min(1, '1~12 자리, 특수문자 사용불가')
    .max(12, '1~12 자리, 특수문자 사용불가')
    .matches(/^[가-힣]+$/, '한글로만 작성해주세요')
    .required('이름을 입력해주세요'),
  birthday: Yup.string()
    .matches(/^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, '유효하지 않은 생년월일입니다')
    .required('생년월일을 입력해주세요'),
  gender: Yup.number()
  .required('성별을 선택해주세요')
  .oneOf([1, 2], '유효한 성별을 선택해주세요'),
});


const SignupForm = () => {
  const [chkemail, setchkemail] = useState('no');
  const [chknickname, setchknickname] = useState('no');

  const emailcheck = (email:string) => {
    setchkemail('no');

    if (email==='') {
      alert('아이디를 입력해주세요.')
    }

    else if (!formik.errors.email) {
      axios({
        method:'get',
        url:`https://i9b206.p.ssafy.io:9090/user/signup/emailcheck/${email}`
      })
      .then(()=>{
        setchkemail('yes');
        alert('사용할 수 있는 아이디입니다.')
      })
      .catch(() => { 
        alert('중복된 아이디입니다.')
      })
    }
    else {
      alert('유효하지 않은 아이디입니다.')
    }
  };
  
  const nicknamecheck = (nickname:string) => {
    setchknickname('no');

    if (nickname==='') {
      alert('닉네임을 입력해주세요.')
    }

    else if (!formik.errors.nickname) {
      axios({
        method:'get',
        url:`https://i9b206.p.ssafy.io:9090/user/signup/nickcheck/${nickname}`
      })
      .then(()=>{
        setchknickname('yes')
        alert('사용할 수 있는 닉네임입니다.')
      })
      .catch(() => {
        alert('중복된 닉네임입니다.')
      })
    }
    else {
      alert('유효하지 않은 닉네임입니다.')
    }
  };

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      nickname: '',
      name: '',
      birthday: '',
      gender: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      // 회원가입 요청 로직
      if (chkemail !== 'yes' && chknickname !== 'yes') {
        alert('닉네임, 이메일 중복체크를 해주세요.')
      }
      else if (chknickname !== 'yes') {
        alert('닉네임 중복체크를 해주세요.')
      }
      else if (chkemail !== 'yes') {
        alert('이메일 중복체크를 해주세요.')
      }
      else {
        axios({
          method : 'post',
          url : 'https://i9b206.p.ssafy.io:9090/user/signup',
          data : values,
        })
        .then(res => {
          console.log(res)
          navigate('/login')
        })
        .catch(err => {
          console.log(err)
          alert('회원가입실패')})
      }
    },
  });

  return (
    <div className={signup_css.background}>
      <div className={signup_css.modal} >
        <a className={signup_css.link} href="/login">뒤로가기</a>
        <h1>회원가입</h1>
        <div className={signup_css.logo}/>

        <form className={signup_css.signup_form} onSubmit={formik.handleSubmit}>
          <label className={signup_css.split}>이름
          <span style={{color:'darkgray'}}>{formik.touched.name && formik.errors.name ? formik.errors.name : null}</span>
          </label>
          <input className={signup_css.input} type="text" placeholder="이름" {...formik.getFieldProps('name')} />

          <label className={signup_css.split}>생년월일
          <span style={{color:'darkgray'}}>{formik.touched.birthday && formik.errors.birthday ? formik.errors.birthday : null}</span>
          </label>
          <input className={signup_css.input} type="date" {...formik.getFieldProps('birthday')} />

            <label className={signup_css.split}>성별
            <span style={{color:'darkgray', margin:'0'}}>{formik.touched.gender && formik.errors.gender ? formik.errors.gender : null}</span>
            </label>
            <div className={signup_css.split}>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="1"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.gender === '1'}
                />
                남성
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="2"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.gender === '2'}
                />
                여성
              </label>
              <p></p>
              <p></p> {/* 대충 여백용 p */}
            </div>
          
          

          <label className={signup_css.split}>닉네임
          <span style={{color:'darkgray'}}>{formik.touched.nickname && formik.errors.nickname ? formik.errors.nickname : null}{chknickname === 'yes' ? '확인완료': null}</span>
          </label>
          <div className={signup_css.input_chk}>
          <input className={signup_css.input} type="text" placeholder="닉네임" {...formik.getFieldProps('nickname')}  onChange={(event) => {formik.handleChange(event); setchknickname('no');}} />
          <div className={signup_css.chk_input} onClick={()=>nicknamecheck(formik.values.nickname)}>중복확인</div>
          </div>
          <label className={signup_css.split}>아이디
            <span style={{color:'darkgray'}}>
              {formik.values.email==='' ? '이메일 형식으로 입력해주세요':null}{ formik.values.email!=='' &&formik.touched.email && formik.errors.email ? formik.errors.email : null}
           {chkemail === 'yes' ? '확인완료': null}
            </span>
          </label>
          <div className={signup_css.input_chk}>
            <input className={signup_css.input} type="text" placeholder="아이디" {...formik.getFieldProps('email')} onChange={(event) => {formik.handleChange(event); setchkemail('no');}}/>
            <div className={signup_css.chk_input} onClick={()=>emailcheck(formik.values.email)}>중복확인</div>
          </div>

          <label className={signup_css.split}>비밀번호
          <span style={{color:'darkgray'}}>{formik.touched.password && formik.errors.password ? formik.errors.password : null}</span>
          </label>
          <input className={signup_css.input} type="password" placeholder="비밀번호" {...formik.getFieldProps('password')} />
          
          <label className={signup_css.split}>비밀번호 확인
          <span style={{color:'darkgray'}}>{formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : null}</span>
          </label>
          <input className={signup_css.input} type="password" placeholder="비밀번호 확인" {...formik.getFieldProps('confirmPassword')} />

          <label className={signup_css.split}>프로필 사진 등록(선택)</label>
          <input  className={signup_css.split} type="file" name="photo" onChange={(event) => {
            formik.setFieldValue("photo", event?.currentTarget?.files?.[0]);
          }} />
          
          {formik.isValid && chkemail==='yes' && chknickname==='yes' ? 
          <button className={signup_css.button} type="submit">Sign Up</button> : 
          <p style={{width:'100%'}}><button className={signup_css.button_disabled} type="submit" disabled>Sign Up</button><br/>
          빈칸을 모두 채워주세요.</p>}
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
