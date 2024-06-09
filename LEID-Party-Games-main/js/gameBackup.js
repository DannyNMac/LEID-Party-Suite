config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'gameLocation',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);

let rpText;
let rpScore = 0;
let gpText;
let gpScore = 0;
let enterKey;
let spaceBar;
let player;
let player1ButtonDown = false;
let player2ButtonDown = false;
let rpImage;
let gpImage;
let gameTimer = 5000;
let gamePaused = false;

function preload ()
{
    this.load.image('gp', './images/greenPlayer.png');
    this.load.image('gpo', './images/greenPlayerOpaque.png');
    this.load.image('rp', './images/redPlayer.png');
    this.load.image('rpo', './images/redPlayerOpaque.png');
}

function create ()
{
    console.log('space');
    this.add.image(150,300,'gpo').setScale(0.2, 0.2);
    this.add.image(650,300,'rpo').setScale(0.2, 0.2);
    //this.player = this.physics.add.sprite(400,100, 'logo');

    this.cameras.main.setBackgroundColor('#FFFFD1');

    gpText = this.add.text(230, 20, '0', {  //you have to minus 70 from x position of first text object as phaser positions object from the left no the center
        fontSize: '100px',
        fontFamily: 'Clarendon',
        fill: '#77DD77'
    })

    rpText = this.add.text(500, 20, '0', {
        fontSize: '100px',
        fontFamily: 'Clarendon',
        fill: '#FF6961'
    })

    enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
}

function update()
{
    gameTimer++;
    console.log(gameTimer);
    if(spaceBar.isDown && player1ButtonDown == false && player2ButtonDown == false)
    {
        player1ButtonDown = true;
        gpImage = this.add.image(150,300,'gp').setScale(0.2, 0.2);
        console.log('space');
        gpAddScore();
    }

    if(enterKey.isDown && player2ButtonDown == false && player1ButtonDown == false)
    {
        player2ButtonDown = true;
        rpImage = this.add.image(650,300,'rp').setScale(0.2, 0.2);
        console.log('enter');
        rpAddScore();
    }

    if(enterKey.isDown && player1ButtonDown == true)
    {
        gpImage.destroy();
    }

    if(gameTimer == 5000 && gamePaused)
    {
        console.log('time to play');
        gamePaused = false;
        player1ButtonDown = false;
        player2ButtonDown = false;
    }
}

function rpAddScore()
{
    rpScore++;
    rpText.setText(rpScore);
    startTimer();
    return false;
}

function gpAddScore()
{
    gpScore++;
    gpText.setText(gpScore);
    startTimer();
    return false;
}

function startTimer()
{
    console.log('timer reset');
    gamePaused = true;
    gameTimer = 0;
}