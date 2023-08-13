import React,{useState, useEffect} from 'react';
import ssafytown_css from '../system/ssafytown.module.css';

import Sidebar from '../system/sidebar'
import Navbar from '../system/navbar'

import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../store/state';
import { setAllowMove, setModal, setSidebar } from '../../store/actions';

import {useNavigate} from 'react-router-dom'
import { Ssize1Scene } from '../map/Ssize1Scene';
import ModalOpen from '../system/modalopen';
// import Cam from '../openvidu/cam/cam'
import axios from 'axios';

const MyRoom: React.FC = () => {
  const [game, setGame] = useState<Phaser.Game | null>(null);
  const isSidebarOpen = useSelector((state: AppState) => state.isSidebarOpen);//사이드바 오픈여부
  const isModalOpen = useSelector((state: AppState) => state.isModalOpen);// 모달창 오픈여부 (알림, 로그아웃)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(()=>{

    const userIdxStr = localStorage.getItem('userIdx')
    var userIdx:number|null;
    if (userIdxStr) {userIdx=parseInt(userIdxStr,10)} else {userIdx=null}
    
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      axios({
        method:'get',
        url:`https://i9b206.p.ssafy.io:9090/basicSurvey/${userIdx}`,
        headers : {
          Authorization: 'Bearer ' + userToken
        },
      })
      .then(res => {
        if (res.data.data.survey==='NO') {
          dispatch(setModal('최초설문'))
        }
      })
      .catch(err => {
        console.log(err)
      })

    }
    else {navigate('/login')}
  },[dispatch, navigate])


  useEffect(() => { //esc키로 사이드바, 모달창 끄기 : 전역설정임
    if (isModalOpen) {
      dispatch(setAllowMove(false))
    }
    else {dispatch(setAllowMove(true))}

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isModalOpen === '최초설문') {}
        else if (isModalOpen !== null) {dispatch(setModal(null))}
        else if (isSidebarOpen !== null) {dispatch(setSidebar(null))}
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };

  }, [dispatch,isModalOpen,isSidebarOpen]);

  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: "phaser_game",
      width: window.innerWidth * (isSidebarOpen ? 0.7 : 0.95),
      height: window.innerHeight,
      physics: {
        default: 'arcade',
      },
      pixelArt: true, //  픽셀 아트 스타일의 게임에서 그래픽이 더 깔끔하고 정확하게 표시되도록 도와줍니다. 라네요
      scene: Ssize1Scene
    };

    const newGame = new Phaser.Game(config);
    setGame(newGame);

    return () => {
      newGame.destroy(true);
    }

    // 아래 주석은 문제가 없는데 에러가 나올때 넣는 주석
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(game) {
      const resize = () => {
        const width = window.innerWidth * (isSidebarOpen ? 0.7 : 0.95);
        const height = window.innerHeight;
        game.scale.resize(width, height);
        game.scene.scenes[0].cameras.main.setViewport(0, 0, width, height);
      }
      
      window.addEventListener('resize', resize);
      resize();
  
      return () => {
        window.removeEventListener('resize', resize);
      };
    }
  }, [isModalOpen,isSidebarOpen, game, dispatch]);

  return (
    <div className={ssafytown_css.container}>
      <Sidebar/>
      {isSidebarOpen ? <Navbar /> : null}
      <ModalOpen />
      <div id="phaser_game" className={ssafytown_css.phaser_game} >
          <div id="my-video-container" className={ssafytown_css.my_video_bar}></div>
          <div id="videoContainer" className={ssafytown_css.op_video_bar}> </div>
          {/* <div className={ssafytown_css.video_bar}><Cam /></div> */}
      </div>
    </div>
  );
}

export default MyRoom;
