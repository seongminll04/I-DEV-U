import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useNavigate, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import signup_css from './signup.module.css';
import axios from 'axios';

const validationSchema = Yup.object().shape({
  nickname: Yup.string()
    .min(2, '2~12 자리, 특수문자 사용불가')
    .max(12, '2~12 자리, 특수문자 사용불가')
    .matches(/^[A-Za-z0-9가-힣ㄱ-ㅎ\s]+$/, '2~12 자리, 특수문자 사용불가')
    .required('닉네임을 입력해주세요'),
  name: Yup.string()
    .min(1, '1~12 자리, 특수문자 사용불가')
    .max(12, '1~12 자리, 특수문자 사용불가')
    .matches(/^[가-힣]+$/, '한글 이름을 작성해주세요')
    .required('이름을 입력해주세요'),
  birthday: Yup.string()
    .matches(/^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, '유효하지 않은 생년월일입니다')
    .required('생년월일을 입력해주세요'),
  gender: Yup.string()
    .required('성별을 선택해주세요')
    .oneOf(['MALE', 'FEMALE'], '유효한 성별을 선택해주세요'),
});

const KakaoSignUp = () => {
  const location = useLocation();
  const [chknickname, setchknickname] = useState('no');
  const [today,setToday] = useState('2023-12-31')
  const nicknamecheck = (nickname:string) => {
    setchknickname('no');
    if (nickname==='') {
      alert('닉네임을 입력해주세요.')
    }

    else if (!formik.errors.nickname) {
      axios({
        method:'get',
        url:`https://i9b206.p.ssafy.io:9090/user/signUp/nicknameCheck/${nickname}`
      })
      .then((res)=>{
        if (res.data.status.statusCodeValue===200) {
          setchknickname('yes')
          alert('사용할 수 있는 닉네임입니다.')
        }
        else {
          alert('중복된 닉네임입니다.')
        }
      })
      .catch((err) => {
        console.log(err)
      })
    }
    else {
      alert('유효하지 않은 닉네임입니다.')
    }
  };

  useEffect(()=> {
    const date = new Date()
    var month:any; var day:any;
    if (date.getMonth()+1 < 10){month='0'+(date.getMonth()+1)}
    else {month=date.getMonth()+1}
    if (date.getDate() < 10){day='0'+(date.getDate())}
    else {day=date.getDate()}

    setToday(date.getFullYear()+'-'+month+'-'+day)
  },[setToday])

  const chkdata = location.state.data;
  function generateRandomString(length:number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    console.log(chkdata)
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
  }
  
  const password = 'KAKAO_' + generateRandomString(8);  
  const email = location.state.nickname;
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: email,
      password: password,
      confirmPassword: password,
      nickname: '',
      name: '',
      birthday: '',
      gender: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      // 회원가입 요청 로직
      if (chknickname !== 'yes') {
        alert('닉네임 중복체크를 해주세요.')
      }
      else {
        axios({
          method : 'post',
          url : 'https://i9b206.p.ssafy.io:9090/user/signUp',
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
        <h1>카카오 회원가입</h1>
        <p>최초 로그인 : 추가 정보를 입력해주세요</p>
        <form className={signup_css.signup_form} onSubmit={formik.handleSubmit}>
          <label className={signup_css.split}>이름
          <span style={{color:'darkgray'}}>{formik.touched.name && formik.errors.name ? formik.errors.name : null}</span>
          </label>
          <input className={signup_css.input} type="text" placeholder="이름" {...formik.getFieldProps('name')} />

          <label className={signup_css.split}>생년월일
          <span style={{color:'darkgray'}}>{formik.touched.birthday && formik.errors.birthday ? formik.errors.birthday : null}</span>
          </label>
          <input className={signup_css.input} type="date" {...formik.getFieldProps('birthday')} max={today} />

            <label className={signup_css.split}>성별
            <span style={{color:'darkgray', margin:'0'}}>{formik.touched.gender && formik.errors.gender ? formik.errors.gender : null}</span>
            </label>
            <div className={signup_css.split}>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="MALE"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.gender === 'MALE'}
                />
                남성
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="FEMALE"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.gender === 'FEMALE'}
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

          <label className={signup_css.split}>프로필 사진 등록(선택)</label>
          <input  className={signup_css.split} type="file" name="photo" onChange={(event) => {
            formik.setFieldValue("photo", event?.currentTarget?.files?.[0]);
          }} />
          
          {formik.isValid && chknickname==='yes' ? 
          <button className={signup_css.button} type="submit">Sign Up</button> : 
          <p style={{width:'100%'}}><button className={signup_css.button_disabled} type="submit" disabled>Sign Up</button><br/>
          빈칸을 모두 채워주세요.</p>}
        </form>
      </div>
    </div>
  );
};

export default KakaoSignUp;
