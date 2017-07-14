import { Phaser } from './utils/phaser-loader'
import state from './key/index'

let game = new Phaser.Game(800, 600, Phaser.Auto, "container", state);

export default game;
