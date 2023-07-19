import React, {useState} from 'react';
import alert_css from './1alert.module.css';
import axios from 'axios';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}


const Modal: React.FC<ModalProps> = ({ isOpen, onClose}) => {
  const [page, setpage] = useState<Number>(0);
  const searchdata = () => {
    // 여기서 모든데이터 중 검색어랑 일치하는 것만 리스트화 하는 코드작성
  }
  if (!isOpen) return null;
  
  // 모달창이 열렸다면 공지사항 데이터 불러오기
  else {
    axios({
      method:'get',
      url:'http://localhost:8080/notice/?~~~~~',
    })
    .then(res => {
      console.log(res)
      // const alert_data=res.data 
    })
    .catch(err => {
      console.log(err)
    })
  }


  return (
    <div className={alert_css.modal_overlay}  onClick={(e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {setpage(0); onClose()}}}>
        <div className={alert_css.alert_modal}>
        <p className={alert_css.closebtn} onClick={() => {setpage(0); onClose()}}>닫기</p>
        
        {page===0 ? 
        <div>
          <div className={alert_css.container}>
            <div className={alert_css.notice}>
              <p>공지사항</p>
                <p className={alert_css.movebtn} onClick={() => setpage(1)}>전체보기</p>
            </div>
            <div className={alert_css.notice}>
              <p>1</p>
              <p>~~~~에 점검 진행합니다.~~~~에 점검 진행합니다.</p>
              <p>07/19 00:00</p>
            </div>
          </div>
          <hr />
          <div className={alert_css.container}>
            <div className={alert_css.notice}>
              <p>알림</p>
                <p className={alert_css.movebtn} onClick={() => setpage(2)}>전체보기</p>
            </div>
            <div className={alert_css.notice}>
              <p>1</p>
              <p>~~~~에 점검 진행합니다.~~~~에 점검 진행합니다.</p>
              <p>07/19 00:00</p>
            </div>
          </div>
        </div>
      : 
      <div>
        <p className={alert_css.backbtn} onClick={() => {setpage(0)}}>돌아가기</p>
        {page===1 ? 
        <div>
          <h1>공지사항 전체보기</h1>
          <div style={{display:'flex', justifyContent:'flex-end'}}>
            검색: 
            <input type="text" onChange={searchdata}/>
          </div>
          <hr />
        </div>
        :
        <div>
          <h1>알림 전체보기</h1>
          <div style={{display:'flex', justifyContent:'flex-end'}}>
            검색: 
            <input type="text" onChange={searchdata}/>
          </div>
          <hr />
        </div>
        }
      </div>
    }
        </div>
    </div>
  );
};

export default Modal;