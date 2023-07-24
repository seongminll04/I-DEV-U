import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Phaser from 'phaser';
import ssafytown_css from './ssafytown.module.css';
import FirstQA from './survey/firstQA';
import axios from 'axios';

import Alert from './sidebar/1alert';
import Sogae from './sidebar/2sogae';
import Mate from './sidebar/3mate';
import Project from './sidebar/4project';
import Chat from './sidebar/5chat';
import Cam from './sidebar/6cam';
import Follow from './sidebar/7follow';
import MyPage from './sidebar/8mypage';
import Setting from './sidebar/9setting';
import Logout from './sidebar/10logout';
//사이드바 리스트

import { Ssize1Scene } from './map/Ssize1Scene';
import { Lsize1Scene } from './map/Lsize1Scene';
import { Msize1Scene } from './map/Msize1Scene';
//맵 리스트

class MainScene extends Phaser.Scene {
  private character?: Phaser.Physics.Arcade.Sprite;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    this.load.image('map', 'assets/bigmap.png');
    this.load.image('character', 'assets/admin_character.png');
  }

  create() {
    this.add.image(1000, 1000, 'map');

    this.character = this.physics.add.sprite(1000, 1000, 'character');
    this.character.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard?.createCursorKeys();

    this.cameras.main.setBounds(0, 0, 2000, 2000);
    this.cameras.main.startFollow(this.character);

    this.physics.world.setBounds(0, 0, 2000, 2000);
  }

  update() {
    if (this.cursors && this.character) {
      if (this.cursors.left?.isDown) {
        this.character.setVelocityX(-1280);
      } else if (this.cursors.right?.isDown) {
        this.character.setVelocityX(1280);
      } else {
        this.character.setVelocityX(0);
      }

      if (this.cursors.up?.isDown) {
        this.character.setVelocityY(-1280);
      } else if (this.cursors.down?.isDown) {
        this.character.setVelocityY(1280);
      } else {
        this.character.setVelocityY(0);
      }
    }
  }
}

