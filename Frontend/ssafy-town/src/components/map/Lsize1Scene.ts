import Phaser from 'phaser';
import store from '../../store/store'
import { setModal } from '../../store/actions';
import io from 'socket.io-client';
import { Socket } from 'socket.io-client';

type AssetKeys = 'A' | 'B' | 'C' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' 
               | 'T' | 'U' | 'V' | 'W' | 'X' | '1' | '2' | '3' | '4'
               | 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's'
               | 't' | 'u' | 'z';
const ASSETS: Record<AssetKeys, string> = {
  'A': '/assets/L1-B1.png',
  'B': '/assets/L1-C4.png',
  'C': '/assets/L1-A4.png',
  'E': '/assets/water.png',
  'F': '/assets/machine.png',
  'G': '/assets/칠판1.png',
  'H': '/assets/게시판2.png',
  'I': '/assets/의자.png',
  'J': '/assets/테이블2.png',
  'K': '/assets/정수기2.png',
  'L': '/assets/커피세트1.png',
  'M': '/assets/가로테이블1.png',
  'N': '/assets/가로테이블2.png',
  'O': '/assets/세로테이블1.png',
  'P': '/assets/자판기2.png',
  'Q': '/assets/싸피로고.png',
  'R': '/assets/소화전.png',
  'S': '/assets/식물2.png',
  'T': '/assets/식물3.png',
  'U': '/assets/U테이블.png',
  'V': '/assets/화면1.png',
  'W': '/assets/피아노.png',
  'X': '/assets/스피커1.png',
  '1': '/assets/배너1.png',
  '2': '/assets/배너2.png',
  '3': '/assets/배너3.png',
  '4': '/assets/배너4.png',
  'a': '/assets/L1-d1.png',
  'b': '/assets/L1-d2.png',
  'c': '/assets/L1-d3.png',
  'd': '/assets/L1-d4.png',
  'e': '/assets/L1-d5.png',
  'f': '/assets/L1-d6.png',
  'g': '/assets/L1-d7.png',
  'h': '/assets/L1-d8.png',
  'i': '/assets/L1-d9.png',
  'j': '/assets/L1-d10.png',
  'k': '/assets/L1-d11.png',
  'l': '/assets/의자앞1.png',
  'm': '/assets/의자뒤1.png',
  'n': '/assets/쓰레기통1.png',
  'o': '/assets/쓰레기통2.png',
  'p': '/assets/의자앞2.png',
  'q': '/assets/의자뒤2.png',
  'r': '/assets/의자왼2.png',
  's': '/assets/의자오른2.png',
  't': '/assets/의자2.png',
  'u': '/assets/피아노의자.png',
  'z': '/assets/장식용허수코드.png',
};

