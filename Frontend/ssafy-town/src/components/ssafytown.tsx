import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Phaser from 'phaser';
import ssafytown_css from './ssafytown.module.css';

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

let character: Phaser.Physics.Arcade.Sprite;
let cursors: Phaser.Types.Input.Keyboard.CursorKeys;

function preload(this: Phaser.Scene) {
  this.load.image('map', 'assets/bigmap.png');
  this.load.image('character', 'assets/admin_character.png');
  console.log("ok")
}

function create(this: Phaser.Scene) {
  this.add.image(1000, 1000, 'map'); 

  character = this.physics.add.sprite(1000, 1000, 'character'); 
  character.setCollideWorldBounds(true);

  if (this.input.keyboard) {
    cursors = this.input.keyboard.createCursorKeys();
  
    this.cameras.main.setBounds(0, 0, 2000, 2000);
    this.cameras.main.startFollow(character); 
  
    this.physics.world.setBounds(0, 0, 2000, 2000); 
  }
}

function update(this: Phaser.Scene) {
  if (cursors.left?.isDown) {
    character.setVelocityX(-1280);
  } else if (cursors.right?.isDown) {
    character.setVelocityX(1280);
  } else {
    character.setVelocityX(0);
  }

  if (cursors.up?.isDown) {
    character.setVelocityY(-1280);
  } else if (cursors.down?.isDown) {
    character.setVelocityY(1280);
  } else {
    character.setVelocityY(0);
  }
}

const Town: React.FC = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [game, setGame] = useState<Phaser.Game | null>(null);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: "phaser_game",
      width: window.innerWidth * (isSidebarOpen ? 0.7 : 0.85),
      height: window.innerHeight,
      physics: {
        default: 'arcade',
      },
      scene: {
        preload: preload,
        create: create,
        update: update,
      },
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
      game.scale.resize(window.innerWidth * (isSidebarOpen ? 0.8 : 0.95), window.innerHeight);
    }
  }, [isSidebarOpen, game]);

  const toggleSidebar = (iconName: string) => {
    setSidebarOpen(!isSidebarOpen);
    setSelectedIcon(iconName);
  };

  const handleLogoutOpen = () => {
    setLogoutModalOpen(true);
  }

  const handleLogoutClose = () => {
    setLogoutModalOpen(false);
  }

  const handleLogoutConfirm = () => {
    setLogoutModalOpen(false);
    navigate("/");
  }
  
  const icons = [
    { name: '알림', content: <Alert /> },
    { name: '/', content: '' },
    { name: '소개팅', content: <Sogae /> },
    { name: '동료', content: <Mate /> },
    { name: '프로젝트', content: <Project /> },
    { name: '/', content: '' },
    { name: '채팅', content: <Chat /> },
    { name: '화상', content: <Cam /> },
    { name: '팔로우', content: <Follow /> },
    { name: '/', content: '' },
    { name: '마이페이지', content: <MyPage /> },
    { name: '설정', content: <Setting /> },
  ];

  return (
    <div id="game_container" className={ssafytown_css.game_container}>
      <div id="sidebar" className={ssafytown_css.sidebar}>
        {icons.map((icon, index) => 
          icon.name === '/' ? 
          <hr key={index} /> : 
          <img src={`assets/사이드바/${icon.name}.png`} alt={`${icon.name} icon`} key={index} onClick={() => toggleSidebar(icon.name)} />
        )}
        <img src={`assets/사이드바/로그아웃.png`} alt={`로그아웃 icon`} onClick={() => handleLogoutOpen()} />
      </div>
      {isSidebarOpen && <div id="navigation_bar" className={ssafytown_css.navigation_bar}>
        {icons.find(icon => icon.name === selectedIcon)?.content}
      </div>}
  
      {/* {isLogoutModalOpen && 
        <div>
          <p>정말 로그아웃 하시겠습니까?</p>
          <button onClick={handleLogoutConfirm}>네</button>
          <button onClick={() => setLogoutModalOpen(false)}>아니오</button>
        </div>
      } */}
      <div id="phaser_game" className={ssafytown_css.phaser_game} />
      <Logout isOpen={isLogoutModalOpen} onClose={handleLogoutClose} onLogout={handleLogoutConfirm}/>
    </div>
  );
};

export default Town;
