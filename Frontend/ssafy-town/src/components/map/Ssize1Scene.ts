import Phaser from 'phaser';
import store from '../../store/store'
import { setModal } from '../../store/actions';

type AssetKeys = 'A1' | 'B1' | 'C1' | 'D1' | 'E1' | 'F1' | 'G1' | 'H1' | 'I1' | 'J1' | 'K1';
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
};

const pattern = `
B1B1B1B1B1B1B1B1B1B1B1B1B1B1B1
B1K1K1F1F1A1A1A1I1I1A1G1G1G1B1
B1D1D1F1F1C1C1C1I1I1C1G1G1G1B1
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
  private addedBed: boolean = false;
  private addedTable: boolean = false;
  private addedWardrobe: boolean = false;
  private addedBoard: boolean = false;
  private addedRug: boolean = false;
  private addedComputer: boolean = false;
  private addedPlant: boolean = false;
  private addedAircondition: boolean = false;
  

  constructor() {
    super({ key: 'Ssize1Scene' });
  }

  preload() {
    for (let char in ASSETS) {
        this.load.image(char, (ASSETS as Record<string, string>)[char]);
    }

    this.load.image('character', 'assets/admin_character.png');
    this.load.image('balloon', 'assets/ekey.png');
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
  }

  create() {
  this.rows = pattern.trim().split('\n');
  const tileSize = 32;  

  this.walls = this.physics.add.staticGroup();

  this.balloon = this.add.sprite(0, 0, 'balloon').setVisible(false);
  this.balloon.setDepth(2);

  const mapCenterX = this.rows[0].length * tileSize / 2;
  const mapCenterY = this.rows.length * tileSize / 2;
  
  this.character = this.physics.add.sprite(mapCenterX - 240, mapCenterY, 'character');
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
  
//////

  this.time.addEvent({
    delay: 2000, // 2초마다 움직임
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
          } else if (tileID !== 'D1' && tileID !== 'E1' && tileID !== 'F1' && tileID !== 'G1' && tileID !== 'H1' && tileID !== 'I1'
          && tileID !== 'J1' && tileID !== 'K1') {
            this.add.image((colIndex / 2) * tileSize, rowIndex * tileSize, tileID).setOrigin(0, 0);
          }
        }
      }
    });

    this.input.keyboard?.on('keydown-E', () => {
      const nearbyObject = this.NearbyObjects();

      console.log(this.character!.x + "@@" + this.character!.y)
  
      if (nearbyObject === 'bed') {
        store.dispatch(setModal('로그아웃'))
      } else if(nearbyObject === 'board') {
        store.dispatch(setModal('QnA게시판'))
      }
    }
  )}


  update() {
    if (store.getState().isAllowMove && this.cursors && this.character) {
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
    this.NearbyObjects();
  }

  private NearbyObjects(): 'bed' | 'board' | null {
    const bedPosition = { x: 84, y: 131 }; // 침대
    const boardPosition = { x: 400, y: 100 }; // 게시판

    if (this.character) {
      const distanceToBed = Phaser.Math.Distance.Between(this.character.x, this.character.y, bedPosition.x, bedPosition.y);
      const distanceToBoard = Phaser.Math.Distance.Between(this.character.x, this.character.y, boardPosition.x, boardPosition.y);

      if (distanceToBed <= 50 || distanceToBoard <= 64) {
          this.balloon.setPosition(this.character.x, this.character.y - this.character.height / 2 - this.balloon.height / 2).setVisible(true);


          if(distanceToBed <= 50) return 'bed';
          if(distanceToBoard <= 64) return 'board';
      } else {
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
  
    const tileRow = this.rows[Math.floor(nextTileY / tileSize)];
    if (!tileRow) return true; // 예외처리: 타일이 존재하지 않는 경우
  
    const tileValue = tileRow[Math.floor(nextTileX / tileSize)];
    const tile = tileValue.toString() + "1";
  
    return ["B1", "D1", "K1", "F1", "A1", "G1", "J1", "E1", "I1"].includes(tile);
  }
}
