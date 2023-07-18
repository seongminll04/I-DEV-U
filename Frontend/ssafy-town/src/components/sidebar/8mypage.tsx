import React, { useState } from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import mypage_css from './8mypage.module.css';

const ToggleContainer = styled.div`
  position: relative;
  cursor: pointer;
  margin : 20px;
  > .toggle-container {

    width: 50px;
    height: 24px;
    border-radius: 30px;
    background-color: rgb(233,233,234);}
    //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
  > .toggle--checked {
    background-color: rgb(0,200,102);
    transition : 0.5s
  }

  > .toggle-circle {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: rgb(255,254,255);
    transition : 0.5s
    //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
  } >.toggle--checked {
    left: 27px;
    transition : 0.5s
  }
`;

const Desc = styled.div`
  //설명 부분의 CSS를 구현
  display: flex;
  align-items: center;
  text-align: center;
  margin: 20px;
`;

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
  // toggle
  const [isOn, setisOn] = useState(false);

  const toggleHandler = () => {
    // isOn의 상태를 변경하는 메소드를 구현
    setisOn(!isOn)
  };

  // user from databse;
  const user = {
    email: "aaa@bbb.com",
    password: "aaaaaaaaaa",
    name: "lee",
    nickname: "leek",
    birthdate: "1999-99-99",
    gender: "1",
    intro: "", // 자기소개
    status: "", // active or not (회원탈퇴여부)
    grade: 2, // 1 : 관리자(운영자), 2 : 일반
  };

  // let isOpened = false;
  let [isOpened, setOpen] = React.useState(false);
  const editMyInfo = () => {
    setOpen(!isOpened);
  }

  // 소개팅 등록한 경우 등록철회
  function unregistMeeting(){
    console.log("이제 소개팅 안할래!");
  }

  // 초기 설문 수정
  function editMyInitSurvey(){
    console.log("초기 설문 수정");
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
      alert("변경 완료")
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
            <input type="password" className={mypage_css.input} {...formik.getFieldProps('password')} />
          </div>
          <div className={mypage_css.mypage_info}>
            <label htmlFor="confirmPassword">비밀번호 확인 : </label>
            <input id="confirmPassword" type="password" className={mypage_css.input} {...formik.getFieldProps('confirmPassword')} placeholder="비밀번호 확인"/>
          </div>
          {/*사진 :  <input type="file" className={mypage_css.input}/> */}
          <button className={mypage_css.button} type="submit" disabled={!formik.isValid || formik.isSubmitting}>수정</button>
        </form>
      );
    }
  }

  return (
    <div className={mypage_css.mypage_background}>
      <div className={mypage_css.mypage_modal} id={mypage_css.modal}>
      <a className={mypage_css.link} href="/findpassword">뒤로가기</a>
        <div className={mypage_css.mypage_welcome}>
          <div>
          안녕하세요! {user.name} 님
          </div>
          <button className={mypage_css.button} onClick={editMyInfo}>회원정보 수정</button>
          <div className={mypage_css.mypage_togglebox}>
            <div className={mypage_css.mypage_toggle}>
              {isOn === false ?
              <Desc><div className='OFF'>초대 거부</div></Desc> :
              <Desc><div className='ON'>초대 수락</div></Desc>}
              <ToggleContainer
                // 클릭하면 토글이 켜진 상태(isOn)를 boolean 타입으로 변경하는 메소드가 실행
                onClick={toggleHandler}
              >
                {/* 아래에 div 엘리먼트 2개가 있다. 각각의 클래스를 'toggle-container', 'toggle-circle' 로 지정 */}
                {/* Toggle Switch가 ON인 상태일 경우에만 toggle--checked 클래스를 div 엘리먼트 2개에 모두 추가. 조건부 스타일링을 활용*/}
                <div className={`toggle-container ${isOn ? "toggle--checked" : null}`}/>
                <div className={`toggle-circle ${isOn ? "toggle--checked" : null}`}/>
              </ToggleContainer>
              {/* Desc 컴포넌트를 활용*/}
              {/* Toggle Switch가 ON인 상태일 경우에 Desc 컴포넌트 내부의 텍스트를 'Toggle Switch ON'으로, 그렇지 않은 경우 'Toggle Switch OFF'. 조건부 렌더링을 활용. */}
            </div>
          </div>
          <button className={mypage_css.button}onClick={unregistMeeting}>소개팅 등록 취소</button>
          <button className={mypage_css.button}onClick={editMyInitSurvey}>최초 설문 수정</button>
        </div>
        {showMine()}
        
      </div>
      <div>

      </div>
    </div>
    
  );
};

export default Mypage;
