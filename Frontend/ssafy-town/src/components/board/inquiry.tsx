import React, { useState } from 'react';
import Inquiry from './inquiry.module.css';

import { useDispatch } from 'react-redux';
import { setModal } from '../../store/actions';
import axiosInstance from '../../interceptors'; // axios 인스턴스 가져오기

const CreateQnA: React.FC = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handlekeydown = (event: React.KeyboardEvent<HTMLTextAreaElement> | React.KeyboardEvent<HTMLInputElement>) => {
    const inputElement = event.currentTarget
    const currentCursorPosition = inputElement.selectionStart || 0;
    const maxCursorPosition = inputElement.value.length;
    if (event.key === 'ArrowLeft' && currentCursorPosition !== 0) {
      inputElement.setSelectionRange(currentCursorPosition - 1, currentCursorPosition - 1);
    } else if (event.key === 'ArrowRight') {
      inputElement.setSelectionRange(currentCursorPosition + 1, currentCursorPosition + 1);
    } else if (event.key === ' ') {
      inputElement.value = inputElement.value.slice(0, currentCursorPosition) + ' ' + inputElement.value.slice(currentCursorPosition,)
      inputElement.setSelectionRange(currentCursorPosition + 1, currentCursorPosition + 1);
    } else if (event.key === 'ArrowUp' && currentCursorPosition >= 29) {
      inputElement.setSelectionRange(currentCursorPosition - 29, currentCursorPosition - 29);
    } else if (event.key === 'ArrowDown' && currentCursorPosition + 29 < maxCursorPosition) {
      inputElement.setSelectionRange(currentCursorPosition + 29, currentCursorPosition + 29);
    }
  }

  const create = () => {
    const userToken = localStorage.getItem('userToken')
    const userIdxStr = localStorage.getItem('userIdx')
    var userIdx: number | null;
    if (userIdxStr) { userIdx = parseInt(userIdxStr, 10) } else { userIdx = null }

    axiosInstance({
      method: 'post',
      url: `https://i9b206.p.ssafy.io:9090/inquiry/create`,
      data: {
        'userIdx': userIdx,
        'title': title,
        'content': content,
      },
      headers: {
        Authorization: 'Bearer ' + userToken
      },
    })
      .then(() => {
        alert('소중한 의견 감사합니다')
        dispatch(setModal(null))
      })
      .catch(err => console.log(err))
  }

  return (
    <div className={Inquiry.modal_overlay}>
      <div className={Inquiry.modal}>
        <p className={Inquiry.closebtn} onClick={() => { dispatch(setModal(null)) }}>닫기</p>
        <h1>1 : 1 문의</h1>
        <hr />
        <div className={Inquiry.info}>
          <div className={Inquiry.input}>
            <label>
              <span>제</span><span>목</span>
            </label>
            <p> : </p>
            <input type="text" value={title} onKeyDown={handlekeydown} placeholder='제목을 입력해주세요'
              onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className={Inquiry.input}>
            <label><span>내</span><span>용</span></label>
            <p> : </p>
            <textarea name="" id="" value={content} placeholder='내용을 작성해주세요' onKeyDown={handlekeydown}
              onChange={(e) => setContent(e.target.value)} />
          </div>
          {/* <div className={Inquiry.input}>
            <label><span>파</span><span>일</span></label>
            <p> : </p>
            <input type="file" style={{marginTop:'5px'}}/>
          </div> */}
          <button className={Inquiry.button} onClick={create}>생성하기</button>
        </div>
      </div>
    </div>

  );
};

export default CreateQnA;
