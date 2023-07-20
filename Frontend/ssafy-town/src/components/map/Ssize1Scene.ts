import Phaser from 'phaser';

// 이미지의 경로
const ASSETS = {
  'A': '.../public/assets/L1-1.png',
  'B': '.../public/assets/L1-2.png',
  'C': '.../public/assets/L1-3.png',
};

const pattern = `
BBBBBBBBBBBBBBBB
BAAAAAAAAAAAAAAB
BCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCB
BCCCCCCCCCCCCCCB
BAAAAAAAAAAAAAAB
BBBBBBBBBBBBBBBB
`;

export class Ssize1Scene extends Phaser.Scene {
  constructor() {
    super({ key: 'Ssize1Scene' });
  }

  preload() {
    // 각 문자를 기반으로 이미지를 로드
    for (let char in ASSETS) {
        this.load.image(char, (ASSETS as Record<string, string>)[char]);
    }
  }

  create() {
    const rows = pattern.trim().split('\n');
    const tileSize = 32;  // 타일의 크기

    rows.forEach((row, rowIndex) => {
      Array.from(row).forEach((char, colIndex) => {
        if ((ASSETS as Record<string, string>)[char]) {
            this.add.image(colIndex * tileSize, rowIndex * tileSize, char).setOrigin(0, 0);
          }
      });
    });
  }

  update() {
    // 별도의 게임 루프 로직이 필요한 경우 여기에 추가
  }
}
