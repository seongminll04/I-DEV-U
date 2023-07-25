import Phaser from 'phaser';

type AssetKeys = 'A2' | 'B2' | 'C2' | 'D2' | 'E2' | 'F2' | 'G2' | 'H2' | 'I2' | 'J2' |
                 'K2' | 'L2' | 'M2' | 'N2' | 'O2' | 'P2' | 'Q2' | 'R2' | 'S2' | 'T2' |
                 'U2' | 'V2' | 'W2' | 'X2' | 'Y2' | 'Z2' | 'a2' | 'b2' | 'c2' | 'd2' |
                 'e2';
const ASSETS: Record<AssetKeys, string> = {
  'A2': '/assets/M1-B1.png',
  'B2': '/assets/M1-C1.png',
  'C2': '/assets/M1-A1.png',
  'D2': '/assets/M1-A2.png',
  'E2': '/assets/M1-A3.png',
  'F2': '/assets/M1-A4.png',
  'G2': '/assets/왼울타길.png',
  'H2': '/assets/오울타길.png',
  'I2': '/assets/위울타길.png',
  'J2': '/assets/아울타길.png',
  'K2': '/assets/좌상.png',
  'L2': '/assets/좌하.png',
  'M2': '/assets/우상.png',
  'N2': '/assets/우하.png',
  'O2': '/assets/M1-A5.png',
  'P2': '/assets/M1-A6.png',
  'Q2': '/assets/M1-A7.png',
  'R2': '/assets/M1-A8.png',
  'S2': '/assets/M1-A9.png',
  'T2': '/assets/M1-A10.png',
  'U2': '/assets/M1-A11.png',
  'V2': '/assets/M1-A12.png',
  'W2': '/assets/M1-A13.png',
  'X2': '/assets/M1-A14.png',
  'Y2': '/assets/M1-A15.png',
  'Z2': '/assets/M1-A16.png',
  'a2': '/assets/봄나무5.png',
  'b2': '/assets/봄나무6.png',
  'c2': '/assets/봄나무7.png',
  'd2': '/assets/분수대.png',
  'e2': '/assets/벤치2.png',
};

const pattern = `
B2K2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2I2B2
B2G2A2A2A2A2A2c2A2A2A2A2b2A2A2A2A2c2A2A2A2A2b2A2A2A2A2c2A2A2A2A2b2A2A2A2A2c2A2A2A2A2b2A2A2A2A2A2A2A2d2A2A2A2A2A2c2A2A2A2A2b2A2A2A2A2c2A2A2A2A2b2A2A2A2A2c2A2A2A2A2b2A2A2A2A2c2A2A2A2A2b2A2A2A2A2A2A2A2A2H2B2
B2G2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2H2B2
B2G2a2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2a2A2A2A2H2B2
B2G2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2e2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2H2B2
B2G2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2A2H2B2
B2F2C2D2E2F2C2D2E2F2C2D2E2F2C2D2E2F2C2D2E2F2C2D2E2F2C2D2E2F2C2D2E2F2C2D2E2F2C2D2E2F2C2D2E2F2C2D2E2F2C2D2E2F2C2D2E2F2C2D2E2F2C2F2C2D2E2F2C2D2E2F2C2D2E2F2C2D2E2F2C2D2E2F2C2D2E2F2C2D2E2F2C2D2E2F2C2D2E2F2C2B2
B2R2O2P2Q2R2O2P2Q2R2O2P2Q2R2O2P2Q2R2O2P2Q2R2O2P2Q2R2O2P2Q2R2O2P2Q2R2O2P2Q2R2O2P2Q2R2O2P2Q2R2O2P2Q2R2O2P2Q2R2O2P2Q2R2O2P2Q2R2O2R2O2P2Q2R2O2P2Q2R2O2P2Q2R2O2P2Q2R2O2P2Q2R2O2P2Q2R2O2P2Q2R2O2P2Q2R2O2P2Q2R2O2B2
B2V2S2T2U2V2S2T2U2V2S2T2U2V2S2T2U2V2S2T2U2V2S2T2U2V2S2T2U2V2S2T2U2V2S2T2U2V2S2T2U2V2S2T2U2V2S2T2U2V2S2T2U2V2S2T2U2V2S2T2U2V2S2V2S2T2U2V2S2T2U2V2S2T2U2V2S2T2U2V2S2T2U2V2S2T2U2V2S2T2U2V2S2T2U2V2S2T2U2V2S2B2
B2Z2W2X2Y2Z2W2X2Y2Z2W2X2Y2Z2W2X2Y2Z2W2X2Y2Z2W2X2Y2Z2W2X2Y2Z2W2X2Y2Z2W2X2Y2Z2W2X2Y2Z2W2X2Y2Z2W2X2Y2Z2W2X2Y2Z2W2X2Y2Z2W2X2Y2Z2W2Z2W2X2Y2Z2W2X2Y2Z2W2X2Y2Z2W2X2Y2Z2W2X2Y2Z2W2X2Y2Z2W2X2Y2Z2W2X2Y2Z2W2X2Y2Z2W2B2
B2L2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2L2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2B2
`;

