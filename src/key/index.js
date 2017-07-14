import game from './../app'

function preload() {
    game.load.image('bird', '../static/images/bird.png');
    game.stage.backgroundColor = "#736357";
}

let bird;
let upKey;
let downKey;
let leftKey;
let rightKey;
let opacityAddKey;
let opacitySubKey;

function create() {
    bird = game.add.sprite(300, 300, 'bird');
    upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    opacityAddKey = game.input.keyboard.addKey(Phaser.Keyboard.X);
    opacitySubKey = game.input.keyboard.addKey(Phaser.Keyboard.Z);
}

function update() {
    if(upKey.isDown){
        bird.y--;
    }else if(downKey.isDown){
        bird.y++;
    }
    if(leftKey.isDown){
        bird.x--;
    }else if(rightKey.isDown){
        bird.x++;
    }
    if(opacityAddKey.isDown){
        if(bird.alpha < 1){
            bird.alpha += 0.1;
        }
    }
    if(opacitySubKey.isDown){
        if(bird.alpha > 0){
            bird.alpha -= 0.1;
        }
    }
}

let state = { preload: preload, create: create, update: update };

export default state;