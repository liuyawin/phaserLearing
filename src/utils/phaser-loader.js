'use strict'

if (typeof window != 'undefined') {
    window.PIXI = require('pixi');
    window.p2 = require('p2');

    module.exports = window.Phaser = require('phaser');
} else {
    global.PIXI = require('pixi');
    global.p2 = require('p2');

    module.exports = global.Phaser = require('phaser');
}
//export { Phaser, PIXI };