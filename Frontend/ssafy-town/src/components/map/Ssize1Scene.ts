import Phaser from 'phaser';
import store from '../../store/store'
import { setModal } from '../../store/actions';

type AssetKeys = 'A1' | 'B1' | 'C1' | 'D1' | 'E1' | 'F1' | 'G1' | 'H1' | 'I1' | 'J1' | 'K1' | 'L1';
const ASSETS: Record<AssetKeys, string> = {
  'A1': '/assets/L1-B1.png',
  'B1': '/assets/L1-C4.png',
  'C1': '/assets/L1-A8.png',
  'D1': '/assets/침대4.png',
  'E1': '/assets/테이블1.png',
  'F1': '/assets/장롱1.png',
  'G1': '/assets/게시판1.png',
  'H1': '/assets/러그1.png',
  'I1': '/assets/컴퓨터1.png',
  'J1': '/assets/식물1.png',
  'K1': '/assets/에어컨1.png',
  'L1': '/assets/mirror.png',
};

const pattern = `
B1B1B1B1B1B1B1B1B1B1B1B1B1B1B1
B1K1K1F1F1L1A1A1I1I1A1G1G1G1B1
B1D1D1F1F1L1C1C1I1I1C1G1G1G1B1
B1D1D1C1C1C1C1C1C1C1C1C1C1C1B1
B1D1D1C1C1C1C1C1C1C1C1C1C1C1B1
B1D1D1C1C1C1C1C1C1C1C1C1C1C1B1
B1C1C1C1C1C1C1C1C1C1C1C1C1C1B1
B1C1C1E1E1C1C1C1C1C1C1C1C1C1B1
B1C1C1E1E1C1C1C1C1C1C1C1C1C1B1
B1C1C1C1C1C1C1C1C1C1C1C1C1C1B1
B1C1C1C1C1C1C1C1C1C1C1C1C1C1B1
B1C1C1C1C1C1C1C1H1H1H1H1H1C1B1
B1J1C1C1C1C1C1C1H1H1H1H1H1C1B1
B1J1C1C1C1C1C1C1H1H1H1H1H1C1B1
B1J1C1C1C1C1C1C1C1C1C1C1C1C1B1
B1B1B1B1B1B1B1B1B1B1B1B1B1B1B1
`;

export class Ssize1Scene extends Phaser.Scene {

  private character?: Phaser.Physics.Arcade.Sprite;
  private pet?: Phaser.Physics.Arcade.Sprite;
  private balloon!: Phaser.GameObjects.Sprite;
  private heart!: Phaser.GameObjects.Sprite;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private walls?: Phaser.Physics.Arcade.StaticGroup;
  private rows: string[] = [];

  private bed?: Phaser.Physics.Arcade.Sprite;
  private table?: Phaser.Physics.Arcade.Sprite;
  private wardrobe?: Phaser.Physics.Arcade.Sprite;
  private board?: Phaser.Physics.Arcade.Sprite;
  private rug?: Phaser.Physics.Arcade.Sprite;
  private computer?: Phaser.Physics.Arcade.Sprite;
  private plant?: Phaser.Physics.Arcade.Sprite;
  private aircondition?: Phaser.Physics.Arcade.Sprite;
  private mirror?: Phaser.Physics.Arcade.Sprite;
  private addedBed: boolean = false;
  private addedTable: boolean = false;
  private addedWardrobe: boolean = false;
  private addedBoard: boolean = false;
  private addedRug: boolean = false;
  private addedComputer: boolean = false;
  private addedPlant: boolean = false;
  private addedAircondition: boolean = false;
  private addedMirror: boolean = false;
  

  constructor() {
    super({ key: 'Ssize1Scene' });
  }

  preload() {
    for (let char in ASSETS) {
        this.load.image(char, (ASSETS as Record<string, string>)[char]);
    }

    this.load.image('balloon', 'assets/ekey.png');
    this.load.image('choose', 'assets/choose.png');
    this.load.image('heart', 'assets/heart.png');
    this.load.image('pet-down-1', 'assets/파아1.png')
    this.load.image('pet-down-2', 'assets/파아2.png')
    this.load.image('pet-down-3', 'assets/파아3.png')
    this.load.image('pet-up-1', 'assets/파위1.png')
    this.load.image('pet-up-2', 'assets/파위2.png')
    this.load.image('pet-up-3', 'assets/파위3.png')
    this.load.image('pet-right-1', 'assets/파오1.png')
    this.load.image('pet-right-2', 'assets/파오2.png')
    this.load.image('pet-right-3', 'assets/파오3.png')
    this.load.image('pet-left-1', 'assets/파왼1.png')
    this.load.image('pet-left-2', 'assets/파왼2.png')
    this.load.image('pet-left-3', 'assets/파왼3.png')

    for (let i = 1; i <= 50; i++) {
      this.load.image('WE' + i, 'assets/WE' + i + '.png');
    }

    for (let i = 0; i <= 9; i++) {
      for (let j = 1; j <= 12; j++) {
          let secondChar;
          if (j <= 9) {
              secondChar = j;
          } else if (j === 10) {
              secondChar = 'A';
          } else if (j === 11) {
              secondChar = 'B';
          } else {
              secondChar = 'C';
          }
          
          const imageKey = `${i}${secondChar}`;
          const imagePath = `assets/${imageKey}.png`;
          
          this.load.image(imageKey, imagePath);
      }
    }
  }

