import game from './../app'

function preload() {
    //设置游戏边界
    game.world.setBounds(0, 0, 1920, 1200);
    game.load.image('map', '../static/images/keyboard/map.jpg');
    game.load.image('an', '../static/images/keyboard/angege.png');
    game.load.image('ball', '../static/images/keyboard/ball.png');
}

let map;
let an;
let cursors;
let noRotateKey;
let key1;

function create() {
    map = game.add.sprite(0, 0, 'map');
    an = game.add.sprite(0, 300, 'an');

    an.anchor.setTo(0.5, 0.5);//设置an的锚点
    an.width = 84;
    an.height = 90;
    game.camera.follow(an);//摄像机跟随an

    for (var i = 0; i < 5; i++) {
        var ball = game.add.sprite(game.world.randomX, game.world.randomY, 'ball');
        ball.width = 70;
        ball.height = 50;
    }

    cursors = game.input.keyboard.createCursorKeys();
    noRotateKey = game.input.keyboard.addKey(Phaser.Keyboard.Z);
    key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    key1.onDown.add(addBall, this);
    let text = game.add.text(32, 32, "按住shift+up/down旋转世界！", { fill: '#ffffff' });
}

function update() {
    // if (game.input.activePointer.withinGame) {
    //     game.input.enabled = true;
    //     game.stage.backgroundColor = '#736357';
    // } else {
    //     game.input.enabled = false;
    // }
    if (cursors.down.isDown) {
        //是否按下shift
        if (cursors.down.shiftKey) {
            game.world.rotation += 0.1;
        } else {
            if (an.y < 1200) an.y += 3;
        }
    } else if (cursors.up.isDown) {
        //是否按下shift
        if (cursors.up.shiftKey) {
            game.world.rotation -= 0.1;
        } else {
            if (an.y > 0) an.y -= 3;
        }
    }
    if (cursors.left.isDown) {
        if (an.x > 0) an.x -= 3;
        an.angle = -15;
    } else if (cursors.right.isDown) {
        if (an.x < 1920) an.x += 3;
        an.angle = 15;
    } else {
        an.angle = 0;
    }
    if (noRotateKey.isDown) {
        game.world.rotation = 0;
    }
}
function render() {
    game.debug.cameraInfo(game.camera, 32, 500);
}

function addBall() {
    let newBall = game.add.sprite(game.world.randomX, game.world.randomY, 'ball');
    let value = 100 * Math.random();
    newBall.width = value;
    newBall.height = value;
}

let state = { preload: preload, create: create, update: update, render: render };

export default state;