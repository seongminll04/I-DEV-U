import Phaser from 'phaser';
import store from '../../store/store'
import { Message } from '@stomp/stompjs';
// import { setModal } from '../../store/actions';

type AssetKeys = 'A2' | 'B2' | 'C2' | 'D2' | 'E2' | 'F2' | 'G2' | 'H2' | 'I2' | 'J2' |
                 'K2' | 'L2' | 'M2' | 'N2' | 'O2' | 'P2' | 'Q2' | 'R2' | 'S2' | 'T2' |
                 'U2' | 'V2' | 'W2' | 'X2' | 'Y2' | 'Z2' | 'a2' | 'b2' | 'c2' | 'd2' |
                 'e2' | 'f2';
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
  'f2': '/assets/button.png'
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
B2Z2W2X2Y2Z2W2X2Y2Z2W2X2Y2Z2W2X2Y2Z2W2X2Y2Z2W2X2Y2Z2W2X2Y2Z2W2X2Y2Z2W2X2Y2Z2W2X2Y2Z2W2X2Y2Z2W2X2Y2Z2f2X2Y2Z2W2X2Y2Z2W2X2Y2Z2W2Z2W2X2Y2Z2W2X2Y2Z2W2X2Y2Z2W2X2Y2Z2W2X2Y2Z2W2X2Y2Z2W2X2Y2Z2W2X2Y2Z2W2X2Y2Z2W2B2
B2L2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2L2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2J2B2
`;

export class Msize1Scene extends Phaser.Scene {
    private dataChannels: { [id: string]: RTCDataChannel } = {}; 
    private prevPosition: { x: number, y: number } | null = null;
    private remoteCharacters: { [id: string]: Phaser.GameObjects.Sprite } = {};
    private lastSentTime: number = 0;
    private remoteCharacterNames: { [id: string]: Phaser.GameObjects.Text } = {};
    private remoteCharactersLastUpdate: { [id: string]: number } = {}; // 여기에 추가

    private character?: Phaser.Physics.Arcade.Sprite;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private walls?: Phaser.Physics.Arcade.StaticGroup;
    private balloon!: Phaser.GameObjects.Sprite;

    private thing?: Phaser.Physics.Arcade.Sprite;

    private sittingOnBench: boolean = false; // 현재 앉아있니?
    private buttontext: string = '';
  
    constructor() {
      super({ key: 'Msize1Scene' });
      
    }
  
    preload() {
      for (let char in ASSETS) {
        this.load.image(char, (ASSETS as Record<string, string>)[char]);
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

      // 타일 이미지 로드
      this.load.image('character', 'assets/admin_character.png');
      this.load.image('character2', 'assets/admin_character.png');
      this.load.image('balloon', 'assets/ekey.png');
    }
  
    create() {
      const rows = pattern.trim().split('\n');
      const tileSize = 32;  // 타일 크기 설정
  
      this.walls = this.physics.add.staticGroup();

      this.balloon = this.add.sprite(0, 0, 'balloon').setVisible(false);
      this.balloon.setDepth(2);
  
      // const mapCenterX = rows[0].length * tileSize / 2;
      const mapCenterY = rows.length * tileSize / 2;

      const userCharacter = localStorage.getItem("character") || '0';

      var playerNumber = 1;  // 예: 1 또는 2
      if (localStorage.getItem('userNum')===localStorage.getItem('OVsession')) {
        playerNumber=2
      }
      let startX = 52;

      if (playerNumber === 1) {
          startX = 52;
      } else if (playerNumber === 2) {
          startX = 3210;
      }

      this.character = this.physics.add.sprite(startX, mapCenterY + 72, `${  userCharacter}2`).setOrigin(0.5, 0.5);
      this.physics.add.collider(this.character, this.walls);  // 캐릭터와 벽 사이의 충돌 설정
      this.character?.setDepth(2); // 캐릭터부터 생성했으니 depth를 줘야 캐릭터가 화면에 보임

      this.createAnimationsForCharacter(userCharacter); // 방향 애니메이션

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
              // this.physics.add.collider(this.character!, this.thing);
              this.thing.setDepth(1);
            } else if (tileID === 'f2') {
              this.thing = this.physics.add.sprite((colIndex / 2) * tileSize, rowIndex * tileSize, tileID);
              this.thing.setOrigin(0, 0).setDisplaySize(32, 32).setImmovable(true);
              // this.physics.add.collider(this.character!, this.thing);
              this.thing.setDepth(1);
            }
          }
          }
      });

      this.input.keyboard?.on('keydown-E', () => {
        const nearbyObject = this.isNear();

        if (nearbyObject === 'bench') {
          this.sitdown();
        }
        else if(nearbyObject === 'button'){
          this.showtext();
        }

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
  /////////////////////////// WEBRTC

  initializeWebRTC() {
    const stompClientRef = store.getState().stompClientRef;
    const sessionName = localStorage.getItem('OVsession');
    this.remoteCharacterNames = {};
    this.remoteCharactersLastUpdate = {};
  
    var location = this;

    setInterval(() => {
      // 5초마다 모든 유저의 데이터를 보내기
      this.sendCharacterData();

      // 10초마다 캐릭터 정보 확인 및 오래된 캐릭터 제거
      const now = Date.now();
      for (let id in this.remoteCharacters) {
        if (now - this.remoteCharactersLastUpdate[id] > 10000) {
          this.remoteCharacters[id].destroy(); // Phaser sprite 제거
          this.remoteCharacterNames[id]?.destroy(); // 이름 라벨도 제거
          delete this.remoteCharacters[id];
          delete this.remoteCharactersLastUpdate[id];
        }
      }
    }, 5000);
  
    if (stompClientRef) {
      stompClientRef.subscribe(`/sub/channel/${sessionName}`, function(message:Message) {
        const newMessage = JSON.parse(message.body);
  
        if (newMessage) {
          // 기존 캐릭터가 존재하는지 확인
          let remoteChar = location.remoteCharacters[newMessage.id];
          const userIdx = localStorage.getItem('userToken')
  
          // 캐릭터가 존재하지 않으면 새로 생성
          if (!remoteChar && newMessage.id !== userIdx) {
            remoteChar = location.physics.add.sprite(newMessage.position.x, newMessage.position.y, `${newMessage.type}2`);
            remoteChar.setDepth(3);
            location.remoteCharacters[newMessage.id] = remoteChar;

            const userName = newMessage.nickname || 'Unknown';
            const nameText = location.add.text(newMessage.position.x, newMessage.position.y - 30, userName, { color: 'black', align: 'center', fontSize: '14px', fontStyle: 'bold'});
            nameText.setOrigin(0.5, 0.5);
            nameText.setDepth(4);  // 캐릭터보다 위에 표시되게 depth를 설정
            location.remoteCharacterNames[newMessage.id] = nameText;
          }
            else if(remoteChar){
            // 캐릭터가 이미 존재하면 위치와 애니메이션 상태 업데이트
            remoteChar.setPosition(newMessage.position.x, newMessage.position.y);

            location.remoteCharacterNames[newMessage.id]?.setPosition(newMessage.position.x, newMessage.position.y - 30);
  
            // 애니메이션 상태 업데이트
            if (newMessage.direction) {
              if (!location.anims.exists(`${newMessage.type}-up`)) {
                location.createAnimationsForCharacter(newMessage.type);
              }
              remoteChar.play(`${newMessage.direction}`, true);
            }
            remoteChar.setAlpha(newMessage.state ? 0.4 : 1);
          }
          if(newMessage.text){
            location.buttontext = newMessage.text;
          }
          location.remoteCharactersLastUpdate[newMessage.id] = Date.now();
        }
      });
    }
  }

    // 캐릭터의 위치나 상태가 변경될 때 호출
    sendCharacterData(message?: string) {
      const currentUserId = localStorage.getItem('userToken');
      const currentUserNickname = localStorage.getItem('userNickname') || 'Unknown';  // 닉네임 가져오기
  
      const now = Date.now();
      if (now - this.lastSentTime < 20) { // 마지막으로 데이터를 보낸 후 100ms가 지나지 않았다면 리턴
        return;
      }
  
      const dataToSend = {
        id: currentUserId,
        position: { x: this.character?.x || 0, y: this.character?.y || 0 },
        state: this.sittingOnBench, //의자에 앉아 있으면 true 아니면 false
        type: localStorage.getItem('character'),
        direction: this.character?.anims.currentAnim?.key,  // 현재 애니메이션 상태
        frame: this.character?.anims.currentFrame?.index || 2,       // 현재 프레임 번호
        nickname: currentUserNickname,
        text: this.buttontext,
      };
      // const stompClientRef:Client|null = null;
      
      const stompClientRef =store.getState().stompClientRef
      const sessionName = localStorage.getItem('OVsession');
      if (stompClientRef) {
        stompClientRef.publish({
          destination:`/sub/channel/${sessionName}`,
          body:JSON.stringify(dataToSend)
        })
        this.lastSentTime = now;
      }
    }
  
  
  /////////////////////////////
  
  update() {
    const currentPlayerPosition = { x: this.character!.x, y: this.character!.y };

    if (!this.prevPosition || (this.prevPosition.x !== currentPlayerPosition.x || this.prevPosition.y !== currentPlayerPosition.y)) {
        this.sendCharacterData();
        this.prevPosition = currentPlayerPosition;
    }
    const text = this.add.text(1600, 400, this.buttontext, { color: '#ffffff', align: 'left', fontSize: '32px', fontStyle:'bold'});
      setTimeout(() => {
        text.destroy();
      }, 5000);

    if (store.getState().isAllowMove && this.cursors && this.character && !this.sittingOnBench) {
        let moved = false;
        
        if (this.cursors.left?.isDown) {
            this.character.setVelocityX(-320);
            this.character.play(`${localStorage.getItem("character") || '0'}-left`, true);
            moved = true;
        } else if (this.cursors.right?.isDown) {
            this.character.setVelocityX(320);
            this.character.play(`${localStorage.getItem("character") || '0'}-right`, true);
            moved = true;
        } else {
            this.character.setVelocityX(0);
        }

        if (this.cursors.up?.isDown) {
            this.character.setVelocityY(-320);
            if (!this.cursors.right?.isDown && !this.cursors.left?.isDown) {
                this.character.play(`${localStorage.getItem("character") || '0'}-up`, true);
            }
            moved = true;
        } else if (this.cursors.down?.isDown) {
            this.character.setVelocityY(320);
            if (!this.cursors.right?.isDown && !this.cursors.left?.isDown) {
                this.character.play(`${localStorage.getItem("character") || '0'}-down`, true);
            }
            moved = true;
        } else {
            this.character.setVelocityY(0);
        }

        // Set to idle frame if not moving
        if (!moved && this.character.anims.currentAnim) {
            let previousAnimationKey = this.character.anims.currentAnim.key;
            let direction = previousAnimationKey.split('-')[1]; 

            if (['left', 'right', 'up', 'down'].includes(direction)) {
                let idleFrameKey = {
                    'left': '5',
                    'right': '8',
                    'up': 'B',
                    'down': '2'
                }[direction];

                if (idleFrameKey) {
                    this.character.setTexture(`${localStorage.getItem("character") || '0'}${idleFrameKey}`);
                }
            }
        }
    }

    this.isNear();
  }


    private isNear(): 'bench' | 'button' | null {     //캐릭터가 벤치 주변에 있는가?
      if (this.character) {            
          const benchCenterX = 1650;  // 벤치중심 X 좌표
          const benchCenterY = 150;  // 벤치중심 Y 좌표
          const buttonCenterX = 1620;
          const buttonCenterY = 280;

          const minX = benchCenterX - 32;
          const maxX = benchCenterX + 64;
          const minY = benchCenterY;
          const maxY = benchCenterY + 32;
          const minX2 = buttonCenterX - 32;
          const maxX2 = buttonCenterX + 32;
          const minY2 = buttonCenterY - 32;
          const maxY2 = buttonCenterY + 32;
          
          const charX = this.character.x;
          const charY = this.character.y;
          
          if (charX >= minX && charX <= maxX && charY >= minY && charY <= maxY) {
            this.balloon.setPosition(this.character.x, this.character.y - this.character.height / 2 - this.balloon.height / 2);
            if (!this.sittingOnBench) {
              this.balloon.setVisible(true);
            }
            return 'bench';
          }
          if (charX >= minX2 && charX <= maxX2 && charY >= minY2 && charY <= maxY2) {
            this.balloon.setPosition(this.character.x, this.character.y - this.character.height / 2 - this.balloon.height / 2);
            this.balloon.setVisible(true);
            return 'button';
          }
      }
      this.balloon.setVisible(false);
      return null;
  }

    sitdown(){
      if (!this.isNear()) {
        return;  // 밴치주변에 없으면 놉
      }
      else if(this.sittingOnBench){ //이미 앉아있으면
        this.character!.setAlpha(1);
        this.balloon.setVisible(true);
        this.sittingOnBench = false;
      }
      else{ //앉아있지않으면
      this.character!.setAlpha(0.4);
      this.character!.anims.stop();
      this.balloon.setVisible(false);
      this.sittingOnBench = true;
      }
    }

    showtext() {
      
      const texts = [
          "장점", "단점", "별명", "취미", "특기",
          "여행", "운동", "책", "영화", " 동물",
          "이상형", "계절", "음악", "음식", "친구",
          "로또", "초능력", "추억", "경치", "색깔",
          "기분", "단골", "좌우명", "수면", "MBTI",
          "언어", "관심사", "트렌드", "식물", "날씨"
      ];
      
      const randomText = Phaser.Math.RND.pick(texts);
      
      this.buttontext = randomText;
    }
  }
  