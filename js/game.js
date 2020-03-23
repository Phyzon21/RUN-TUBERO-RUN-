window.onload = function() {

    var gameConfig = {
        type: Phaser.AUTO,
        width: 1024,
        height: 512,
        scene: [Boot, playGame,playGame2,playGame3, DeathScene],

        physics: {
            default: "arcade"
        }
    }
    game = new Phaser.Game(gameConfig);

}
