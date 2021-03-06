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
        var _ut = ig.utils;

        devquest.entities.EntityPuzzleCube = ig.EntityPuzzleCube = ig.global.EntityPuzzleCube = ig.EntityExtended.extend({

            animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'puzzle-cube.png', 16, 16),
            healthMax: 100,
            health: 100,

            size: { x: 8, y: 12},
            offset:{ x: 4, y: 2 },

            performance: ig.EntityExtended.PERFORMANCE.DYNAMIC,
            collides: ig.EntityExtended.COLLIDES.ACTIVE,

            friction: {x: 20, y: 20},
            maxVel: {x: 150, y: 150},

            targetable: true,

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
            },

            initTypes: function () {

                this.parent();

                _ut.addType( ig.EntityExtended, this, 'type', 'DAMAGEABLE' );

            }

        });

    });