  create() {
  this.rows = pattern.trim().split('\n');
  const tileSize = 32;  

  this.walls = this.physics.add.staticGroup();

  this.balloon = this.add.sprite(0, 0, 'balloon').setVisible(false);
  this.balloon.setDepth(2);
  this.heart = this.add.sprite(0, 0, 'heart').setVisible(false);
  this.heart.setDepth(2);

  const mapCenterX = this.rows[0].length * tileSize / 2;
  const mapCenterY = this.rows.length * tileSize / 2;
  
  //test
  localStorage.setItem("character",'1');


  // 사용자 캐릭터 선택
  const userCharacter = localStorage.getItem("character") || '0';

  this.character = this.physics.add.sprite(mapCenterX-240, mapCenterY, `${userCharacter}2`).setOrigin(0.5, 0.5);

  this.createAnimationsForCharacter(userCharacter); // 방향 애니메이션

  this.pet = this.physics.add.sprite(mapCenterX - 160, mapCenterY + 90, 'pet-down-2');
  this.character.setCollideWorldBounds(true);
  this.pet.setCollideWorldBounds(true);
  this.physics.add.collider(this.character, this.walls);  // 캐릭터와 벽 사이의 충돌 설정
  this.physics.add.collider(this.pet, this.walls);
  this.physics.add.collider(this.pet, this.character);
  this.pet.setImmovable(true);  // pet이 밀리지 않게 설정
  this.cursors = this.input.keyboard?.createCursorKeys();
  this.cameras.main.startFollow(this.character);
  this.character?.setDepth(1); // 캐릭터부터 생성했으니 depth를 줘야 캐릭터가 화면에 보임
  this.pet?.setDepth(1);
  // this.physics.world.createDebugGraphic();  // 디버그 그래픽

  ///여기부터 펫의 움직임///

  this.anims.create({
    key: 'pet-walk-up',
    frames: [
      { key: 'pet-up-1'},
      { key: 'pet-up-3'},
      { key: 'pet-up-2'},
    ],
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'pet-walk-left',
    frames: [
      { key: 'pet-left-1'},
      { key: 'pet-left-3'},
      { key: 'pet-left-2'},
    ],
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'pet-walk-right',
    frames: [
      { key: 'pet-right-1'},
      { key: 'pet-right-3'},
      { key: 'pet-right-2'},
    ],
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'pet-walk-down',
    frames: [
      { key: 'pet-down-1'},
      { key: 'pet-down-3'},
      { key: 'pet-down-2'},
    ],
    frameRate: 10,
    repeat: -1
  });
  
////// 변신 이펙트

const changeFrames = Array.from({ length: 50 }, (_, i) => ({ key: `WE${i + 1}` }));

this.anims.create({
  key: 'change',
  frames: changeFrames,
  frameRate: 100, // 50 frames in 1 second
  repeat: 0
});

// 캐릭터와 동일한 위치에 change 애니메이션을 재생할 스프라이트 생성
const changeEffectSprite = this.add.sprite(this.character.x, this.character.y+5, 'WE1');  // 'E1'은 첫 프레임입니다.

// 숨겨진 상태로 시작
changeEffectSprite.visible = false;
// 깊이
changeEffectSprite.setDepth(this.character.depth + 1);

// 이펙트 애니메이션 재생이 끝나면 스프라이트 숨기기
changeEffectSprite.on('animationcomplete', () => {
    changeEffectSprite.visible = false;
});


/////

  this.time.addEvent({
    delay: 1500, // 2초마다 움직임
    callback: () => {
        const randomDirection = Phaser.Math.Between(1, 4); // 1: 위, 2: 아래, 3: 왼쪽, 4: 오른쪽
        const petX = this.pet?.x!;
        const petY = this.pet?.y!;

        if (!this.isObstacleAhead(petX, petY, randomDirection)) {
        switch (randomDirection) {
            case 1:
                this.pet?.setVelocityY(-tileSize); // 위로 움직이기
                this.pet?.anims.play('pet-walk-up', true);
                break;
            case 2:
                this.pet?.setVelocityY(tileSize);  // 아래로 움직이기
                this.pet?.anims.play('pet-walk-down', true);
                break;
            case 3:
                this.pet?.setVelocityX(-tileSize); // 왼쪽으로 움직이기
                this.pet?.anims.play('pet-walk-left', true);
                break;
            case 4:
                this.pet?.setVelocityX(tileSize);  // 오른쪽으로 움직이기
                this.pet?.anims.play('pet-walk-right', true);
                break;
        }
      }

        // 일정 시간 후 속도를 0으로 설정하여 펫이 움직임을 멈추게 함
        this.time.delayedCall(1000, () => {
            this.pet?.setVelocity(0, 0);
            this.pet?.anims.stop();
        });
    },
    loop: true
  });




  this.rows.forEach((row, rowIndex) => {
    for (let colIndex = 0; colIndex < row.length; colIndex += 2) {
        const tileID = row.substring(colIndex, colIndex + 2) as AssetKeys;
  
        if (ASSETS[tileID]) {
          if (tileID === 'A1' || tileID === 'B1') {
              const wallTile = this.walls?.create((colIndex / 2) * tileSize + tileSize / 2, rowIndex * tileSize + tileSize / 2, tileID);
              wallTile.setSize(tileSize, tileSize);
          } else if (tileID === 'D1' && !this.addedBed) {
            this.bed = this.physics.add.sprite((colIndex / 2) * tileSize, rowIndex * tileSize, tileID);
            this.bed.setOrigin(0, 0).setDisplaySize(64, 128).setImmovable(true);
            this.addedBed = true;
            this.physics.add.collider(this.character!, this.bed);
          } else if (tileID === 'E1' && !this.addedTable) { // E1 
            this.table = this.physics.add.sprite((colIndex / 2) * tileSize, rowIndex * tileSize, tileID);
            this.table.setOrigin(0, 0).setDisplaySize(64, 64).setImmovable(true); // 2x2 크기이므로 64x64 크기 설정
            this.addedTable = true;
            this.physics.add.collider(this.character!, this.table);
          } else if (tileID === 'F1' && !this.addedWardrobe) {  // F1 
            this.wardrobe = this.physics.add.sprite((colIndex / 2) * tileSize, rowIndex * tileSize, tileID);
            this.wardrobe.setOrigin(0, 0).setDisplaySize(64, 64).setImmovable(true);
            this.addedWardrobe = true;
            this.physics.add.collider(this.character!, this.wardrobe);
          } else if (tileID === 'G1' && !this.addedBoard) {  // G1 
            this.board = this.physics.add.sprite((colIndex / 2) * tileSize, rowIndex * tileSize, tileID);
            this.board.setOrigin(0, 0).setDisplaySize(96, 64).setImmovable(true); // 3x2 
            this.addedBoard = true;
            this.physics.add.collider(this.character!, this.board);
          } else if (tileID === 'H1' && !this.addedRug) {  // H1 
            this.rug = this.physics.add.sprite((colIndex / 2) * tileSize, rowIndex * tileSize, tileID);
            this.rug.setOrigin(0, 0).setDisplaySize(160, 96).setImmovable(true); // 5x3 
            this.addedRug = true;
          } else if (tileID === 'I1' && !this.addedComputer) {  // I1 
            this.computer = this.physics.add.sprite((colIndex / 2) * tileSize, rowIndex * tileSize, tileID);
            this.computer.setOrigin(0, 0).setDisplaySize(64, 64).setImmovable(true); // 2x2 
            this.addedComputer = true;
            this.physics.add.collider(this.character!, this.computer);
          } else if (tileID === 'J1' && !this.addedPlant) {  // J1 
            this.plant = this.physics.add.sprite((colIndex / 2) * tileSize, rowIndex * tileSize, tileID);
            this.plant.setOrigin(0, 0).setDisplaySize(32, 96).setImmovable(true); // 1x3 
            this.addedPlant = true;
            this.physics.add.collider(this.character!, this.plant);
          } else if (tileID === 'K1' && !this.addedAircondition) {  // K1 
            this.aircondition = this.physics.add.sprite((colIndex / 2) * tileSize, rowIndex * tileSize, tileID);
            this.aircondition.setOrigin(0, 0).setDisplaySize(64, 32).setImmovable(true); // 2x1
            this.addedAircondition = true;
            this.physics.add.collider(this.character!, this.aircondition);
          } else if (tileID === 'L1' && !this.addedMirror) {  // L1 
            this.mirror = this.physics.add.sprite((colIndex / 2) * tileSize, rowIndex * tileSize, tileID);
            this.mirror.setOrigin(0, 0).setDisplaySize(32, 64).setImmovable(true); // 1x2 
            this.addedMirror = true;
            this.physics.add.collider(this.character!, this.mirror);
          } else if (tileID !== 'D1' && tileID !== 'E1' && tileID !== 'F1' && tileID !== 'G1' && tileID !== 'H1' && tileID !== 'I1'
          && tileID !== 'J1' && tileID !== 'K1' && tileID !== 'L1') {
            this.add.image((colIndex / 2) * tileSize, rowIndex * tileSize, tileID).setOrigin(0, 0);
          }
        }
      }
    });

    this.input.keyboard?.on('keydown-E', () => {
      const nearbyObject = this.NearbyObjects();

      console.log(this.character!.x + "@@" + this.character!.y)
      if (!store.getState().isAllowMove){
        return
      }


      if (nearbyObject === 'bed') {
        store.dispatch(setModal('로그아웃'))
      } else if(nearbyObject === 'board') {
        store.dispatch(setModal('QnA게시판'))
      } else if(nearbyObject === 'pet'){
        this.petheart();
      } else if(nearbyObject === 'mirror'){
        this.choosecharacter();
      }
    });

      ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE'].forEach((key, index) => {
        this.input.keyboard?.on(`keydown-${key}`, () => {
          const nearbyObject = this.NearbyObjects();
          if (nearbyObject === 'mirror') {
            let number = '1';
            switch(key) {
                case 'ONE':
                    number = '1';
                    break;
                case 'TWO':
                    number = '2';
                    break;
                case 'THREE':
                    number = '3';
                    break;
                case 'FOUR':
                    number = '4';
                    break;
                case 'FIVE':
                    number = '5';
                    break;
                case 'SIX':
                    number = '6';
                    break;
                case 'SEVEN':
                    number = '7';
                    break;
                case 'EIGHT':
                    number = '8';
                    break;
                case 'NINE':
                    number = '9';
                    break;
            }
            localStorage.setItem("character", number!);

            changeEffectSprite.x = this.character!.x;
            changeEffectSprite.y = this.character!.y+5;

            // 스프라이트 표시
            changeEffectSprite.visible = true;

            // 스프라이트에 change 애니메이션 재생
            changeEffectSprite.anims.play('change', true);

            this.createAnimationsForCharacter(number)
          }
        });
    });
  }

    /////////////////////////// 캐릭터 이동 애니메이션
  
    createAnimationsForCharacter(characterKey : string) {
      // 위를 바라보는 애니메이션
      this.anims.create({
        key: `${characterKey}-up`,
        frames: [
          { key: `${characterKey}A`},
          { key: `${characterKey}C`},
          { key: `${characterKey}B`},
        ],
        frameRate: 10,
        repeat: -1
      });
    
      // 오른쪽을 바라보는 애니메이션
      this.anims.create({
        key: `${characterKey}-right`,
        frames: [
          { key: `${characterKey}7`},
          { key: `${characterKey}8`},
          { key: `${characterKey}9`},
        ],
        frameRate: 10,
        repeat: -1
      });
    
      // 아래를 바라보는 애니메이션
      this.anims.create({
        key: `${characterKey}-down`,
        frames: [
          { key: `${characterKey}1`},
          { key: `${characterKey}3`},
          { key: `${characterKey}2`},
        ],
        frameRate: 10,
        repeat: -1
      });
    
      // 왼쪽을 바라보는 애니메이션
      this.anims.create({
        key: `${characterKey}-left`,
        frames: [
          { key: `${characterKey}4`},
          { key: `${characterKey}6`},
          { key: `${characterKey}5`},
        ],
        frameRate: 10,
        repeat: -1
      });
    }

    //////


    update() {
      if (store.getState().isAllowMove && this.cursors && this.character) {
        let moved = false;
        let currentAnimation = this.character.anims.currentAnim;
        let currentDirection = currentAnimation ? currentAnimation.key.split('-')[1] : null;
    
        this.character.setVelocity(0, 0); // 초기 속도를 0으로 설정
    
        if (this.cursors.left?.isDown) {
          this.character.setVelocityX(-320);
          if (currentDirection !== 'left') {
            this.character.play(`${localStorage.getItem("character") || '0'}-left`, true);
          }
          moved = true;
        } else if (this.cursors.right?.isDown) {
          this.character.setVelocityX(320);
          if (currentDirection !== 'right') {
            this.character.play(`${localStorage.getItem("character") || '0'}-right`, true);
          }
          moved = true;
        }
    
        if (this.cursors.up?.isDown) {
          this.character.setVelocityY(-320);
          if (!this.cursors.right?.isDown && !this.cursors.left?.isDown && currentDirection !== 'up') {
            this.character.play(`${localStorage.getItem("character") || '0'}-up`, true);
          }
          moved = true;
        } else if (this.cursors.down?.isDown) {
          this.character.setVelocityY(320);
          if (!this.cursors.right?.isDown && !this.cursors.left?.isDown && currentDirection !== 'down') {
            this.character.play(`${localStorage.getItem("character") || '0'}-down`, true);
          }
          moved = true;
        }
    
        if (!moved && currentDirection) {
          let idleFrameKey = {
            'left': '5',
            'right': '8',
            'up': 'B',
            'down': '2'
          }[currentDirection];
          if (idleFrameKey) {
            this.character.setTexture(`${localStorage.getItem("character") || '0'}${idleFrameKey}`);
          }
        }
      }
      this.NearbyObjects();
    }

  private NearbyObjects(): 'bed' | 'board' | 'pet'| 'mirror' | null {
    const bedPosition = { x: 84, y: 131 }; // 침대
    const boardPosition = { x: 400, y: 100 }; // 게시판
    const mirrorPosition = { x: 176, y: 100 }; // 게시판

    if (this.character) {
      const distanceToBed = Phaser.Math.Distance.Between(this.character.x, this.character.y, bedPosition.x, bedPosition.y);
      const distanceToBoard = Phaser.Math.Distance.Between(this.character.x, this.character.y, boardPosition.x, boardPosition.y);
      const distanceToMirror = Phaser.Math.Distance.Between(this.character.x, this.character.y, mirrorPosition.x, mirrorPosition.y);

      if (distanceToBed <= 50 || distanceToBoard <= 64 || distanceToMirror<=40) {
          this.balloon.setPosition(this.character.x, this.character.y - this.character.height / 2 - this.balloon.height / 2).setVisible(true);


          if(distanceToBed <= 50) return 'bed';
          if(distanceToBoard <= 64) return 'board';
          if(distanceToMirror <= 40) return 'mirror';
      } else if(Math.abs(this.pet!.x-this.character!.x)<50 && Math.abs(this.pet!.y-this.character!.y)<50){
        return 'pet';
      } 
      else {
          this.balloon.setVisible(false);
      }
  }
    return null; // 주변에 아무 오브젝트도 없다면 null
  }

  isObstacleAhead(x: number, y: number, direction: number): boolean {
    const tileSize = 32;
    let nextTileX = x;
    let nextTileY = y;
  
    switch (direction) {
      case 1:
        nextTileY -= tileSize;
        break;
      case 2:
        nextTileY += tileSize;
        break;
      case 3:
        nextTileX -= tileSize;
        break;
      case 4:
        nextTileX += tileSize;
        break;
    }
  
    const xIndex = Math.floor(nextTileX / tileSize) * 2;
    const yIndex = Math.floor(nextTileY / tileSize);

    const charXIndex = Math.floor(this.character!.x / tileSize) * 2;
    const charYIndex = Math.floor(this.character!.y / tileSize);

    const rowString = this.rows[yIndex];  // rows 배열에서 yIndex에 해당하는 행의 문자열을 가져옴
    if (!rowString) return true;  // 예외처리: 해당 행이 존재하지 않는 경우

    const tile = rowString.slice(xIndex, xIndex + 2);

    if (charXIndex >= xIndex - 2 && 
    charXIndex <= xIndex + 2 && 
    charYIndex >= yIndex - 2 && 
    charYIndex <= yIndex + 2) {
      return true;  // 해당 타일에 캐릭터가 있다면 true
  }
  
    return ["B1", "D1", "K1", "F1", "A1", "G1", "J1", "E1", "I1","Z1"].includes(tile);
  }
  petheart(){
    const heart = this.add.image(this.pet!.x, this.pet!.y - this.pet!.height / 2 - this.heart.height / 2,'heart');

    setTimeout(() => {
        heart.destroy();
    }, 300);
  }

  choosecharacter(){
    const heart = this.add.image(this.character!.x, -120,'choose');

    setTimeout(() => {
        heart.destroy();
    }, 10000);
  }


}
