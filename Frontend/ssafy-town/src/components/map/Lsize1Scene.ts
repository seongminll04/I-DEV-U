import Phaser from 'phaser';

// 이미지의 경로를 직접 정의합니다.
const ASSETS = {
  'A': '/assets/L1-B1.png',
  'B': '/assets/L1-C4.png',
  'C': '/assets/L1-A4.png',
  'Z': '/assets/장식용허수코드.png',
};

const pattern = `
BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB
BCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCB
BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBZDDZBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBZDDZBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
BAAAAAAAAAAAAAAAAAAAABAAAAAAAAZDDZAAAAAAAABAAAAAAAAAAAAAAAAAAAAB
BCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCACCCCCCCCCCCCCCCCCCCCACCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCB
BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBCCCCBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
BAAAAAAAAAAAAAAAAAAAAAAAAAAAAACCCCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB
BCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCB
BBBBBBBBBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCCCCCBBBBBBBBBBBBBBBBBBBBBB
BAAAAAAAAAAAAAAAAAAAABCCCCCCCCCCCCCCCCCCCCBAAAAAAAAAAAAAAAAAAAAB
BCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCACCCCCCCCCCCCCCCCCCCCACCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCB
BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
`;

export class Lsize1Scene extends Phaser.Scene {

    private character?: Phaser.Physics.Arcade.Sprite;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private walls?: Phaser.Physics.Arcade.StaticGroup;

    private doorParts: Phaser.GameObjects.Image[] = [];
    private doorOpenTween?: Phaser.Tweens.Tween;
    private doorOpened: boolean = false; // 현재 문의 상태
  
    constructor() {
      super({ key: 'Lsize1Scene' });
    }
  
    preload() {
        for (let char in ASSETS) {
            this.load.image(char, (ASSETS as Record<string, string>)[char]);
        }

        this.load.image('character', 'assets/admin_character.png');

        for (let i = 1; i <= 72; i++) {
            this.load.image('문' + i, 'assets/문' + i + '.png');
        }
    }

