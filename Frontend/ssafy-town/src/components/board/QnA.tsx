import React, {useState,useEffect} from 'react';
import QnA_css from './QnA.module.css';

interface Props {
  onClose : () => void;
}

const QnA: React.FC<Props> = ({onClose}) => {
  const [search, setsearch] = useState<string>('');
  const [nowsearch, setnowsearch] = useState<boolean>(false);

  
  const searchdata = () => {
    setnowsearch(true)
    // 여기서 모든데이터 중 검색어랑 일치하는 것만 리스트화 하는 코드작성
    
  }
  useEffect(() => { //esc키로 끄기
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);
  return (
    <div className={QnA_css.modal_overlay} onClick={(e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {onClose()}}}>
      <div className={QnA_css.QnA_modal}>
        <p className={QnA_css.closebtn} onClick={() => {onClose()}}>닫기</p>
        <h1>Q n A 게시판</h1>
        <hr />
        <div style={{display:'flex', justifyContent:'space-between'}}>
          {!nowsearch ? <span></span> : <span className={QnA_css.movebtn} onClick={()=> {setsearch(''); setnowsearch(false)}}>검색취소</span>}
          <div>
            <input type="text" value={search} onChange={(event) => {setsearch(event.target.value);}}/>
            <button onClick={searchdata}>검색icon</button>
          </div>
        </div>
        <br />
        <div className={QnA_css.notice}>
          <p>1</p>
          <p>!!! 궁금해요.</p>
          <p>07/19 00:00</p>
        </div>
        <button className={QnA_css.button}>글쓰기</button>
      </div>
  </div>
  );
};

export default QnA;