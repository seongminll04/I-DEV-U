import React, { useState } from 'react';
import followDetail_css from './followDetail.module.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setModal } from '../../store/actions';

interface UserResponse {
  idx : string;
  name : string;
  nickname : string;
  email : string;
  gender : string;
  intro : string;
}

interface Props {
  refresh: () => void;
}

const FollowDetail: React.FC<Props> = ({refresh}) => {
  const dispatch = useDispatch()
  const [text, setText] = useState('');
  const [find, setFind] = useState(false);
  const [findUser, setFindUser] = useState<UserResponse>();
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

  const handleSubmit = () => {
    const userToken = localStorage.getItem('userToken')

    axios({
      method: "get",
      url: 'https://i9b206.p.ssafy.io:9090/user/search/email',
      headers: {
        Authorization: 'Bearer ' + userToken
      },
      params: {
        email : text
      }
    }).then((res) => {
      console.log(res.data.data[0]);
      setFindUser(res.data.data[0]);
      setFind(true);
    }).catch((err) => {
      alert("해당하는 유저가 없습니다")
      console.log(err);
    })
  }

  const handleFollow = () => {
    const userToken = localStorage.getItem('userToken')
    const userIdxStr = localStorage.getItem('userIdx')
    const userIdx = userIdxStr ? parseInt(userIdxStr, 10) : null

    axios({
      method: "post",
      url: 'https://i9b206.p.ssafy.io:9090/user/follow',
      headers: {
        Authorization: 'Bearer ' + userToken
      },
      data : {
        userIdx : userIdx,
        followIdx : findUser?.idx
      }
    }).then(() => {
      alert("등록완료")
      refresh();
      dispatch(setModal(null))
    }).catch((err) => {
      alert("해당하는 유저가 없습니다")
      console.log(err);
    })
  }

  return (
    <div className={followDetail_css.modal_overlay} onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) { dispatch(setModal(null)); }
    }}>
      {find ? (
        <div className={followDetail_css.bye_modal}>
          <h1>찾으시는 유저가 {findUser?.nickname} 이 맞나요?</h1>
          <div className={followDetail_css.btn}>
            <button onClick={handleFollow}>확인</button>
            <button onClick={() => dispatch(setModal('null'))}>취소</button>
          </div>
        </div>
      ) : (
        <div className={followDetail_css.withdraw_modal}>
          <div className={followDetail_css.two_btn}>
            <span
              onClick={() => {
                dispatch(setModal(null))
              }}
            >
              닫기
            </span>
          </div>
          <h1 style={{ fontSize: '40px', marginBottom: '20px' }}>
            유저 찾기
          </h1>
          <br />
          <p>이메일로 유저를 직접 추가할 수 있습니다.</p>
          <p>
            이메일을 입력해주세요. ex)
          </p>
          <br />

          <input
            className={followDetail_css.input}
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            onKeyDown={handlekeydown}
          />
          <br />
          <div className={followDetail_css.btn}>
            <button onClick={handleSubmit}>확인</button>
            <button onClick={() => dispatch(setModal(null))}>취소</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FollowDetail;