const pattern = `
BBBBRBBBBBBBBBBBBBBBBBBBVBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB
BCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCWCCCCCB
BCCCCCCCCCCCCCCCCCCCCXCCCCCCCCCCCCCCCCCXCCCCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCUCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCuCCCCB
BCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCB
BCCCC1CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC2CCCCCB
BCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCtCtCtCtCtCtCtCtCtCtCtCtCtCtCtCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCtCtCtCtCtCtCtCtCtCtCtCtCtCtCtCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCtCtCtCtCtCtCtCtCtCtCtCtCtCtCtCCCCCCCCCCCCCCCCCB
BCCCC3CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC4CCCCCB
BCCCCCCCCCCCCCCCCtCtCtCtCtCtCtCtCtCtCtCtCtCtCtCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCB
BTCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCSB
BCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCB
BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBzDDzBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
BBBBBBBBBBBBBBBBBBBBBBPBBGBBBBzDDzBBBBBBBBBRBBBBBBBBBBBBBBBBBBBB
BAAAAAAAAAAAAAAAAAAAABAAAAAAAAzDDzAAAHAAAABAAAAAAAAAAAAAAAAAAAAB
BCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCB
BCCCCCCpCCpCCpCCCCCCCBCCCCCCCCCCCCCCCCCCCCBCCCCCCCCpCCpCCpCCCCCB
BCCCCCNCCNCCNCCCCCCCCBCCCCCQCCCCCCCCCCCCCCBCCCCCCCNCCNCCNCCCCCCB
BCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCB
BCCCCOCCCCCCCCOCCCCCCACCCCCCCCCCCCCCCCCCCCACCCCCCOCCCCCCCCOCCCCB
BCCCrCCCCCCCCCCCsCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCrCCCCCCCCCCCsCCB
BCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCB
BCCCCOCCCCCCCCOCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCOCCCCCCCCOCCCCB
BCCCrCCCCCCCCCCCsCCCCBCCCCCCCCCCCCCCCCCCCCBCCCCCrCCCCCCCCCCCsCCB
BCCCCCCCCCCCCCCCCCCCoBCCCCCCCCCCCCCCCCCCCCBoCCCCCCCCCCCCCCCCCCCB
BCCCCCMCCMCCMCCCCCCCCBCCCCCCCCCCCCCCCCCCCCBCCCCCCCMCCMCCMCCCCCCB
BCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCB
BCCCCCCqCCqCCqCCCCCCCBCCCCCCCCCCCCCCCCCCCCBCCCCCCCCqCCqCCqCCCCCB
BSCCCCCCCCCCCCCCCCCCTBCCCCCCCCCCCCCCCCCCCCBSCCCCCCCCCCCCCCCCCCTB
BCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCB
BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBCCCCBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
BKAALAAAAAAAAAAAAAAAAAAAAAAAAACCCCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB
BCnCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCFCB
BCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCClCClCClCClCCCCB
BCCCJCCCCCJCCCCCJCCCCBCCCCCCCCCCCCCCCCCCCCBCCCCCfffggghhhiiiCCCB
BCCICCICCICCICCICCICCBCCCCCCCCCCCCCCCCCCCCBCCCCCaaabbbkkkdddCCCB
BCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCBCCCCCCmCCmCCmCCmCCCCB
BCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCB
BCCCJCCCCCJCCCCCJCCCCBCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCB
BCCICCICCICCICCICCICCBCCCCCCCCCCCCCCCCCCCCBCCCCCClCClCClCClCClCB
BCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCBCCCCCjjjhhhiiigggfffB
BCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCBCCCCCkkkeeeaaabbbdddB
BRBBBBBBBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCCCCCBCCCCCCmCCmCCmCCmCCmCB
BAAAAAAAAAAAAAAAAAAAABCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCBCCCCCClCClCClCClCClCB
BCCCCCCCCCCCCCCCCCCCCBCCCCCCCCCCCCCCCCCCCCBCCCCCiiifffhhhjjjgggB
BCCCCCCCCCCCCCCCCCCCCACCCCCCCCCCCCCCCCCCCCBECCCCdddaaabbbaaacccB
BCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCBCCCCCCmCCmCCmCCmCCmCB
BCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCBoCCCCCCCCCCCCCCCCCCCB
BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
`;

export class Lsize1Scene extends Phaser.Scene {

    private peerConnections: { [id: string]: RTCPeerConnection } = {}; 
    private dataChannels: { [id: string]: RTCDataChannel } = {}; 
    private prevPosition: { x: number, y: number } | null = null;
    private remoteCharacters: { [id: string]: Phaser.GameObjects.Sprite } = {};
    public socket!: Socket;

    private character?: Phaser.Physics.Arcade.Sprite;
    private balloon!: Phaser.GameObjects.Sprite;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private walls?: Phaser.Physics.Arcade.StaticGroup;
    private clockText!: Phaser.GameObjects.Text; //우하시계
    private clockText2!: Phaser.GameObjects.Text; //우상시계
    private clockText3!: Phaser.GameObjects.Text; //좌하시계
    private deadzoneActive: boolean = false;  // 데드존 상태 추적 변수

    private doorParts: Phaser.GameObjects.Image[] = [];
    private doorOpenTween?: Phaser.Tweens.Tween;
    private doorOpened: boolean = false; // 현재 문의 상태
    private chairPositions: {x: number, y: number}[] = [];
    private sittingOnChair: boolean = false; // 현재 앉아있니?

