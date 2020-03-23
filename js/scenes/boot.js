var cursors;
var score1 = 0;
var highscore1= 0;
var score2 =0;
var highscore2 = 0;
var score3 = 0;
var highscore3 = 0;
var text;
var text2;
var highscoretext;
var curscoretext;
var platformspeed1 = 300;
var platfromspeed2 = 300;
var platformSpeed;
var bgsound;
var jumpSound;
var coinSound;
var world = 0;

class Boot extends Phaser.Scene {
    constructor() {
      super("bootGame");
    }
    preload() {
  
      this.load.image('logo', 'assets/images/logo.png');
      this.load.image('easy', 'assets/images/easy.png');
      this.load.image('normal', 'assets/images/normal.png');
      this.load.image('hard', 'assets/images/hard.png');
      this.load.image('bg', 'assets/images/bg_grasslands.png');
    }
    create() {

      score1 = 0;
      this.add.image(512, 256, 'bg');
      this.add.image(512, 165, 'logo');
      
      const helloButton = this.add.image(512, 280, 'easy').setScale(0.8);
      helloButton.setInteractive();
      helloButton.on('pointerdown', () => { 
        this.scene.start("playGame");
       
      });
      const normalButton = this.add.image(512, 366, 'normal').setScale(0.8);
      normalButton.setInteractive();
      normalButton.on('pointerdown', () => { 
        this.scene.start("playGame2");
       
      });
      const hardButton = this.add.image(512, 450, 'hard').setScale(0.8);
      hardButton.setInteractive();
      hardButton.on('pointerdown', () => { 
        this.scene.start("playGame3");
       
      });
    }
  }

gameOptions = {

    // platform speed range
    platformSpeed: [platformspeed1, platfromspeed2],


    // spawn range, how far should be the rightmost platform from the right edge
    spawnRange: [80, 350],

    // platform width range, in pixels
    platformSizeRange: [90, 300],

    // a height range between rightmost platform and next platform to be spawned
    platformHeightRange: [-5, 5],

    // a scale to be multiplied by platformHeightRange
    platformHeighScale: 20,

    // platform max and min height, as screen height ratio
    platformVerticalLimit: [0.4, 0.8],

    
    // player gravity
    playerGravity: 900,

    // player jump force
    jumpForce: 400,

    // player starting X position
    playerStartPosition: 200,

    // consecutive jumps allowed
    jumps: 2,

    // % of probability a coin appears on the platform
    coinPercent: 25
}
gameOptions2 = {

  platformSpeed: [400, 400],
}

gameOptions3 = {


  platformSpeed: [550, 550],
}