    create() {
      const rows = pattern.trim().split('\n');
      const tileSize = 32;  
  
      this.walls = this.physics.add.staticGroup();
  
      rows.forEach((row, rowIndex) => {
        Array.from(row).forEach((char, colIndex) => {
          if ((ASSETS as Record<string, string>)[char]) {
            if (char === 'A' || char === 'B' || char === 'Z' ) {
              const wallTile = this.walls?.create(colIndex * tileSize + tileSize / 2, rowIndex * tileSize + tileSize / 2, char);
              wallTile.setSize(tileSize, tileSize);  // 벽 타일의 크기 설정
            } else {
              this.add.image(colIndex * tileSize, rowIndex * tileSize, char).setOrigin(0, 0);
            }
          }
        });
      });

      this.input.keyboard?.on('keydown-E', () => {
        this.openDoor();
      });
      
  
      const mapCenterX = rows[0].length * tileSize / 2;
      const mapCenterY = rows.length * tileSize / 2;
      const mapWidth = rows[0].length * tileSize;
      const mapHeight = rows.length * tileSize;

  
      this.character = this.physics.add.sprite(mapCenterX, mapCenterY, 'character').setOrigin(0.5, 0.5);
      this.physics.add.collider(this.character, this.walls);  // 캐릭터와 벽 사이의 충돌 설정
      
      this.cameras.main.setBounds(0, 0, mapWidth, mapHeight); // 카메라가 이동 가능한 범위 설정
      this.cursors = this.input.keyboard?.createCursorKeys();
      this.cameras.main.startFollow(this.character);
    //   this.physics.world.createDebugGraphic();  // 디버그 그래픽
      
      this.loadDoorParts();
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

    private isNearDoor(): boolean {     //캐릭터가 문 주변에 있는가?
        if (this.character) {            
            const doorCenterX = 1024;  // 문의 중심 X 좌표
            const doorCenterY = 768;  // 문의 중심 Y 좌표
            
            const distance = Phaser.Math.Distance.Between(this.character.x, this.character.y, doorCenterX, doorCenterY);
            
            return distance > 64 && distance <= 140;  // 문 주변에 있어야함, 문이랑 겹치면 안됨
        }
        return false;  // 캐릭터가 없는 경우, 문 주변에 없다고 가정하고 false
    }
    

    loadDoorParts() {
        const rows = pattern.trim().split('\n');
        const tileSize = 32;  
    
        const doorTiles = [
            '1', '2', '3', '4',
            '5', '6', '7', '8',
            '9', '10', '11', '12'
        ];
    
        doorTiles.forEach((tile, index) => {
            const doorPart = this.add.image(0, 0, '문' + (parseInt(tile))).setOrigin(0, 0).setVisible(true);
            this.doorParts.push(doorPart);
            
            if (this.character) {
            this.physics.add.collider(this.character, doorPart);
        }
            
        });
    
        const rowWithD = rows.find(row => row.includes('D'));
        if (!rowWithD) {
            throw new Error("문이 없다?!");
        }
    
        const startX = 960;
        const startY = 704;
    
        this.doorParts.forEach((part, index) => {
            const x = startX + (index % 4) * tileSize;
            const y = startY + Math.floor(index / 4) * tileSize;
            part.setPosition(x, y);
    
            if (this.character) {
                this.physics.add.existing(part, true);
            }
    
            if ([1, 2].includes(index)) {
                part.setDepth(1);
            } else if ([5, 6, 9, 10].includes(index)) {
                part.setDepth(-1);
            } else {
                part.setDepth(1);
            }
        });
    }
    
    
  
    openDoor() {
        if (!this.isNearDoor()) {
            return;  // 캐릭터가 문 주변에 있지 않다면 못열어
        }
    
        if (this.doorOpened) {
            this.closeDoor(); // 만약 문이 열려있다면, 문을 닫습니다.
            return;
        } 
    
        if (!this.doorOpenTween) {
            let currentSet = 0;
            this.doorOpenTween = this.tweens.addCounter({
                from: 0,
                to: 5,
                duration: 300,
                loop: 0,
                onUpdate: tween => {
                    const nextSet = Math.floor(tween.getValue());
                    if (nextSet !== currentSet) {
                        currentSet = nextSet;
                        this.updateDoorSet(currentSet);
                        if (currentSet === 5) {
                            this.removeDoorCollisions();
                        }
                    }
                }
            });
        } else {
            this.doorOpenTween.play();
        }
    
        this.doorOpened = true; // 문이 열렸다는 상태로 업데이트
    }
    
    closeDoor() {
        
        if (!this.isNearDoor() || !this.doorOpened) {
            return;  // 문 주변에 있지 않거나 문이 이미 닫혀있으면 함수를 빠져나옵니다.
        }
        
        this.doorOpenTween?.stop();
        this.doorOpenTween = undefined;
    
        let currentSet = 5;
        this.tweens.addCounter({
            from: 5,
            to: 0,
            duration: 300, 
            loop: 0,
            onUpdate: tween => {
                const nextSet = Math.floor(tween.getValue());
                if (nextSet !== currentSet) {
                    currentSet = nextSet;
                    this.updateDoorSet(currentSet);
                    if (currentSet === 0) {
                        this.addDoorCollisions();
                    }
                }
            }
        });
    
        this.doorOpened = false; // 문이 닫혔다는 상태로 업데이트
    }

      addDoorCollisions() {
        // 모든 문 부분의 충돌을 활성화
        this.doorParts.forEach((part, index) => {
            (part.body as Phaser.Physics.Arcade.Body).enable = true;
        });
      }

    updateDoorSet(set: number) {
        this.doorParts.forEach((part, index) => {
            const tile = set * 12 + index + 1;
            part.setTexture('문' + tile).setVisible(true);
        });
    }

    removeDoorCollisions() {
        // 모든 문 부분의 충돌을 비활성화
        this.doorParts.forEach((part, index) => {
            (part.body as Phaser.Physics.Arcade.Body).enable = false;
        });
    }
}