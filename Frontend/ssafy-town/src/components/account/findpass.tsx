import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import findpass_css from './findpass.module.css';
import axiosInstance from '../../interceptors'; // axios 인스턴스 가져오기

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('유효하지 않은 이메일입니다.')
    .max(50, '이메일의 글자 수는 50자 이내로 설정해주세요.')
    .required('이메일을 입력해주세요.'),
  name: Yup.string()
    .min(1, '1~12 자리, 특수문자 사용불가')
    .max(12, '1~12 자리, 특수문자 사용불가')
    .matches(/^[가-힣]+$/, '한글로만 작성해주세요.')
    .required('이름을 입력해주세요.'),
});

const FindPassword: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      // Add 회원정보 찾기 logic here
      axiosInstance({
        method:'post',
        url:'https://i9b206.p.ssafy.io:9090/user/~~~~',
        data:values
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    },
  });

  return (
    <div className={findpass_css.background}>
      <div className={findpass_css.modal}>
      <a className={findpass_css.link} href="/login">뒤로가기</a>
        <div className={findpass_css.logo}/>
        <h1>비밀번호 찾기</h1>
        <form className={findpass_css.findpass_form} onSubmit={formik.handleSubmit}>
          
          <label className={findpass_css.split}>이름
          <span style={{color:'darkgray'}}>
          {formik.values.name==='' ? '이름을 입력해주세요.':null}{formik.values.name!=='' &&formik.touched.name && formik.errors.name ? formik.errors.name : null}</span>
          </label>
          <input className={findpass_css.input} type="text" placeholder="이름" {...formik.getFieldProps('name')} />


          <label className={findpass_css.split}>아이디
            <span style={{color:'darkgray'}}>
              {formik.values.email==='' ? '이메일을 입력해주세요.':null}{ formik.values.email!=='' &&formik.touched.email && formik.errors.email ? formik.errors.email : null}
            </span>
          </label>
          <input className={findpass_css.input} type="text" placeholder="아이디" {...formik.getFieldProps('email')} />
          <br />
          {formik.isValid ? <p style={{width:'100%'}}><button className={findpass_css.button} type="submit">확인</button></p> : 
          <p style={{width:'100%'}}><button className={findpass_css.button_disabled} type="submit" disabled>확인</button><br/>
          빈 칸을 모두 채워주세요.</p>}
        </form>
      </div>
    </div>
  );
};

export default FindPassword;
