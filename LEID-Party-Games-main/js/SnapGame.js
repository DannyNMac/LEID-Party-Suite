    config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'gameLocation',
    physics: {
        default: 'arcade',
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
let player1ButtonDown = false;
let player2ButtonDown = false;
let rpImage;
let gpImage;
let gameTimer = 5001;
let gamePaused = false;

let redSnap;
let greenSnap;
let target = new Phaser.Math.Vector2();
let screenCenter = new Phaser.Math.Vector2(400, 300);
let offScreen = new Phaser.Math.Vector2(750, 300);
let moving = false;
let SnapX = 0.2;
let SnapY = 0.2;


function preload ()
{
    this.load.image('gp', './images/greenPlayer.png');
    this.load.image('gpo', './images/greenPlayerOpaque.png');
    this.load.image('rp', './images/redPlayer.png');
    this.load.image('rpo', './images/redPlayerOpaque.png');
    this.load.image('rSnap', './images/snapRed.png');
    this.load.image('gSnap', './images/snapGreen.png');
}

function create ()
{
    console.log('space');
    this.add.image(150,300,'gpo').setScale(0.2, 0.2);
    this.add.image(650,300,'rpo').setScale(0.2, 0.2);

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

function update(time, delta)
{
    gameTimer += delta;
    if(spaceBar.isDown && player1ButtonDown == false && player2ButtonDown == false) //checks if player one presses button
    {
        player1ButtonDown = true;
        gpImage = this.add.image(150,300,'gp').setScale(0.2, 0.2);
        greenSnap = this.add.image(400, 300, 'gSnap').setScale(0.2, 0.2);
        console.log('space');
        gpAddScore();
    }

    if(enterKey.isDown && player2ButtonDown == false && player1ButtonDown == false) //checks if player two presses button
    {
        player2ButtonDown = true;
        rpImage = this.add.image(650,300,'rp').setScale(0.2, 0.2);
        redSnap = this.add.image(400, 300, 'rSnap').setScale(0.2, 0.2);
        console.log('enter');
        rpAddScore();
    }

    if(gameTimer > 5000 && gamePaused) //restarts the game after a short cooldown
    {
        console.log('time to play');
        gamePaused = false;
        if(player1ButtonDown)
        {
            gpImage.destroy();
            greenSnap.destroy();
        }
        else
        {
            rpImage.destroy();
            redSnap.destroy();
        }
        SnapY = 0.2;
        SnapX = 0.2;
        player1ButtonDown = false;
        player2ButtonDown = false;
    }
    else if (gameTimer > 2500 && gamePaused)
    {
        SnapX += 0.1;
        SnapY += 0.1;
        if(player1ButtonDown)
        {
            greenSnap.setScale(SnapX, SnapY);
        }
        else
        {
            redSnap.setScale(SnapX, SnapY);
        }
    }
}

function rpAddScore() //adds score to player two
{
    rpScore++;
    rpText.setText(rpScore);
    startTimer();
    return false;
}

function gpAddScore() //adds score to player one
{
    gpScore++;
    gpText.setText(gpScore);
    startTimer();
    return false;
}

function startTimer() //starts timer
{
    console.log('timer reset');
    gamePaused = true;
    gameTimer = 0;
}