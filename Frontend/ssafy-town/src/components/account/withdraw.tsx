import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import withdraw_css from './withdraw.module.css';
import axios from 'axios';

interface Props {
    onBack: () => void;
    onClose: () => void;
  }


const Withdraw: React.FC<Props>  = ({onBack, onClose}) => {
  const [Err,setErr] = useState(false)
  const [text,setText] = useState('')
  const [bye,setBye]=useState(false)
  const navigate = useNavigate();
  const withdraw = () => {
    if (text.split('/')[0]!== '유저' || text.split('/')[1] !== '회원탈퇴'){
        setErr(true);
    }
    else {
        // 백엔드 에 따라 수정할 곳
        
        axios({
            method:'delete',
            url:'http://localhost:8080/user/delete'
        })
        .then(res =>{
            console.log(res)
            setBye(true)
            setTimeout(() => {
                navigate('/login')
            }, 2000);
        })
        .catch(err => {
            console.log(err)
        })
    }
  }
  return (
    <div>
        {bye ? 
        <div className={withdraw_css.bye_modal}>
            <h1 style={{marginBottom:'0'}}><span style={{color:'red'}}>회원탈퇴</span> 처리가 완료되었습니다.</h1>
            <h1>이용해주셔서 감사합니다.</h1>
            <p>* 잠시 후, 로그인 페이지로 이동됩니다.</p>
        </div>
        :
        <div className={withdraw_css.withdraw_modal}>
            <div className={withdraw_css.two_btn}>
                <span onClick={()=> {onBack()}}>뒤로가기</span>
                <span onClick={()=>{onClose()}}>닫기</span>
                </div>
            <h1 style={{color:'red', fontSize:'40px', marginBottom:'20px'}}>회원탈퇴</h1>
            <br />
            <p>* 회원탈퇴 시 계정 복구가 불가능합니다.</p>
            <p>* 회원탈퇴를 원하시면 양식에 맞추어 입력해주세요. ex) 김싸피/회원탈퇴</p>
            <br />

            <input className={withdraw_css.input} type="text" value={text} onChange={(e)=>{setErr(false); setText(e.target.value);}} />
            <br />
            <div className={withdraw_css.btn}>
                <button onClick={withdraw}>탈퇴</button>
                <button onClick={onBack}>취소</button>
            </div>
            {Err ? <p style={{color:'red'}}>양식에 맞게 입력해주세요</p>:null}
        </div>
        }
    </div>
    
  );
};

export default Withdraw;
