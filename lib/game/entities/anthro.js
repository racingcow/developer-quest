ig.module(
        'game.entities.anthro'
    )
    .requires(        
        'plusplus.core.config',
        'plusplus.core.animation',
        'game.abstractities.enemy'
    )
    .defines(function () {
        "use strict";

        var _c = ig.CONFIG;
        
        ig.EntityAnthro = ig.global.EntityAnthro = ig.Enemy.extend({            
            animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'anthro.png', 32, 32)
        });

    });