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
    .matches(/^(19[0-9]{2}|20[0-2]{1}[0-9]{1})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, '유효한 생년월일이 아닙니다')
    .test('maxDate', '유효한 생년월일이 아닙니다', function (value) {
      if (!value) {
        return
      }
      const selectedDate = new Date(value);
      const tday=new Date();
      return selectedDate <= tday;
    })
    .required('생년월일을 입력해주세요'),
  gender: Yup.string()
    .required('성별을 선택해주세요')
    .oneOf(['MALE', 'FEMALE'], '유효한 성별을 선택해주세요'),
});

const KakaoSignUp = () => {
  const location = useLocation();
  const [chknickname, setchknickname] = useState('no');
  const [today,setToday] = useState('2023-12-31')
  const [errcount,setErrCount] = useState<number>(-1)

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
      .catch(() => {
        alert('오류발생!')
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

  function generateRandomString(length:number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
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
        .then(() => {
          axios({
            method:'post',
            url:'https://i9b206.p.ssafy.io:9090/user/kakaologin',
            data:{'email': email }
          })
          .then(res => {
            // 로그인 시, 로컬 스토리지에 토큰 저장
            localStorage.setItem('userToken',res.headers.authorization);
            localStorage.setItem('userIdx', res.data.userIdx);
            // if (res.data.user.status === "D") {
            //   throw new ValidationError("탈퇴처리된 회원입니다!");
            // } 
            navigate('/home')
          })
          .catch(() => {
      
            alert('카카오 로그인 실패')
            navigate('/login')
          })
        })
        .catch(() => {
  
          alert('회원가입실패')})
      }
    },
  });
  useEffect(()=>{
    var count=0
    if (formik.values.name==='') {count+=1}
    if (formik.values.birthday==='') {count+=1}
    if (formik.values.gender===null) {count+=1}
    if (formik.values.nickname==='') {count+=1}
    if (count === 4 ) {count=-1}
    setErrCount(count)
  },[formik, setErrCount])
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
          <input className={signup_css.input} type="date" {...formik.getFieldProps('birthday')} min={'1900-01-01'} max={today} />

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
          <button className={signup_css.button} type="submit">Sign Up</button> 
          : <> <button className={signup_css.button_disabled} type="submit" disabled>Sign Up</button>
            { errcount > 1 || errcount === -1 ? <span>빈칸을 모두 채워주세요</span>
            : errcount ===1 ? 
            <span>
              { formik.values.name==='' ? '이름을 입력해주세요'
              : formik.values.birthday==='' ? '생년월일을 입력해주세요'
              : formik.values.gender===null ? '성별을 입력해주세요'
              : formik.values.nickname==='' ? '닉네임을 입력해주세요'
              : null }
            </span>
           : errcount===0 ? <span>
            { formik.errors.name ? '이름을 확인해주세요'
            : formik.errors.birthday ? '생년월일을 확인해주세요'
            : formik.errors.gender ? '성별을 확인해주세요'
            : formik.errors.nickname ? '닉네임을 확인해주세요'
            : chknickname==='no' ? '닉네임 중복을 확인해주세요' : null  }</span>
           :null 
            }
           </>}
        </form>
      </div>
    </div>
  );
};

export default KakaoSignUp;
