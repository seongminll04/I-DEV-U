import React,{useState, useEffect} from 'react';
import ssafytown_css from '../system/ssafytown.module.css';
import { useNavigate } from 'react-router-dom';

import Sidebar from '../system/sidebar'
import Navbar from '../system/navbar'

import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../store/state';
import { setAllowMove, setModal, setSidebar } from '../../store/actions';

import { Lsize1Scene } from '../map/Lsize1Scene';
import ModalOpen from '../system/modalopen';
// import Cam from '../openvidu/cam/cam'
import Cam2 from '../openvidu/cam/cam2'

const LMeetingRoom: React.FC = () => {
  const [game, setGame] = useState<Phaser.Game | null>(null);
  const isSidebarOpen = useSelector((state: AppState) => state.isSidebarOpen);//사이드바 오픈여부
  const isModalOpen = useSelector((state: AppState) => state.isModalOpen);// 모달창 오픈여부 (알림, 로그아웃)


  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(()=>{
    const userToken = localStorage.getItem('userToken');
    if (!userToken) {navigate('/login')}
  },[navigate])

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
      scene: Lsize1Scene //맵들 여기 다넣으면됨
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

      {/* 사이드바 오픈 */}
      {isSidebarOpen ? <Navbar /> : null}
      <ModalOpen />
      <div id="phaser_game" className={ssafytown_css.phaser_game} >
        <div className={ssafytown_css.video_bar}><Cam2 /></div>
      </div>
    </div>
  );
}

export default LMeetingRoom;
