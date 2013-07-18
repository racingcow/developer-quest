ig.module(
        'game.entities.anthro2'
    )
    .requires(        
        'plusplus.core.config',
        'plusplus.core.animation',
        'game.abstractities.enemy'
    )
    .defines(function () {
        "use strict";

        var _c = ig.CONFIG;        
        
        ig.EntityAnthro2 = ig.global.EntityAnthro2 = ig.Enemy.extend({
            animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'anthro2.png', 32, 32)
        });

    });