    private d1?: Phaser.Physics.Arcade.Sprite;
    private d2?: Phaser.Physics.Arcade.Sprite;
    private d3?: Phaser.Physics.Arcade.Sprite;
    private d4?: Phaser.Physics.Arcade.Sprite;
    private d5?: Phaser.Physics.Arcade.Sprite;
    private d6?: Phaser.Physics.Arcade.Sprite;
    private d7?: Phaser.Physics.Arcade.Sprite;
    private d8?: Phaser.Physics.Arcade.Sprite;
    private d9?: Phaser.Physics.Arcade.Sprite;
    private d10?: Phaser.Physics.Arcade.Sprite;
    private d11?: Phaser.Physics.Arcade.Sprite;
    private water?: Phaser.Physics.Arcade.Sprite;
    private copy?: Phaser.Physics.Arcade.Sprite;
  
    constructor() {
      super({ key: 'Lsize1Scene' });
    }
  
    preload() {
        for (let char in ASSETS) {
            this.load.image(char, (ASSETS as Record<string, string>)[char]);
        }
        this.load.image('character', 'assets/admin_character.png');
        this.load.image('character2', 'assets/겨울나무6.png');
        this.load.image('balloon', 'assets/ekey.png');
        
        for (let i = 1; i <= 72; i++) {
            this.load.image('문' + i, 'assets/문' + i + '.png');
        }
    }








