import React, {useState, useEffect} from 'react';
import alert_css from './1alert.module.css';
import axios from 'axios';

interface ModalProps {
  onClose: () => void;
}


const Modal: React.FC<ModalProps> = ({onClose}) => {
  const [page, setpage] = useState<Number>(0); 
  // 0 처음 1 공지전체 2 알림전체    99 0->공지상세 98 0->알림상세 97 공지전체->공지상세 96 알림전체->알림상세
  const [search, setsearch] = useState<string>('');
  const [nowsearch, setnowsearch] = useState<boolean>(false);

  useEffect(() => { //esc키로 끄기
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setpage(0);setnowsearch(false); setsearch(''); onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const searchdata = () => {
    setnowsearch(true)
    // 여기서 모든데이터 중 검색어랑 일치하는 것만 리스트화 하는 코드작성

  }

  
  // 모달창이 열렸다면 공지사항 데이터 불러오기

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
  

  return (
    <div className={alert_css.modal_overlay}
    onClick={(e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {setpage(0);setnowsearch(false); setsearch(''); onClose()}}} >
        <div className={alert_css.alert_modal}>
        <p className={alert_css.closebtn} onClick={() => {setpage(0);setnowsearch(false); setsearch(''); onClose()}}>닫기</p>
        {page===0 ? 
        <div>
          <h1 style={{margin:'-20px 0 20px 0'}}>공지사항 / 알림</h1>
          <div className={alert_css.container}>
            <div className={alert_css.notice}>
              <p>공지사항</p>
                <p className={alert_css.movebtn} onClick={() => setpage(1)}>전체보기</p>
            </div>
            <div onClick={()=> {setpage(99)}} className={alert_css.notice}>
              <p>1</p>
              <p>~~~~에 점검 진행합니다.~~~~에 점검 진행합니다.</p>
              <p>07/19 00:00</p>
            </div>
          </div>
          <hr style={{border:'1px solid black'}}/>
          <div className={alert_css.container}>
            <div className={alert_css.notice}>
              <p>알림 </p>
                <p className={alert_css.movebtn} onClick={() => setpage(2)}>전체보기</p>
            </div>
            <div onClick={()=> {setpage(98)}} className={alert_css.notice}>
              <p>1</p>
              <p>~~~~에 점검 진행합니다.~~~~에 점검 진행합니다.</p>
              <p>07/19 00:00</p>
            </div>
          </div>
        </div>
      : page===99 ? // 첫화면에서 공지사항 상세정보 접근시
      <div>
        <p className={alert_css.backbtn} onClick={() => {setpage(0); setnowsearch(false); setsearch('')}}>돌아가기</p>
        <div>
          <p>공지사항 상세정보</p>
        </div> 
      </div>
      
      : page===98 ? // 첫화면에서 알림 상세정보 접근시
      <div>
        <p className={alert_css.backbtn} onClick={() => {setpage(0); setnowsearch(false); setsearch('')}}>돌아가기</p>
        <div>
          <p>알림 상세정보</p>
        </div> 
      </div>
      : page===97 ? // 공지 전체보기에서 공지사항 상세정보 접근시
      <div>
        <p className={alert_css.backbtn} onClick={() => {setpage(1);}}>돌아가기</p>
        <div>
          <p>공지사항 상세정보</p>
        </div> 
      </div>
      :page===96 ? // 알림 전체보기에서 공지사항 상세정보 접근시
      <div>
        <p className={alert_css.backbtn} onClick={() => {setpage(2);}}>돌아가기</p>
        <div>
          <p>알림 상세정보</p>
        </div> 
      </div>
      :
      
      <div>
        <p className={alert_css.backbtn} onClick={() => {setpage(0); setnowsearch(false); setsearch('')}}>돌아가기</p>
        {page===1 ? 
        <div>
          <h1 style={{margin:'-20px 0 20px 0'}}>공지사항</h1>
          <hr />
          <div style={{display:'flex', justifyContent:'space-between'}}>
            {!nowsearch ? <span></span> : <span className={alert_css.movebtn} onClick={()=> {setsearch(''); setnowsearch(false)}}>검색취소</span>}
            <div>
            <input type="text" value={search} onChange={(event) => {setsearch(event.target.value);}}/>
            <button onClick={searchdata}>검색icon</button>
            </div>
          </div>
     
          <br />
          <div className={alert_css.notice}>
             전체 or 검색 결과 리스트 출력하는 곳
          </div>
          <div onClick={()=> {setpage(97)}} className={alert_css.notice}>
            <p>1</p>
            <p>~~~~에 점검 진행합니다.~~~~에 점검 진행합니다.</p>
            <p>07/19 00:00</p>
          </div>
          
        </div>
        :
        <div>
          <h1 style={{margin:'-20px 0 20px 0'}}>알림</h1>
          <div style={{display:'flex', justifyContent:'space-between'}}>
            {!nowsearch ? <span></span> : <span className={alert_css.movebtn} onClick={()=> {setsearch(''); setnowsearch(false)}}>검색취소</span>}
            <div>
            <input type="text" value={search} onChange={(event) => {setsearch(event.target.value);}}/>
            <button onClick={searchdata}>검색icon</button>
            </div>
          </div>

          <br />
          <div className={alert_css.notice}>

            전체 or 검색 결과 리스트 출력하는 곳
 
          </div>
          <div onClick={()=> {setpage(96)}} className={alert_css.notice}>
            <p>1</p>
            <p>~~~~에 점검 진행합니다.~~~~에 점검 진행합니다.</p>
            <p>07/19 00:00</p>
          </div>

        </div>
        }
      </div>
    }
        </div>
    </div>
  );
};

export default Modal;