import Phaser from 'phaser';
import store from '../../store/store'
import { setModal } from '../../store/actions';

type AssetKeys = 'A3' | 'B3' | 'C3' ;
const ASSETS: Record<AssetKeys, string> = {
  'A3': '/assets/L1-B1.png',
  'B3': '/assets/L1-C4.png',
  'C3': '/assets/L1-A9.png',
};

const pattern = `
B3B3B3B3B3B3B3B3B3B3B3B3B3B3B3
B3A3A3A3A3A3A3A3A3A3A3A3A3A3B3
B3C3C3C3C3C3C3C3C3C3C3C3C3C3B3
B3C3C3C3C3C3C3C3C3C3C3C3C3C3B3
B3C3C3C3C3C3C3C3C3C3C3C3C3C3B3
B3C3C3C3C3C3C3C3C3C3C3C3C3C3B3
B3C3C3C3C3C3C3C3C3C3C3C3C3C3B3
B3C3C3C3C3C3C3C3C3C3C3C3C3C3B3
B3C3C3C3C3C3C3C3C3C3C3C3C3C3B3
B3C3C3C3C3C3C3C3C3C3C3C3C3C3B3
B3C3C3C3C3C3C3C3C3C3C3C3C3C3B3
B3C3C3C3C3C3C3C3C3C3C3C3C3C3B3
B3C3C3C3C3C3C3C3C3C3C3C3C3C3B3
B3C3C3C3C3C3C3C3C3C3C3C3C3C3B3
B3C3C3C3C3C3C3C3C3C3C3C3C3C3B3
B3B3B3B3B3B3B3B3B3B3B3B3B3B3B3
`;

export class Tsize1Scene extends Phaser.Scene {

  private character?: Phaser.Physics.Arcade.Sprite;
  private balloon!: Phaser.GameObjects.Sprite;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private walls?: Phaser.Physics.Arcade.StaticGroup;
  private rows: string[] = [];

  private board?: Phaser.Physics.Arcade.Sprite;
  private addedBoard: boolean = false;

  constructor() {
    super({ key: 'Tsize1Scene' });
  }

  preload() {
    for (let char in ASSETS) {
        this.load.image(char, (ASSETS as Record<string, string>)[char]);
    }

    this.load.image('character', 'assets/admin_character.png');
    this.load.image('balloon', 'assets/ekey.png');
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
  this.character.setCollideWorldBounds(true);
  this.physics.add.collider(this.character, this.walls);  // 캐릭터와 벽 사이의 충돌 설정
  this.cursors = this.input.keyboard?.createCursorKeys();
  this.cameras.main.startFollow(this.character);
  this.character?.setDepth(1); // 캐릭터부터 생성했으니 depth를 줘야 캐릭터가 화면에 보임
  // this.physics.world.createDebugGraphic();  // 디버그 그래픽


  this.rows.forEach((row, rowIndex) => {
    for (let colIndex = 0; colIndex < row.length; colIndex += 2) {
        const tileID = row.substring(colIndex, colIndex + 2) as AssetKeys;
  
        if (ASSETS[tileID]) {
          if (tileID === 'A3' || tileID === 'B3') {
              const wallTile = this.walls?.create((colIndex / 2) * tileSize + tileSize / 2, rowIndex * tileSize + tileSize / 2, tileID);
              wallTile.setSize(tileSize, tileSize);
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


      if (nearbyObject === 'board') {
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

  private NearbyObjects(): 'board' | null {
    const boardPosition = { x: 400, y: 100 }; // 게시판

    if (this.character) {
      const distanceToBoard = Phaser.Math.Distance.Between(this.character.x, this.character.y, boardPosition.x, boardPosition.y);

      if (distanceToBoard <= 64) {
          this.balloon.setPosition(this.character.x, this.character.y - this.character.height / 2 - this.balloon.height / 2).setVisible(true);

          if(distanceToBoard <= 64) return 'board';
      }
      else {
          this.balloon.setVisible(false);
      }
  }
    return null; // 주변에 아무 오브젝트도 없다면 null
  }

}