export class Msize1Scene extends Phaser.Scene {

    private character?: Phaser.Physics.Arcade.Sprite;
    private character2?: Phaser.Physics.Arcade.Sprite;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private walls?: Phaser.Physics.Arcade.StaticGroup;

    private thing?: Phaser.Physics.Arcade.Sprite;

    private sittingOnBench: boolean = false; // 현재 앉아있니?
  
    constructor() {
      super({ key: 'Msize1Scene' });
      
    }
  
    preload() {
      for (let char in ASSETS) {
        this.load.image(char, (ASSETS as Record<string, string>)[char]);
      }

      // 타일 이미지 로드
      this.load.image('character', 'assets/admin_character.png');
      this.load.image('character2', 'assets/admin_character.png');
    }
  
    create() {
      const rows = pattern.trim().split('\n');
      const tileSize = 32;  // 타일 크기 설정
  
      this.walls = this.physics.add.staticGroup();
  
      // const mapCenterX = rows[0].length * tileSize / 2;
      const mapCenterY = rows.length * tileSize / 2;

      this.character = this.physics.add.sprite(52, mapCenterY + 72, 'character').setOrigin(0.5, 0.5);
      this.physics.add.collider(this.character, this.walls);  // 캐릭터와 벽 사이의 충돌 설정
      this.character?.setDepth(2); // 캐릭터부터 생성했으니 depth를 줘야 캐릭터가 화면에 보임

      this.character2 = this.physics.add.sprite(3210, mapCenterY + 72, 'character2').setOrigin(0.5, 0.5);
      this.physics.add.collider(this.character2, this.walls);
      this.character2.setDepth(2);


      this.cursors = this.input.keyboard?.createCursorKeys();
      this.cameras.main.startFollow(this.character);
      // this.physics.world.createDebugGraphic();  // 디버그 그래픽

      rows.forEach((row, rowIndex) => {
        for (let colIndex = 0; colIndex < row.length; colIndex += 2) {
          const tileID = row.substring(colIndex, colIndex + 2) as AssetKeys;
          
          if (ASSETS[tileID]) {
            if (tileID === 'B2' || tileID === 'G2' || tileID === 'H2' || tileID === 'I2' || tileID === 'J2' ||
                tileID === 'K2' || tileID === 'L2' || tileID === 'M2' || tileID === 'N2') {
              const wallTile = this.walls?.create((colIndex / 2) * tileSize + tileSize / 2, rowIndex * tileSize + tileSize / 2, tileID);
              wallTile.setSize(tileSize, tileSize);
            }
            else if (tileID ==='A2' || tileID === 'C2' || tileID === 'D2' || tileID === 'E2' || tileID === 'F2' ||
                    tileID ==='O2' || tileID === 'P2' || tileID === 'Q2' || tileID === 'R2' || tileID === 'S2' ||
                    tileID ==='T2' || tileID === 'U2' || tileID === 'V2' || tileID === 'W2' || tileID === 'X2' ||
                    tileID ==='Y2' || tileID === 'Z2'
            ) 
            {
            this.add.image((colIndex / 2) * tileSize, rowIndex * tileSize, tileID).setOrigin(0, 0);
            } else if (tileID === 'a2') {
              this.thing = this.physics.add.sprite((colIndex / 2) * tileSize, rowIndex * tileSize, tileID);
              this.thing.setOrigin(0, 0).setDisplaySize(128, 96).setImmovable(true);
              this.physics.add.collider(this.character!, this.thing);
              this.thing.setDepth(1);
            } else if (tileID === 'b2') {
              this.thing = this.physics.add.sprite((colIndex / 2) * tileSize, rowIndex * tileSize, tileID);
              this.thing.setOrigin(0, 0).setDisplaySize(128, 160).setImmovable(true);
              this.physics.add.collider(this.character!, this.thing);
              this.thing.setDepth(1);
            } else if (tileID === 'c2') {
              this.thing = this.physics.add.sprite((colIndex / 2) * tileSize, rowIndex * tileSize, tileID);
              this.thing.setOrigin(0, 0).setDisplaySize(128, 160).setImmovable(true);
              this.physics.add.collider(this.character!, this.thing);
              this.thing.setDepth(1);
            } else if (tileID === 'd2') {
              this.thing = this.physics.add.sprite((colIndex / 2) * tileSize, rowIndex * tileSize, tileID);
              this.thing.setOrigin(0, 0).setDisplaySize(96, 96).setImmovable(true);
              this.physics.add.collider(this.character!, this.thing);
              this.thing.setDepth(1);
            } else if (tileID === 'e2') {
              this.thing = this.physics.add.sprite((colIndex / 2) * tileSize, rowIndex * tileSize, tileID);
              this.thing.setOrigin(0, 0).setDisplaySize(96, 64).setImmovable(true);
              this.physics.add.collider(this.character!, this.thing);
              this.thing.setDepth(1);
            }
          }
          }
      });

      this.input.keyboard?.on('keydown-E', () => {
        this.sitdown();
      });

    }
  