    create() {
      
      const rows = pattern.trim().split('\n');
      const tileSize = 32; 

      this.clockText = this.add.text(1680, 1340, '', { font: '32px Arial', color: '#ffffff' });
      this.clockText2 = this.add.text(1360, 28, '', { font: '32px Arial', color: 'gray' });
      this.clockText3 = this.add.text(256, 1340, '', { font: '32px Arial', color: '#ffffff' });
      this.clockText.setDepth(10);
      this.clockText2.setDepth(10);
      this.clockText3.setDepth(10);
  
      this.walls = this.physics.add.staticGroup();

      this.balloon = this.add.sprite(0, 0, 'balloon').setVisible(false);
      this.balloon.setDepth(2);

      const mapCenterX = rows[0].length * tileSize / 2;
      const mapCenterY = rows.length * tileSize / 2;
      const mapWidth = rows[0].length * tileSize;
      const mapHeight = rows.length * tileSize;

  
      this.character = this.physics.add.sprite(mapCenterX, mapCenterY, 'character').setOrigin(0.5, 0.5);
      this.physics.add.collider(this.character, this.walls);  // 캐릭터와 벽 사이의 충돌 설정
      
      this.cameras.main.setBounds(0, 0, mapWidth, mapHeight); // 카메라가 이동 가능한 범위 설정
      this.cursors = this.input.keyboard?.createCursorKeys();
      this.cameras.main.startFollow(this.character);

      this.character?.setDepth(2); // 캐릭터부터 생성했으니 depth를 줘야 캐릭터가 화면에 보임
      // this.physics.world.createDebugGraphic();  // 디버그 그래픽
  


      
      rows.forEach((row, rowIndex) => {
        for (let colIndex = 0; colIndex < row.length; colIndex ++) {
          const tileID = row.substring(colIndex, colIndex +1) as AssetKeys;
    
          if (ASSETS[tileID]) {
            if (tileID === 'A' || tileID === 'B') {
                const wallTile = this.walls?.create(colIndex * tileSize + tileSize / 2, rowIndex * tileSize + tileSize / 2, tileID);
                wallTile.setSize(tileSize, tileSize);
            } else if (tileID ==='C' || tileID === 'm' || tileID === 'l' || tileID === 'I'|| tileID === 'n' || tileID === 'o' ||
                       tileID ==='p' || tileID === 'q' || tileID === 'r' || tileID === 's'|| tileID === 't' || tileID === 'u' ) {
              this.add.image(colIndex * tileSize, rowIndex * tileSize, tileID).setOrigin(0, 0);

              if(tileID ==='p' || tileID ==='q' || tileID ==='r' || tileID ==='s' || tileID ==='t' || tileID ==='l' || tileID ==='m' || tileID ==='I' ){
                this.chairPositions.push({x: colIndex * tileSize + tileSize/2, y: rowIndex * tileSize + tileSize/2});
              }


            } else if (tileID === 'E') {
              this.water = this.physics.add.sprite(colIndex * tileSize, rowIndex * tileSize, tileID);
              this.water.setOrigin(0, 0).setDisplaySize(32, 64).setImmovable(true);
              this.physics.add.collider(this.character!, this.water);
              this.water.setDepth(1);
            } else if (tileID === 'F') {
              this.copy = this.physics.add.sprite(colIndex * tileSize, rowIndex * tileSize, tileID);
              this.copy.setOrigin(0, 0).setDisplaySize(64, 64).setImmovable(true);
              this.physics.add.collider(this.character!, this.copy);
              this.copy.setDepth(1);
            } else if (tileID === 'G') {
              this.water = this.physics.add.sprite(colIndex * tileSize, rowIndex * tileSize, tileID);
              this.water.setOrigin(0, 0).setDisplaySize(96, 64).setImmovable(true);
              this.physics.add.collider(this.character!, this.water);
              this.water.setDepth(1);
            } else if (tileID === 'H') {
              this.water = this.physics.add.sprite(colIndex * tileSize, rowIndex * tileSize, tileID);
              this.water.setOrigin(0, 0).setDisplaySize(96, 64).setImmovable(true);
              this.physics.add.collider(this.character!, this.water);
              this.water.setDepth(1);
            } else if (tileID === 'J') {
              this.water = this.physics.add.sprite(colIndex * tileSize, rowIndex * tileSize, tileID);
              this.water.setOrigin(0, 0).setDisplaySize(64, 64).setImmovable(true);
              this.physics.add.collider(this.character!, this.water);
              this.water.setDepth(1);
            } else if (tileID === 'K') {
              this.water = this.physics.add.sprite(colIndex * tileSize, rowIndex * tileSize, tileID);
              this.water.setOrigin(0, 0).setDisplaySize(32, 64).setImmovable(true);
              this.physics.add.collider(this.character!, this.water);
              this.water.setDepth(1);
            } else if (tileID === 'L') {
              this.water = this.physics.add.sprite(colIndex * tileSize, rowIndex * tileSize, tileID);
              this.water.setOrigin(0, 0).setDisplaySize(64, 64).setImmovable(true);
              this.physics.add.collider(this.character!, this.water);
              this.water.setDepth(1);
            } else if (tileID === 'M') {
              this.water = this.physics.add.sprite(colIndex * tileSize, rowIndex * tileSize, tileID);
              this.water.setOrigin(0, 0).setDisplaySize(96, 64).setImmovable(true);
              this.physics.add.collider(this.character!, this.water);
              this.water.setDepth(1);
            } else if (tileID === 'N') {
              this.water = this.physics.add.sprite(colIndex * tileSize, rowIndex * tileSize, tileID);
              this.water.setOrigin(0, 0).setDisplaySize(96, 64).setImmovable(true);
              this.physics.add.collider(this.character!, this.water);
              this.water.setDepth(1);
            } else if (tileID === 'O') {
              this.water = this.physics.add.sprite(colIndex * tileSize, rowIndex * tileSize, tileID);
              this.water.setOrigin(0, 0).setDisplaySize(64, 96).setImmovable(true);
              this.physics.add.collider(this.character!, this.water);
              this.water.setDepth(1);
            } else if (tileID === 'P') {
              this.water = this.physics.add.sprite(colIndex * tileSize, rowIndex * tileSize, tileID);
              this.water.setOrigin(0, 0).setDisplaySize(64, 96).setImmovable(true);
              this.physics.add.collider(this.character!, this.water);
              this.water.setDepth(1);
            } else if (tileID === 'Q') {  //카펫이니 충돌 x
              this.water = this.physics.add.sprite(colIndex * tileSize, rowIndex * tileSize, tileID);
              this.water.setOrigin(0, 0).setDisplaySize(320, 320).setImmovable(true);
              this.water.setDepth(1);
            } else if (tileID === 'R') {
              this.water = this.physics.add.sprite(colIndex * tileSize, rowIndex * tileSize, tileID);
              this.water.setOrigin(0, 0).setDisplaySize(64, 64).setImmovable(true);
              this.physics.add.collider(this.character!, this.water);
              this.water.setDepth(1);
            } else if (tileID === 'S') {
              this.water = this.physics.add.sprite(colIndex * tileSize, rowIndex * tileSize, tileID);
              this.water.setOrigin(0, 0).setDisplaySize(32, 64).setImmovable(true);
              this.physics.add.collider(this.character!, this.water);
              this.water.setDepth(1);
            } else if (tileID === 'T') {
              this.water = this.physics.add.sprite(colIndex * tileSize, rowIndex * tileSize, tileID);
              this.water.setOrigin(0, 0).setDisplaySize(32, 64).setImmovable(true);
              this.physics.add.collider(this.character!, this.water);
              this.water.setDepth(1);
            } else if (tileID === 'U') {
              this.water = this.physics.add.sprite(colIndex * tileSize, rowIndex * tileSize, tileID);
              this.water.setOrigin(0, 0).setDisplaySize(128, 96).setImmovable(true);
              this.physics.add.collider(this.character!, this.water);
              this.water.setDepth(1);
            } else if (tileID === 'V') {
              this.water = this.physics.add.sprite(colIndex * tileSize, rowIndex * tileSize, tileID);
              this.water.setOrigin(0, 0).setDisplaySize(480, 256).setImmovable(true);
              this.physics.add.collider(this.character!, this.water);
              this.water.setDepth(1);
            } else if (tileID === 'W') {
              this.water = this.physics.add.sprite(colIndex * tileSize, rowIndex * tileSize, tileID);
              this.water.setOrigin(0, 0).setDisplaySize(96, 96).setImmovable(true);
              this.physics.add.collider(this.character!, this.water);
              this.water.setDepth(1);
            } else if (tileID === 'X') {
              this.water = this.physics.add.sprite(colIndex * tileSize, rowIndex * tileSize, tileID);
              this.water.setOrigin(0, 0).setDisplaySize(96, 96).setImmovable(true);
              this.physics.add.collider(this.character!, this.water);
              this.water.setDepth(1);
            } else if (tileID === '1') {
              this.water = this.physics.add.sprite(colIndex * tileSize, rowIndex * tileSize, tileID);
              this.water.setOrigin(0, 0).setDisplaySize(128, 192).setImmovable(true);
              this.physics.add.collider(this.character!, this.water);
              this.water.setDepth(1);
            } else if (tileID === '2') {
              this.water = this.physics.add.sprite(colIndex * tileSize, rowIndex * tileSize, tileID);
              this.water.setOrigin(0, 0).setDisplaySize(128, 192).setImmovable(true);
              this.physics.add.collider(this.character!, this.water);
              this.water.setDepth(1);
            } else if (tileID === '3') {
              this.water = this.physics.add.sprite(colIndex * tileSize, rowIndex * tileSize, tileID);
              this.water.setOrigin(0, 0).setDisplaySize(128, 192).setImmovable(true);
              this.physics.add.collider(this.character!, this.water);
              this.water.setDepth(1);
            } else if (tileID === '4') {
              this.water = this.physics.add.sprite(colIndex * tileSize, rowIndex * tileSize, tileID);
              this.water.setOrigin(0, 0).setDisplaySize(128, 192).setImmovable(true);
              this.physics.add.collider(this.character!, this.water);
              this.water.setDepth(1);
            } else if (tileID === 'a') {
              this.d1 = this.physics.add.sprite(colIndex * tileSize, rowIndex * tileSize, tileID);
              this.d1.setOrigin(0, 0).setDisplaySize(96, 32).setImmovable(true);
              this.physics.add.collider(this.character!, this.d1);
              colIndex +=2
            } else if (tileID === 'b') {
              this.d2 = this.physics.add.sprite(colIndex * tileSize, rowIndex * tileSize, tileID);
              this.d2.setOrigin(0, 0).setDisplaySize(96, 32).setImmovable(true);
              this.physics.add.collider(this.character!, this.d2);
              colIndex +=2
            } else if (tileID === 'c') {
              this.d3 = this.physics.add.sprite(colIndex * tileSize, rowIndex * tileSize, tileID);
              this.d3.setOrigin(0, 0).setDisplaySize(96, 32).setImmovable(true);
              this.physics.add.collider(this.character!, this.d3);
              colIndex +=2
            } else if (tileID === 'd') {
              this.d4 = this.physics.add.sprite(colIndex * tileSize, rowIndex * tileSize, tileID);
              this.d4.setOrigin(0, 0).setDisplaySize(96, 32).setImmovable(true);
              this.physics.add.collider(this.character!, this.d4);
              colIndex +=2
            } else if (tileID === 'e') {
              this.d5 = this.physics.add.sprite(colIndex * tileSize, rowIndex * tileSize, tileID);
              this.d5.setOrigin(0, 0).setDisplaySize(96, 32).setImmovable(true);
              this.physics.add.collider(this.character!, this.d5);
              colIndex +=2
            } else if (tileID === 'f') {
              this.d6 = this.physics.add.sprite(colIndex * tileSize, rowIndex * tileSize, tileID);
              this.d6.setOrigin(0, 0).setDisplaySize(96, 32).setImmovable(true);
              this.physics.add.collider(this.character!, this.d6);
              colIndex +=2
            } else if (tileID === 'g') {
              this.d7 = this.physics.add.sprite(colIndex * tileSize, rowIndex * tileSize, tileID);
              this.d7.setOrigin(0, 0).setDisplaySize(96, 32).setImmovable(true);
              this.physics.add.collider(this.character!, this.d7);
              colIndex +=2
            } else if (tileID === 'h') {
              this.d8 = this.physics.add.sprite(colIndex * tileSize, rowIndex * tileSize, tileID);
              this.d8.setOrigin(0, 0).setDisplaySize(96, 32).setImmovable(true);
              this.physics.add.collider(this.character!, this.d8);
              colIndex +=2
            } else if (tileID === 'i') {
              this.d9 = this.physics.add.sprite(colIndex * tileSize, rowIndex * tileSize, tileID);
              this.d9.setOrigin(0, 0).setDisplaySize(96, 32).setImmovable(true);
              this.physics.add.collider(this.character!, this.d9);
              colIndex +=2
            } else if (tileID === 'j') {
              this.d10 = this.physics.add.sprite(colIndex * tileSize, rowIndex * tileSize, tileID);
              this.d10.setOrigin(0, 0).setDisplaySize(96, 32).setImmovable(true);
              this.physics.add.collider(this.character!, this.d10);
              colIndex +=2
            } else if (tileID === 'k') {
              this.d11 = this.physics.add.sprite(colIndex * tileSize, rowIndex * tileSize, tileID);
              this.d11.setOrigin(0, 0).setDisplaySize(96, 32).setImmovable(true);
              this.physics.add.collider(this.character!, this.d11);
              colIndex +=2
            }
        }
      }        
    });
    

    this.input.keyboard?.on('keydown-E', () => {
      const nearbyObject = this.NearbyObjects();

      console.log(this.character!.x + "@@" + this.character!.y)
  
      if (nearbyObject === 'door') {
        this.openDoor();
      } else if(nearbyObject === 'board') {
        store.dispatch(setModal('QnA게시판'))
      } else if (nearbyObject && typeof nearbyObject !== 'string') {
        this.sitdown(nearbyObject);
    }
  });
      this.loadDoorParts();
      
      

      this.initializeWebRTC();
  }


