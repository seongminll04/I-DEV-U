import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import mypage_css from './mypage.module.css';

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

const Mypage: React.FC = () => {
  // user from databse;
  const user = {
    email: "aaa@bbb.com",
    nickname: "leek",
    name: "lee",
    birthdate: "1999-99-99",
    gender: "1",
    password: "aaaaaaaaaa",
  };

  // let isOpened = false;
  let [isOpened, setOpen] = React.useState(false);
  const editInfo = () => {
    setOpen(!isOpened);
  }

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
      console.log(values);
      // Add signup logic here
    },
  });

  function showMine() {
    if (isOpened) {
      return (
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
            <input type="text" className={mypage_css.input} {...formik.getFieldProps('password')} />
          </div>
          <div className={mypage_css.mypage_info}>
            <label htmlFor="confirmPassword">비밀번호 확인 : </label>
            <input id="confirmPassword" type="text" className={mypage_css.input} {...formik.getFieldProps('confirmPassword')} placeholder="비밀번호 확인"/>
          </div>
          {/*사진 :  <input type="file" className={mypage_css.input}/> */}
          <button className={mypage_css.button} type="submit" disabled={!formik.isValid || formik.isSubmitting}>수정</button>
        </form>
      );
    }
  }
  return (
    <div className={mypage_css.background}>
      <div className={mypage_css.modal} id="mypage-modal">
        <div className={mypage_css.mypage_welcome}>
          {/* `안녕하세요!
          {user.name} 님` */}
          <button onClick={editInfo}>회원정보 수정</button>
        </div>
        {showMine()}
        
      </div>
    </div>
  );
};

export default Mypage;