class playGame2 extends Phaser.Scene{
    constructor(){
        super("playGame2");
    }
    preload(){
        this.load.image("platform2", "assets/images/platform2.png");

     
        this.load.atlas('player', 'assets/sprites/player.png', 'assets/sprites/player.json');

       
        this.load.image("coin", "assets/images/coin.png");
        this.load.image("fly", "assets/images/fly.png");
        this.load.image('bg_desert', 'assets/images/bg_desert.png');

        this.load.audio('main', 'assets/sounds/level1.mp3');
        this.load.audio('jump', 'assets/sounds/jump.wav');
        this.load.audio('coin', 'assets/sounds/coin.mp3');
    }
    create(){
       world = 2;
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNames('player', {prefix: 'p1_walk', start: 1, end: 11, zeroPad: 2}),
            frameRate: 10,
            repeat: -1
        });
        var bg_grass = this.add.image(512, 256, 'bg_desert');
        
        text2 = this.add.text(775, 50, highscore2, {
            fontSize: '40px',
            fill: '#ffffff' 
        });
        text = this.add.text(210, 50, score2, {
            fontSize: '40px',
            fill: '#ffffff' 
        });
        highscoretext = this.add.text(700, 10, "HIGHSCORE", {
            fontSize: '40px',
            fill: '#ffffff' 
        });
        curscoretext = this.add.text(175, 10, "SCORE", {
            fontSize: '40px',
            fill: '#ffffff' 
        });
        this.addedPlatforms = 0;

        bgsound = this.sound.add('main',{
            volume: 0.3,
            loop: true
          });
        jumpSound = this.sound.add('jump',{
            volume: 1,
          });

        coinSound = this.sound.add('coin',{
            volume: 1,
          });
        bgsound.play();
    
        this.platformGroup = this.add.group({

         
            removeCallback: function(platform){
                platform.scene.platformPool.add(platform)
            }
        });

    
        this.platformPool = this.add.group({

            removeCallback: function(platform){
                platform.scene.platformGroup.add(platform)
            }
        });

        this.coinGroup = this.add.group({

            
            removeCallback: function(coin){
                coin.scene.coinPool.add(coin)
            }
        });

       
        this.coinPool = this.add.group({

          
            removeCallback: function(coin){
                coin.scene.coinGroup.add(coin)
            }
        });

       
        this.playerJumps = 0;

       
        this.addPlatform(game.config.width, game.config.width / 2, game.config.height * gameOptions.platformVerticalLimit[1]);

   
        this.player = this.physics.add.sprite(gameOptions.playerStartPosition, game.config.height * 0.5, "player");
        this.player.setGravityY(gameOptions.playerGravity);

  
        this.physics.add.collider(this.player, this.platformGroup, function(){

        
            if(!this.player.anims.isPlaying){
                this.player.anims.play("run");
                
                score2 += 10;
                text.setText(score2);
                text.setText(score2);
            
                if(score2 > highscore2){
                    highscore2 = score2;
                    text2.setText(highscore2);
                }
            }
        }, null, this);

     
        this.physics.add.overlap(this.player, this.coinGroup, function(player, coin){
            this.tweens.add({
                targets: coin,  
                callbackScope: this,
                onComplete: function(){
                    this.coinGroup.killAndHide(coin);
                    this.coinGroup.remove(coin);
                    coinSound.play();
                    score2 += 20; 
                    text.setText(score2);
             
                    if(score2 > highscore2){
                        highscore2 = score2;
                        text2.setText(highscore2);
                    }
                }
            });
        }, null, this);

  
      
        cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.on('keydown', this.jump, this)

        
    }


  
    addPlatform(platformWidth, posX, posY){
        this.addedPlatforms ++;
        let platform;
        if(this.platformPool.getLength()){
            platform = this.platformPool.getFirst();
            platform.x = posX;
            platform.y = posY;
            platform.active = true;
            platform.visible = true;
            this.platformPool.remove(platform);
            let newRatio =  platformWidth / platform.displayWidth;
            platform.displayWidth = platformWidth;
            platform.tileScaleX = 1 / platform.scaleX;
        }
        else{
            platform = this.add.tileSprite(posX, posY, platformWidth, 32, "platform2");
            this.physics.add.existing(platform);
            platform.body.setImmovable(true);
            platform.body.setVelocityX(Phaser.Math.Between(gameOptions2.platformSpeed[0], gameOptions2.platformSpeed[1]) * -1);
            this.platformGroup.add(platform);
        }
        this.nextPlatformDistance = Phaser.Math.Between(gameOptions.spawnRange[0], gameOptions.spawnRange[1]);

        if(this.addedPlatforms > 1){
            if(Phaser.Math.Between(1, 100) <= gameOptions.coinPercent){
                if(this.coinPool.getLength()){
                    let coin = this.coinPool.getFirst();
                    coin.x = posX;
                    coin.y = posY - 96;
                    coin.alpha = 1;
                    coin.active = true;
                    coin.visible = true;
                    this.coinPool.remove(coin);
                }
                else{
                    let coin = this.physics.add.sprite(posX, posY - 96, "coin");
                    coin.setImmovable(true);
                    coin.setVelocityX(platform.body.velocity.x);
    
                    this.coinGroup.add(coin);
                }
            }
        }
    }

   
    jump(){
        if(this.player.body.touching.down || (this.playerJumps > 0 && this.playerJumps < gameOptions.jumps)){
            if(this.player.body.touching.down){
                this.playerJumps = 0;
            }
            jumpSound.play();
            this.player.setVelocityY(gameOptions.jumpForce * -1);
            this.playerJumps ++;

        
            this.player.anims.stop();
        }
    }

    
    update(){

        if(this.player.y > game.config.height){
            bgsound.stop();
            this.scene.start("deathGame");
        }
        this.player.x = gameOptions.playerStartPosition;

 
        let minDistance = game.config.width;
        let rightmostPlatformHeight = 0;
        this.platformGroup.getChildren().forEach(function(platform){
            let platformDistance = game.config.width - platform.x - platform.displayWidth / 2;
            if(platformDistance < minDistance){
                minDistance = platformDistance;
                rightmostPlatformHeight = platform.y;
            }
            if(platform.x < - platform.displayWidth / 2){
                this.platformGroup.killAndHide(platform);
                this.platformGroup.remove(platform);
            }
        }, this);


        this.coinGroup.getChildren().forEach(function(coin){
            if(coin.x < - coin.displayWidth / 2){
                this.coinGroup.killAndHide(coin);
                this.coinGroup.remove(coin);
            }
        }, this);


        if(minDistance > this.nextPlatformDistance){
            let nextPlatformWidth = Phaser.Math.Between(gameOptions.platformSizeRange[0], gameOptions.platformSizeRange[1]);
            let platformRandomHeight = gameOptions.platformHeighScale * Phaser.Math.Between(gameOptions.platformHeightRange[0], gameOptions.platformHeightRange[1]);
            let nextPlatformGap = rightmostPlatformHeight + platformRandomHeight;
            let minPlatformHeight = game.config.height * gameOptions.platformVerticalLimit[0];
            let maxPlatformHeight = game.config.height * gameOptions.platformVerticalLimit[1];
            let nextPlatformHeight = Phaser.Math.Clamp(nextPlatformGap, minPlatformHeight, maxPlatformHeight);
            this.addPlatform(nextPlatformWidth, game.config.width + nextPlatformWidth / 2, nextPlatformHeight);
        }
    }
};
