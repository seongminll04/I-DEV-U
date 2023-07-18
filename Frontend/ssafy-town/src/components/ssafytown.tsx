import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';
import ssafytown_css from './ssafytown.module.css';

let character: Phaser.Physics.Arcade.Sprite;
let cursors: Phaser.Types.Input.Keyboard.CursorKeys;

function preload(this: Phaser.Scene) {
  this.load.image('map', 'assets/bigmap.png');
  this.load.image('character', 'assets/12.png');
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
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [game, setGame] = useState<Phaser.Game | null>(null);

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
      game.scale.resize(window.innerWidth * (isSidebarOpen ? 0.7 : 0.85), window.innerHeight);
    }
  }, [isSidebarOpen, game]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div id="game_container" className={ssafytown_css.game_container}>
      <div id="sidebar" className={ssafytown_css.sidebar}>
        <img src="assets/side.png" alt="icon" onClick={toggleSidebar} />
      </div>
      {isSidebarOpen && <div id="navigation_bar" className={ssafytown_css.navigation_bar}></div>}
      <div id="phaser_game" className={ssafytown_css.phaser_game} />
    </div>
  );
};

export default Town;
