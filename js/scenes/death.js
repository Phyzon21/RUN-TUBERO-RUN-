class DeathScene extends Phaser.Scene {
    constructor() {
      super("deathGame");
    }
    preload() {
      this.load.image('bg_grasslands', 'assets/images/bg_grasslands.png');
      this.load.image('restart', 'assets/images/restart.png');
      this.load.image('quit', 'assets/images/quit.png');
      this.load.image('death', 'assets/images/gameover.png');
    }
    create() {
    score1 = 0;
    score2 = 0;
    score3 = 0;
      this.add.image(512, 256, 'bg_grasslands');
      this.add.image(512, 200, 'death');
      const restartButton = this.add.image(370, 425, 'restart');
      restartButton.setInteractive();
        restartButton.on('pointerdown', () => { 
          if(world == 1){

          this.scene.start("playGame");
          }
          if (world == 2){
            this.scene.start("playGame2");
          }
          if (world == 3){
            this.scene.start("playGame3");
          }
    });
    const quitButton = this.add.image(650, 425 , 'quit');
    quitButton.setInteractive();
    quitButton.on('pointerdown', () => { 
      this.scene.start("bootGame");
    });
  }
}