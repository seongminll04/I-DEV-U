import React, { useState } from 'react';
import checkpass_css from './checkpass.module.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setModal } from '../../store/actions';

const CheckPass: React.FC = () => {
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const handlekeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const inputElement = event.currentTarget
    const currentCursorPosition = inputElement.selectionStart || 0;
    if (event.key === 'ArrowLeft' && currentCursorPosition !== 0) {
      inputElement.setSelectionRange(currentCursorPosition - 1, currentCursorPosition - 1);
    } else if (event.key === 'ArrowRight') {
      inputElement.setSelectionRange(currentCursorPosition + 1, currentCursorPosition + 1);
    } else if (event.key === ' ') {
      inputElement.value = inputElement.value.slice(0, currentCursorPosition) + ' ' + inputElement.value.slice(currentCursorPosition,)
      inputElement.setSelectionRange(currentCursorPosition + 1, currentCursorPosition + 1);
    }
  }

  function onClose() {
    dispatch(setModal(null));
  }
  
  const checkPass = () => {
    const userToken = localStorage.getItem('userToken')
    const userIdx = localStorage.getItem('userIdx')

    axios({
      method: 'post',
      url: 'https://i9b206.p.ssafy.io:9090/user/modify/check',
      headers: {
        Authorization: 'Bearer ' + userToken
      },
      data: {
        'userIdx': userIdx,
        'password': password,
      },
    })
      .then((res) => {
        console.log(res);
        alert("비밀번호 일치, 회원정보 수정 가능");
        dispatch(setModal('회원정보수정2'));
      })
      .catch((err) => {
        alert("비밀번호가 일치하지 않습니다.")
        console.log(err);
      });

  };
  return (
    <div>
      <div className={checkpass_css.withdraw_modal}>
        <div className={checkpass_css.two_btn}>
          <span
            onClick={() => {
              onClose();
            }}
          >
            뒤로가기
          </span>
          <span
            onClick={() => {
              onClose();
            }}
          >
            닫기
          </span>
        </div>
        <h1 style={{ marginBottom: '20px' }}>
          회원탈퇴
        </h1>
        <br />
        <p style={{ fontSize: '20px' }}>비밀번호를 다시 한 번 입력해주세요.</p>
        <br />

        <input
          className={checkpass_css.input}
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          onKeyDown={handlekeydown}
        />
        <br />
        <div className={checkpass_css.btn}>
          <button onClick={checkPass}>확인</button>
          <button onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default CheckPass;
