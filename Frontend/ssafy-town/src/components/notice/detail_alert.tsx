import React, { useState, useEffect } from 'react';
import alert_css from '../sidebar/1alert.module.css';
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { setModal } from '../../store/actions';

interface Props {
  backpage: () => void;
  alertIdx: number;
}

interface Alert {
  idx: number;
  content: string;
  createdAt: string;
}

const DetailAlert: React.FC<Props> = ({ backpage, alertIdx }) => {
  const dispatch = useDispatch()
  const userToken = localStorage.getItem('userToken')
  const [alert, setAlert] = useState<Alert>();
  useEffect(() => {
    axios({
      method: 'get',
      url: `https://i9b206.p.ssafy.io:9090/noti/${alertIdx}`,
      headers: {
        Authorization: 'Bearer ' + userToken
      },
    })
      .then(res => {
        console.log(res)
        setAlert(res.data.alert)
      })
      .catch(err => console.log(err))
  }, [alertIdx, userToken, setAlert])

  return (
    <div className={alert_css.alert_modal}>
      <div className={alert_css.buttons}>
        <p className={alert_css.backbtn} onClick={backpage}>돌아가기</p>
        <p className={alert_css.closebtn} onClick={() => { dispatch(setModal(null)) }}>닫기</p>
      </div>
      <br></br>
      <div className={alert_css.alert_detail}>
        {alert ? (
          <>
            <p>{alert?.content}</p>
            <p className={alert_css.alert_date}>
              {(() => {
                const date = new Date(alert.createdAt);
                return `${date.getFullYear().toString().substring(2)}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
              })()}
            </p>
          </>
        ) : (
          'Loading...'
        )}
      </div>
    </div>
  );
};

export default DetailAlert;