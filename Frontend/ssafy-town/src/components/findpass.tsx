import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './findpass.css';

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
    },
  });

  return (
    <div className="background">
      <div className="modal">
        <h1>비밀번호 찾기</h1>
        <a className="link" href="/login">뒤로가기</a>
        <img className="logo" alt="Logo" />
        <form onSubmit={formik.handleSubmit}>
          <input className="input" type="text" placeholder="성함" {...formik.getFieldProps('name')} />
          {formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div> : null}

          <input className="input" type="text" placeholder="이메일" {...formik.getFieldProps('email')} />
          {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}

          <button className="button" type="submit" disabled={!formik.isValid || formik.isSubmitting}>Find Password</button>
        </form>
      </div>
    </div>
  );
};

export default FindPassword;
