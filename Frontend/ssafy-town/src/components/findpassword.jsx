import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Background, Modal, Logo, Input, Button, Link } from './login_styled';

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

const SignupForm = () => {
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
    <Background>
      <Modal>
        <h1>비밀번호 찾기</h1>
        <Link href="/login">뒤로가기</Link>
        <Logo/>
        <form onSubmit={formik.handleSubmit}>
          <Input name="name" type="text" placeholder="성함" {...formik.getFieldProps('name')} />
          {formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div> : null}

          <Input name="email" type="text" placeholder="이메일" {...formik.getFieldProps('email')} />
          {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}

          <Button type="submit" disabled={!formik.isValid || formik.isSubmitting}>Find Password</Button>
        </form>
      </Modal>
    </Background>
  );
};

export default SignupForm;