  /////////////////////////// WEBRTC

  initializeSocket() {
    this.socket = io(process.env.REACT_APP_FRONT_SERVER+'');
    this.socket.on('offer', this.handleOffer.bind(this));
    this.socket.on('answer', this.handleAnswer.bind(this));
    this.socket.on('ice-candidate', this.handleIceCandidate.bind(this));

    // 페이지를 벗어나거나 새로고침할 때 disconnect-user 이벤트 전송
    window.addEventListener("beforeunload", () => {
      this.socket.emit('disconnect-user', { userId: localStorage.getItem('OVSession') });
  });
  }

  initializeWebRTC() {
    this.initializeSocket();
    this.joinSession();
  }

  joinSession() {
    const sessionName = localStorage.getItem('OpenViduSessionName');
    this.socket.emit('join-session', { sessionId: sessionName, userId: localStorage.getItem('OVSession') });
  }
  
  handleDataChannelMessage(userId: string, event: any) {
    const receivedData = JSON.parse(event.data);
    if (receivedData.id && receivedData.position) {
      let remoteChar = this.remoteCharacters[receivedData.id];

      if (!remoteChar) {
          remoteChar = this.physics.add.sprite(receivedData.position.x, receivedData.position.y, receivedData.type + '');
          this.remoteCharacters[receivedData.id] = remoteChar;
      }
      remoteChar.setPosition(receivedData.position.x, receivedData.position.y);
      if (receivedData.state === 'B') {
          remoteChar.setAlpha(0.4);
      }
      if (receivedData.chat) {
          // 메세지 처리하는 출근하고나서 만들어보자 ㅇㅇ...
      }
    }
  }