    update() {

    //   if (this.cursors && this.myCharacter) {
    //     let movingSprite: Phaser.Physics.Arcade.Sprite;

    //     if (this.myCharacter === 'character') {
    //         movingSprite = this.character!;
    //     } else if (this.myCharacter === 'character2') {
    //         movingSprite = this.character2!;
    //     }

    //     if (this.cursors.left?.isDown) {
    //         movingSprite.setVelocityX(-1280);
    //     } else if (this.cursors.right?.isDown) {
    //         movingSprite.setVelocityX(1280);
    //     } else {
    //         movingSprite.setVelocityX(0);
    //     }

    //     if (this.cursors.up?.isDown) {
    //         movingSprite.setVelocityY(-1280);
    //     } else if (this.cursors.down?.isDown) {
    //         movingSprite.setVelocityY(1280);
    //     } else {
    //         movingSprite.setVelocityY(0);
    //     }

    //     // 움직임을 서버에 전송
    //     this.socket?.emit('playerMovement', {
    //         id: this.socket.id,
    //         character: this.myCharacter,
    //         x: movingSprite.x,
    //         y: movingSprite.y
    //     });
    // }

      if (this.cursors && this.character && !this.sittingOnBench) {
        let moved = false;
        if (this.cursors.left?.isDown) {
          this.character.setVelocityX(-1280);
          moved = true;
        } else if (this.cursors.right?.isDown) {
          this.character.setVelocityX(1280);
          moved = true;
        } else {
          this.character.setVelocityX(0);
        }
    
        if (this.cursors.up?.isDown) {
          this.character.setVelocityY(-1280);
          moved = true;
        } else if (this.cursors.down?.isDown) {
          this.character.setVelocityY(1280);
          moved = true;
        } else {
          this.character.setVelocityY(0);
        }
    
        if (moved) {
        }
      }
    }

    private isNear(): boolean {     //캐릭터가 문 주변에 있는가?
      if (this.character) {            
          const benchCenterX = 1650;  // 벤치중심 X 좌표
          const benchCenterY = 150;  // 벤치중심 Y 좌표

          const minX = benchCenterX - 32;
          const maxX = benchCenterX + 32;
          const minY = benchCenterY;
          const maxY = benchCenterY + 96; //캐릭터 다시 만들고 조정해줘야함
          
          const charX = this.character.x;
          const charY = this.character.y;
          
          if (charX >= minX && charX <= maxX && charY >= minY && charY <= maxY) {
            return true;
        }
      }
      return false;  // 캐릭터가 없는 경우, 문 주변에 없다고 가정하고 false
  }

    sitdown(){
      if (!this.isNear()) {
        return;  // 밴치주변에 없으면 놉
      }
      else if(this.sittingOnBench){ //이미 앉아있으면
        this.character!.y += 64;
        this.character!.setAlpha(1);
        this.sittingOnBench = false;
      }
      else{ //앉아있지않으면
      this.character!.y -= 64;
      this.character!.setAlpha(0.4);
      this.sittingOnBench = true;
      }
    }
  }
  