const Town: React.FC = () => {
  const navigate = useNavigate(); //페이지 이동 navigate
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [game, setGame] = useState<Phaser.Game | null>(null);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const [isFirstQAModalOpen, setFirstQAModalOpen] = useState(false);  // 첫 설문
  const [currentScene, setCurrentScene] = useState<'MainScene' | 'Ssize1Scene' | 'Lsize1Scene' | 'Msize1Scene'>('MainScene'); //맵

  const switchToMainScene = () => {
    if (game) {
      game.scene.switch(currentScene, 'MainScene');
      setCurrentScene('MainScene');
    }
  };

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

  const checkFirstSurvey = async () => {
    try {
      const response = await axios.get('/api/check_survey');
      if (response.data.need_survey) {
        setFirstQAModalOpen(true);
      }
    } catch (error) {
      console.error("설문 찾기 실패", error);
      setFirstQAModalOpen(true);  //우선 지금은 백엔드 연결안한상태로 무조건 첫설문이 뜨게하자. 개발할때 거슬리면 이문장 주석처리하면됨
    }
  }; //첫 설문 했는지 확인

  const handleFirstQAClose = () => {
    setFirstQAModalOpen(false);
  }

  const handleFirstQASubmit = async (surveyResults: any) => {
    try {
      // 여기에 설문 결과를 서버에 제출하는 코드를 작성
      // 예: const response = await axios.post('/api/submit_survey', surveyResults);

      // 제출 후에는 모달을 끄기
      setFirstQAModalOpen(false);
    } catch (error) {
      console.error("설문 제출 실패", error);
    }
  }

  const [isAlertModalOpen, setAlertModalOpen] = useState(false);

  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: "phaser_game",
      width: window.innerWidth * (isSidebarOpen ? 0.7 : 0.95),
      height: window.innerHeight,
      physics: {
        default: 'arcade',
      },
      scene: [MainScene, Ssize1Scene, Lsize1Scene, Msize1Scene], //맵들 여기 다넣으면됨
    };

    const newGame = new Phaser.Game(config);
    setGame(newGame);

    checkFirstSurvey();

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
  }, [isSidebarOpen, game]);
  
  

  const toggleSidebar = (iconName: string) => {
    if (iconName === selectedIcon) {
      // 현재 선택된 아이콘과 같은 아이콘을 다시 클릭했을 때 네비게이션바 닫음
      setSidebarOpen(false);
      setSelectedIcon(null);
    } else {
      // 다른 아이콘을 클릭했을 때 다른 네비게이션바 바로뜸
      setSidebarOpen(true);
      setSelectedIcon(iconName);
    }
  };

  const handleLogoutOpen = () => {
    setLogoutModalOpen(true);
  }

  const handleLogoutClose = () => {
    setLogoutModalOpen(false);
  }
  const handleAlertOpen = () => {
    setAlertModalOpen(true);
  }

  const handleAlertClose = () => {
    setAlertModalOpen(false);
  }

  const handleLogoutConfirm = () => {
    setLogoutModalOpen(false);
    //로그아웃 나중에 로컬 토큰 삭제하는 것 추가
    navigate("/");
  }
  const [mypagemodal, setmypagemodal] = useState(false);
  const handlemypagemodal = (value:boolean) => {
    // 자식 컴포넌트로부터 전달된 값을 받아서 처리
    setmypagemodal(value);
  };
  const icons = [
    { name: '/', content: '' },
    { name: '소개팅', content: <Sogae /> },
    { name: '동료', content: <Mate /> },
    { name: '프로젝트', content: <Project /> },
    { name: '/', content: '' },
    { name: '채팅', content: <Chat /> },
    { name: '화상', content: <Cam /> },
    { name: '팔로우', content: <Follow /> },
    { name: '/', content: '' },
    { name: '마이페이지', content: <MyPage onmodalChange={handlemypagemodal}/> },
    { name: '설정', content: <Setting /> },
  ];

  return (
    <div id="game_container" className={ssafytown_css.game_container} tabIndex={0} onKeyDown={(e:React.KeyboardEvent)=>{
      if (e.key==='Escape' && !isAlertModalOpen && !isLogoutModalOpen && !isFirstQAModalOpen && !mypagemodal) {setSidebarOpen(false); setSelectedIcon(null);}
    }} >
      <div id="sidebar" className={ssafytown_css.sidebar}>
        <img style={{marginTop:'20px'}} src={`assets/사이드바/알림.png`} alt={`알림 icon`} onClick={() => handleAlertOpen()} />
        {icons.map((icon, index) => 
          icon.name === '/' ? 
          <hr key={index} /> : 
          <img src={`assets/사이드바/${icon.name}.png`} alt={`${icon.name} icon`} key={index} onClick={() => toggleSidebar(icon.name)} />
        )}
        <img style={{marginBottom:'20px'}} src={`assets/사이드바/로그아웃.png`} alt={`로그아웃 icon`} onClick={() => handleLogoutOpen()} />
      </div>
      {isSidebarOpen && <div id="navigation_bar" className={ssafytown_css.navigation_bar}>
        {icons.find(icon => icon.name === selectedIcon)?.content}
      </div>}
      <div id="phaser_game" onClick={()=> {if(isSidebarOpen){setSidebarOpen(false)}}}>
        <button className={ssafytown_css.map_switch_button} onClick={switchToMainScene}>개발용</button>
        <button className={ssafytown_css.map_switch_button2} onClick={switchToSsize1Scene}>Ssize1Scene</button>
        <button className={ssafytown_css.map_switch_button3} onClick={switchToLsize1Scene}>Lsize1Scene</button>
        <button className={ssafytown_css.map_switch_button4} onClick={switchToMsize1Scene}>Msize1Scene</button>
      </div>
  
      <div id="phaser_game" className={ssafytown_css.phaser_game} onClick={()=> {if(isSidebarOpen){setSidebarOpen(false)}}} />
      <Alert isOpen={isAlertModalOpen} onClose={handleAlertClose} />
      <Logout isOpen={isLogoutModalOpen} onClose={handleLogoutClose} onLogout={handleLogoutConfirm}/>
      <FirstQA isOpen={isFirstQAModalOpen} onClose={handleFirstQAClose} onConfirm={handleFirstQASubmit}/>
    </div>
  );
};

export default Town;
