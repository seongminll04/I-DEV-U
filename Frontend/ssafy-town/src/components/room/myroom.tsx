import React,{useState, useEffect} from 'react';
import ssafytown_css from '../ssafytown.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../store/state';
import { setModal } from '../../store/actions';

import { Ssize1Scene } from '../map/Ssize1Scene';
import { Lsize1Scene } from '../map/Lsize1Scene';
import { Msize1Scene } from '../map/Msize1Scene';

const Myroom: React.FC = () => {
  const [game, setGame] = useState<Phaser.Game | null>(null);
  const isSidebarOpen = useSelector((state: AppState) => state.isSidebarOpen);//사이드바 오픈여부
  const isModalOpen = useSelector((state: AppState) => state.isModalOpen);// 모달창 오픈여부 (알림, 로그아웃)

  const isAllowMove = useSelector((state: AppState) => state.isAllowMove);

  // 맵전환에 대한건 나중에 없앨 수도?
  const [currentScene, setCurrentScene] = useState<'Ssize1Scene' | 'Lsize1Scene' | 'Msize1Scene'>('Ssize1Scene'); //맵
  const switchToSsize1Scene = () => {
    if (game) {
      game.scene.switch(currentScene, 'Ssize1Scene');
      setCurrentScene('Ssize1Scene');
    }
  };

  const switchToLsize1Scene = () => {
    if (game) {
      game.scene.switch(currentScene, 'Lsize1Scene');
      setCurrentScene('Lsize1Scene');
    }
  };

  const switchToMsize1Scene = () => {
    if (game) {
      game.scene.switch(currentScene, 'Msize1Scene');
      setCurrentScene('Msize1Scene');
    }
  };
  const dispatch = useDispatch();

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
      scene: [Ssize1Scene, Lsize1Scene, Msize1Scene], //맵들 여기 다넣으면됨
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
    if (game?.isPaused!== undefined) {
      if (isModalOpen || !isAllowMove) {
        game.isPaused=true
      }
      else {
        game.isPaused=false
      }
    }

    game?.events.on("openModal", () => {
      dispatch(setModal('로그아웃'));
    });
    game?.events.on("openModal2", () => {
      dispatch(setModal('QnA게시판'));
    });

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
  }, [isModalOpen,isSidebarOpen, isAllowMove, game, dispatch]);
  return (
    <div id="phaser_game" className={ssafytown_css.phaser_game} >
        <button className={ssafytown_css.map_switch_button2} onClick={switchToSsize1Scene}>Ssize1Scene</button>
        <button className={ssafytown_css.map_switch_button3} onClick={switchToLsize1Scene}>Lsize1Scene</button>
        <button className={ssafytown_css.map_switch_button4} onClick={switchToMsize1Scene}>Msize1Scene</button>
    </div>
  );
}

export default Myroom;
