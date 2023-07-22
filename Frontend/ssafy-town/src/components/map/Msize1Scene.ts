import Phaser from 'phaser';

type AssetKeys = 'A2' | 'B2' | 'C2' | 'D2' | 'E2' | 'F2' | 'G2' | 'H2' | 'I2' | 'J2' | 'K2';
const ASSETS: Record<AssetKeys, string> = {
  'A2': '/assets/L1-B1.png',
  'B2': '/assets/L1-C4.png',
  'C2': '/assets/L1-A8.png',
  'D2': '/assets/침대4.png',
  'E2': '/assets/테이블1.png',
  'F2': '/assets/장롱1.png',
  'G2': '/assets/게시판1.png',
  'H2': '/assets/러그1.png',
  'I2': '/assets/컴퓨터1.png',
  'J2': '/assets/식물1.png',
  'K2': '/assets/에어컨1.png',
};

const pattern = `
B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2
B2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2B2
B2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2B2
B2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2B2
B2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2B2
B2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2B2
B2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2B2
B2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2B2
B2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2B2
B2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2B2
B2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2B2
B2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2B2
B2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2B2
B2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2B2
B2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2B2
B2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2B2
B2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2B2
B2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2B2
B2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2B2
B2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2B2
B2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2B2
B2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2B2
B2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2C2B2
B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2B2
`;

export class Msize1Scene extends Phaser.Scene {

    private character?: Phaser.Physics.Arcade.Sprite;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private walls?: Phaser.Physics.Arcade.StaticGroup;
  
    constructor() {
      super({ key: 'Msize1Scene' });
    }
  
    preload() {
      for (let char in ASSETS) {
        this.load.image(char, (ASSETS as Record<string, string>)[char]);
      }

      // 타일 이미지 로드
      this.load.image('character', 'assets/admin_character.png');
    }
  
    create() {
      const rows = pattern.trim().split('\n');
      const tileSize = 32;  // 타일 크기 설정
  
      this.walls = this.physics.add.staticGroup();
  
      const mapCenterX = rows[0].length * tileSize / 2;
      const mapCenterY = rows.length * tileSize / 2;
  
      this.character = this.physics.add.sprite(mapCenterX -384, mapCenterY, 'character');
      this.character.setCollideWorldBounds(true);
      this.physics.add.collider(this.character, this.walls);
      this.cursors = this.input.keyboard?.createCursorKeys();
      this.cameras.main.startFollow(this.character);
      this.character?.setDepth(1);
  
      rows.forEach((row, rowIndex) => {
        for (let colIndex = 0; colIndex < row.length; colIndex += 2) {
          const tileID = row.substring(colIndex, colIndex + 2) as AssetKeys;
          
          if (ASSETS[tileID]) {
            if (tileID === 'A2' || tileID === 'B2') {
              const wallTile = this.walls?.create((colIndex / 2) * tileSize + tileSize / 2, rowIndex * tileSize + tileSize / 2, tileID);
              wallTile.setSize(tileSize, tileSize);
            }
            else {
            this.add.image((colIndex / 2) * tileSize, rowIndex * tileSize, tileID).setOrigin(0, 0);
          }
        }
      }
      });
    }
  
    update() {
      if (this.cursors && this.character) {
        if (this.cursors.left?.isDown) {
          this.character.setVelocityX(-320);
        } else if (this.cursors.right?.isDown) {
          this.character.setVelocityX(320);
        } else {
          this.character.setVelocityX(0);
        }
  
        if (this.cursors.up?.isDown) {
          this.character.setVelocityY(-320);
        } else if (this.cursors.down?.isDown) {
          this.character.setVelocityY(320);
        } else {
          this.character.setVelocityY(0);
        }
      }
    }
  }
  