var devquest = devquest || {};
devquest.entities = devquest.entities || {};

ig.module(
        'devquest.entities.puzzle-cube'
    )
    .requires(
        'plusplus.core.config',
        'plusplus.core.entity'
    )
    .defines(function () {
        "use strict";

        var _c = ig.CONFIG;

        devquest.entities.EntityPuzzleCube = ig.EntityPuzzleCube = ig.global.EntityPuzzleCube = ig.EntityExtended.extend({

            animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'puzzle-cube.png', 16, 16),
            healthMax: 100,

            size: { x: 8, y: 12},
            offset:{ x: 4, y: 2 },

            performance: ig.EntityExtended.PERFORMANCE.DYNAMIC,
            collides: ig.EntityExtended.COLLIDES.ACTIVE,

            friction: {x: 10, y: 10},
            bounciness: 0.8,
            maxVel: {x: 300, y: 300},

            animSettings: {
                idle: false,
                idleLeft: false,
                idleRight: false,
                idleUp: false,
                idleDown: false,
                moveLeft: false,
                moveRight: false,
                moveUp: false,
                moveDown: false
            }

        });

    });