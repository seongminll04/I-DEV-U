import './ssafytown.css';
import React, { useEffect } from 'react';
import Phaser from 'phaser';

let character;
let cursors;

function preload() {
  this.load.image('map', 'assets/bigmap.png');
  this.load.image('character', 'assets/12.png');
  console.log("ok")
}

function create() {
  this.add.image(1000, 1000, 'map'); // 맵의 중심에 이미지 추가

  character = this.physics.add.sprite(1000, 1000, 'character'); // 캐릭터를 맵의 중앙에 배치
  character.setCollideWorldBounds(true);

  cursors = this.input.keyboard.createCursorKeys();

  this.cameras.main.setBounds(0, 0, 2000, 2000); // 카메라의 범위를 맵의 크기에 맞게 설정
  this.cameras.main.startFollow(character); // 캐릭터를 따라다니도록 설정

  this.physics.world.setBounds(0, 0, 2000, 2000); // 게임 세계의 크기를 맵의 크기에 맞게 설정
}

function update() {
  if (cursors.left.isDown) {
    character.setVelocityX(-1280);
  } else if (cursors.right.isDown) {
    character.setVelocityX(1280);
  } else {
    character.setVelocityX(0);
  }

  if (cursors.up.isDown) {
    character.setVelocityY(-1280);
  } else if (cursors.down.isDown) {
    character.setVelocityY(1280);
  } else {
    character.setVelocityY(0);
  }
}

export const Town = () => {
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      parent: "phaser-game",
      width: window.innerWidth * 0.9,
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

    new Phaser.Game(config);
  }, []);

  return (
    <div id="game-container">
      <div id="sidebar">
        <img src="assets/side.png" alt="icon" />
      </div>
      <div id="phaser-game" />
    </div>
  );
};
