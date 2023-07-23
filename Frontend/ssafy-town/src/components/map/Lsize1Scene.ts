import Phaser from 'phaser';

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

    private character?: Phaser.Physics.Arcade.Sprite;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private walls?: Phaser.Physics.Arcade.StaticGroup;
    private clockText!: Phaser.GameObjects.Text; //우하시계
    private clockText2!: Phaser.GameObjects.Text; //우상시계
    private clockText3!: Phaser.GameObjects.Text; //좌하시계
    private deadzoneActive: boolean = false;  // 데드존 상태 추적 변수


    private doorParts: Phaser.GameObjects.Image[] = [];
    private doorOpenTween?: Phaser.Tweens.Tween;
    private doorOpened: boolean = false; // 현재 문의 상태

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
        this.openDoor();
      });
      
  

      
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
    }

    private isNearDoor(): boolean {     //캐릭터가 문 주변에 있는가?
        if (this.character) {            
            const doorCenterX = 1024;  // 문의 중심 X 좌표
            const doorCenterY = 768;  // 문의 중심 Y 좌표
            
            const distance = Phaser.Math.Distance.Between(this.character.x, this.character.y, doorCenterX, doorCenterY);
            
            return distance > 32 && distance <= 160;  // 문 주변에 있어야함, 문이랑 겹치면 안됨
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
        
        if (!this.isNearDoor() || !this.doorOpened) {
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
        this.doorParts.forEach((part, index) => {
            (part.body as Phaser.Physics.Arcade.Body).enable = false;
        });
    }
}