'use strict'

import SequencePlugin from './../../plugins/sequence-plugin.js';
import EE from 'eventemitter3';

class CmdKlass extends EE{
    constructor(scene) {
        super();

        this.scene = scene;
        this.myConsole = scene.add.text(100, 100, '');

        this['wait-click'] = this.waitClick;
        this['wait-time'] = this.waitTime;
    }

    // callbacks
    print(msg) {
        this.myConsole.setText(msg);
        return this.waitClick();
    }

    waitClick() {
        this.scene.input.once('pointerup', this.complete, this);
        return this;
    }

    complete() {
        this.emit('complete');
    }
}
class Demo extends Phaser.Scene {

    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('mushroom', 'assets/images/mushroom.png');
    }

    create() {
        var myCmds = new CmdKlass(this);

        var cmds = [
            ['print', 'A'],
            ['print', 'B'],
            ['print', 'C'],
            ['print', 'D'],
            ['print', 'E']
        ];

        var seq = new SequencePlugin(this);
        seq
            .load(cmds, myCmds, {
                yoyo: true,
                repeat: 1
            })
            .once('complete', myCmds.print.bind(myCmds, 'completed...'))
            .start();
    }

    update() {}
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo
};

var game = new Phaser.Game(config);