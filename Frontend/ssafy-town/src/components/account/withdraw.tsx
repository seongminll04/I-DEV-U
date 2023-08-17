import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import withdraw_css from './withdraw.module.css';
import axiosInstance from '../../interceptors'; // axios 인스턴스 가져오기
import { useDispatch } from 'react-redux';
import { setModal } from '../../store/actions';

const Withdraw: React.FC = () => {
  const dispatch = useDispatch()
  const [Err, setErr] = useState(false);
  const [text, setText] = useState('');
  const [bye, setBye] = useState(false);
  const navigate = useNavigate();
  const handlekeydown = (event:React.KeyboardEvent<HTMLInputElement>) => {
    const inputElement = event.currentTarget
    const currentCursorPosition = inputElement.selectionStart || 0;
    if (event.key === 'ArrowLeft' && currentCursorPosition!==0) {
      inputElement.setSelectionRange(currentCursorPosition - 1, currentCursorPosition - 1);
    } else if (event.key === 'ArrowRight') {
      inputElement.setSelectionRange(currentCursorPosition + 1, currentCursorPosition + 1);
    } else if (event.key === ' '){
      inputElement.value = inputElement.value.slice(0,currentCursorPosition)+ ' ' +inputElement.value.slice(currentCursorPosition,)
      inputElement.setSelectionRange(currentCursorPosition+1 , currentCursorPosition+1);
    }
  }

  const withdraw = () => {
    if (text.split('/')[0] !== '유저' || text.split('/')[1] !== '회원탈퇴') {
      setErr(true);
    } else {
      // 백엔드 에 따라 수정할 곳
      const userToken=localStorage.getItem('userToken')
      axiosInstance({
        method: 'PUT',
        url: 'https://i9b206.p.ssafy.io:9090/user/delete',
        headers : {
          Authorization: 'Bearer ' + userToken
        },
      })
        .then((res) => {
          console.log('=== 유저 삭제 ===');
          console.log(res);
          setBye(true);
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className={withdraw_css.modal_overlay}  onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {dispatch(setModal(null));}}}>
      {bye ? (
        <div className={withdraw_css.bye_modal}>
          <h1 style={{ marginBottom: '0' }}>
            <span style={{ color: 'red' }}>회원탈퇴</span> 처리가
            완료되었습니다.
          </h1>
          <h1>이용해주셔서 감사합니다.</h1>
          <p>* 잠시 후, 로그인 페이지로 이동됩니다.</p>
        </div>
      ) : (
        <div className={withdraw_css.withdraw_modal}>
          <div className={withdraw_css.two_btn}>
            <span
              onClick={() => {
                dispatch(setModal('회원정보수정2'))
              }}
            >
              뒤로가기
            </span>
            <span
              onClick={() => {
                dispatch(setModal(null))
              }}
            >
              닫기
            </span>
          </div>
          <h1 style={{ color: 'red', fontSize: '40px', marginBottom: '20px' }}>
            회원탈퇴
          </h1>
          <br />
          <p>* 회원탈퇴 시 계정 복구가 불가능합니다.</p>
          <p>
            * 회원탈퇴를 원하시면 양식에 맞추어 입력해주세요. ex)
            김싸피/회원탈퇴
          </p>
          <br />

          <input
            className={withdraw_css.input}
            type="text"
            value={text}
            onChange={(e) => {
              setErr(false);
              setText(e.target.value);
            }}
            onKeyDown={handlekeydown}
          />
          <br />
          <div className={withdraw_css.btn}>
            <button onClick={withdraw}>탈퇴</button>
            <button onClick={()=>dispatch(setModal('회원정보수정2'))}>취소</button>
          </div>
          {Err ? (
            <p style={{ color: 'red' }}>양식에 맞게 입력해주세요</p>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Withdraw;
