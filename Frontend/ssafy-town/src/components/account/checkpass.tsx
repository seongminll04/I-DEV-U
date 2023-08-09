import React, { useState } from 'react';
import checkpass_css from './checkpass.module.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setModal } from '../../store/actions';

const CheckPass: React.FC = () => {
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const checkPass = () => {
    const userToken = localStorage.getItem('userToken')
    const userIdxStr = localStorage.getItem('userIdx')
    const userIdx = userIdxStr ? parseInt(userIdxStr, 10):null
  
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
        if (res.data.status.statusCodeValue===200) {
          alert("비밀번호 일치, 회원정보 수정 가능");
          dispatch(setModal('회원정보수정2'));
        }
        else {
          alert("비밀번호가 일치하지 않습니다.")
        }
      })
      .catch((err) => {
        alert("서버오류 : 다시시도해주세요")
        console.log(err);
      });
  
  };
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
    } else if (event.key === 'Enter') {
      checkPass()
    }
  }

  function onClose() {
    dispatch(setModal(null));
  }
  
  return (
    <div className={checkpass_css.modal_overlay}>
      <div className={checkpass_css.withdraw_modal}>
        <div className={checkpass_css.two_btn}>
          <span>
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
          비밀번호 확인
        </h1>
        <br />
        <p style={{ fontSize: '20px' }}>비밀번호를 입력해주세요.</p>
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
