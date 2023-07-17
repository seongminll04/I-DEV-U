import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Background, Modal, Logo, Input, Button, Link } from './login_styled';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('유효하지 않은 이메일입니다.')
    .max(50, '이메일의 글자 수는 50자 이내로 설정해주세요.')
    .required('이메일을 입력해주세요.'),
  password: Yup.string()
    .min(8, '8~14 자리, 특수문자 사용불가')
    .max(14, '8~14 자리, 특수문자 사용불가')
    .required('비밀번호를 입력해주세요.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
    .required('비밀번호를 입력해주세요.'),
  nickname: Yup.string()
    .min(2, '2~12 자리, 특수문자 사용불가')
    .max(12, '2~12 자리, 특수문자 사용불가')
    .required('닉네임을 입력해주세요.'),
  name: Yup.string()
    .min(1, '1~12 자리, 특수문자 사용불가')
    .max(12, '1~12 자리, 특수문자 사용불가')
    .matches(/^[가-힣]+$/, '한글로만 작성해주세요.')
    .required('이름을 입력해주세요.'),
  birthday: Yup.string()
    .matches(/^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, '유효하지 않은 생년월일입니다.')
    .required('생년월일을 입력해주세요.'),
  gender: Yup.string()
  .required('성별을 선택해주세요.')
  .oneOf(['male', 'female'], '유효한 성별을 선택해주세요.'),
});

const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      nickname: '',
      name: '',
      birthday: '',
      gender: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      // Add signup logic here
    },
  });

  return (
    <Background>
      <Modal>
        <Link href="/login">뒤로가기</Link>
        <Logo/>
        <form onSubmit={formik.handleSubmit}>
          <Input name="name" type="text" placeholder="성함" {...formik.getFieldProps('name')} />
          {formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div> : null}

          <Input name="birthday" type="date" {...formik.getFieldProps('birthday')} />
          {formik.touched.birthday && formik.errors.birthday ? <div>{formik.errors.birthday}</div> : null}

          <br />
          <label>성별</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.gender === 'male'}
                />
                남성
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.gender === 'female'}
                />
                여성
              </label>
            </div>
          {formik.touched.gender && formik.errors.gender ? <div>{formik.errors.gender}</div> : null}

          <Input name="nickname" type="text" placeholder="닉네임" {...formik.getFieldProps('nickname')} />
          {formik.touched.nickname && formik.errors.nickname ? <div>{formik.errors.nickname}</div> : null}

          <Input name="email" type="text" placeholder="이메일" {...formik.getFieldProps('email')} />
          {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}

          <Input name="password" type="password" placeholder="비밀번호" {...formik.getFieldProps('password')} />
          {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}

          <Input name="confirmPassword" type="password" placeholder="비밀번호 확인" {...formik.getFieldProps('confirmPassword')} />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? <div>{formik.errors.confirmPassword}</div> : null}

          <Input type="file" name="photo" onChange={(event) => {
            formik.setFieldValue("photo", event.currentTarget.files[0]);
          }} />

          <Button type="submit" disabled={!formik.isValid || formik.isSubmitting}>Sign Up</Button>
        </form>
      </Modal>
    </Background>
  );
};

export default SignupForm;