  async handleNewPeer(data: any) {
    const otherUserId = data.userId;

    const pc = this.createPeerConnection(otherUserId);
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    this.socket.emit('offer', { offer, to: otherUserId });
  }

  createPeerConnection(userId: string): RTCPeerConnection {
    const configuration: RTCConfiguration = {
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
        ],
    };

    const pc = new RTCPeerConnection(configuration);
    this.peerConnections[userId] = pc;
      pc.onicecandidate = event => {
        if (event.candidate) {
            this.socket.emit('ice-candidate', { candidate: event.candidate, to: userId });
        }
      };

    const dataChannel = pc.createDataChannel('dataChannel');
    this.dataChannels[userId] = dataChannel;
    dataChannel.onopen = this.handleDataChannelOpen.bind(this, userId);
    dataChannel.onmessage = this.handleDataChannelMessage.bind(this, userId);

    pc.onconnectionstatechange = (event) => {
      if (pc.connectionState === "failed" || pc.connectionState === "closed" || pc.connectionState === "disconnected") {
          this.cleanupPeerConnection(userId);
      }
    };
    return pc;
  }

  cleanupPeerConnection(userId: string) {
    // Data Channel 제거
    const dataChannel = this.dataChannels[userId];
    if (dataChannel) {
      dataChannel.close();
      delete this.dataChannels[userId];
    }

    // Peer Connection 제거
    const pc = this.peerConnections[userId];
    if (pc) {
      pc.close();
      delete this.peerConnections[userId];
    }

    // 유저의 캐릭터 제거
    const remoteChar = this.remoteCharacters[userId];
    if (remoteChar) {
      remoteChar.destroy();
      delete this.remoteCharacters[userId];
    }
  }


  async handleOffer(data: any) {
    const otherUserId = data.from;
    if (!this.peerConnections[otherUserId]) {
      this.createPeerConnection(otherUserId);
    }

    const pc = this.peerConnections[otherUserId];
    await pc.setRemoteDescription(data.offer);
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);

    this.socket.emit('answer', { answer, to: otherUserId });
  }

  async handleAnswer(data: any) {
    const otherUserId = data.from;
    const pc = this.peerConnections[otherUserId];
    if (pc) {
      await pc.setRemoteDescription(data.answer);
    }
  }

  handleIceCandidate(data: any) {
    const otherUserId = data.from;
    const iceCandidate = new RTCIceCandidate(data.candidate);
    const pc = this.peerConnections[otherUserId];
    if (pc) {
      pc.addIceCandidate(iceCandidate);
    }
  }

  handleDataChannelOpen(userId: string, event: any) {
    console.log(`연결완료 with user: ${userId}`);
  }

  // 메세지 처리과정
  sendChatMessage(message: string) {
    this.sendCharacterData(message);
  }

  // 캐릭터의 위치나 상태가 변경될 때 호출
  sendCharacterData(message?: string) {
    const currentUserId = localStorage.getItem('OVToken');

    const dataToSend = {
      id: currentUserId,
      position: { x: this.character?.x || 0, y: this.character?.y || 0 },
      state: this.sittingOnChair, //의자에 앉아 있으면 true 아니면 false
      type: localStorage.getItem('SelectCharacter'),
      chat: message,
    };

    // 모든 연결된 유저에게 데이터 전송
    for (const userId in this.dataChannels) {
      if (userId !== currentUserId) { // 현재 유저 제외
        const targetDataChannel = this.dataChannels[userId];
        if (targetDataChannel && targetDataChannel.readyState === 'open') {
          targetDataChannel.send(JSON.stringify(dataToSend));
        }
      }
    }
  }


/////////////////////////////


  
  
    update() {

      const currentPlayerPosition = { x: this.character!.x, y: this.character!.y };

      if (!this.prevPosition || (this.prevPosition.x !== currentPlayerPosition.x || this.prevPosition.y !== currentPlayerPosition.y)) {
        this.sendCharacterData();
      }

      if (store.getState().isAllowMove && this.cursors && this.character && !this.sittingOnChair) {
        if (this.cursors.left?.isDown) {
          this.character.setVelocityX(-640);
        } else if (this.cursors.right?.isDown) {
          this.character.setVelocityX(640);
        } else {
          this.character.setVelocityX(0);
        }
  
        if (this.cursors.up?.isDown) {
          this.character.setVelocityY(-640);
        } else if (this.cursors.down?.isDown) {
          this.character.setVelocityY(640);
        } else {
          this.character.setVelocityY(0);
        }
      }

      const buffer = 10;  // 경계값에 10의 버퍼
        if (this.character!.y >= 0 && this.character!.y <= 736 - buffer && !this.deadzoneActive) {
            this.cameras.main.setDeadzone(256, 256);
            this.deadzoneActive = true;
        } else if ((this.character!.y < 0 || this.character!.y > 736 + buffer) && this.deadzoneActive) {
            this.cameras.main.setDeadzone(0, 0);
            this.deadzoneActive = false;
        }

      let currentDate = new Date();
      let hours = String(currentDate.getHours()).padStart(2, '0');
      let minutes = String(currentDate.getMinutes()).padStart(2, '0');
      let seconds = String(currentDate.getSeconds()).padStart(2, '0');

      this.clockText.setText(`${hours}:${minutes}:${seconds}`);
      this.clockText2.setText(`${hours}:${minutes}:${seconds}`);
      this.clockText3.setText(`${hours}:${minutes}:${seconds}`);

      this.NearbyObjects()
    }



    private NearbyObjects(): 'door' | 'board' | { x: number, y: number } | null {
      const doorPosition = { x: 1024, y: 768 }; // 문
      const boardPosition = { x: 1236, y: 835 }; // 게시판
      const chairPositions = this.chairPositions; // 의자

      if (this.character) {
          const distanceToDoor = Phaser.Math.Distance.Between(this.character.x, this.character.y, doorPosition.x, doorPosition.y);
          if (distanceToDoor <= 140 && distanceToDoor > 32) {
            this.balloon.setPosition(this.character.x, this.character.y - this.character.height / 2 - this.balloon.height / 2).setVisible(true);
              return 'door';
          }

          const distanceToBoard = Phaser.Math.Distance.Between(this.character.x, this.character.y, boardPosition.x, boardPosition.y);
          if (distanceToBoard <= 64) {
            this.balloon.setPosition(this.character.x, this.character.y - this.character.height / 2 - this.balloon.height / 2).setVisible(true);
            return 'board';
        }
  
          let nearestChair: { x: number, y: number } | null = null;
          let nearestDistance: number = Infinity;
          for (const chairPos of chairPositions) {
              const distanceToChair = Phaser.Math.Distance.Between(this.character.x, this.character.y, chairPos.x, chairPos.y);
              if (distanceToChair < 32 && distanceToChair < nearestDistance) {
                this.balloon.setPosition(this.character.x, this.character.y - this.character.height / 2 - this.balloon.height / 2).setVisible(true);
                  nearestChair = chairPos;
                  nearestDistance = distanceToChair;
              }
          }
          if (nearestChair) {
              return nearestChair;
          }
      }
      this.balloon.setVisible(false);
      return null; // 주변에 아무 오브젝트도 없다면 null
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
        if (this.doorOpened) {
            this.closeDoor(); // 만약 문이 열려있다면, 문을 닫는다
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
        
        if (!this.doorOpened) {
            return;  // 문 주변에 있지 않거나 문이 이미 닫혀있으면 함수를 빠져나옴
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
        this.doorParts.forEach((part) => {
            (part.body as Phaser.Physics.Arcade.Body).enable = false;
        });
    }

    sitdown(chairPosition: { x: number, y: number }){
      if (this.sittingOnChair) {  
          this.character!.x += 32;
          this.character!.setAlpha(1);
          this.sittingOnChair = false;
      } else {  
          this.character!.x = chairPosition.x;
          this.character!.y = chairPosition.y - 16;
          this.character!.setAlpha(0.4);
          this.sittingOnChair = true;
      }
    }
}