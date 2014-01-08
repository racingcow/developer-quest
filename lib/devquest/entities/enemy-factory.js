var devquest = devquest || {};
devquest.entities = devquest.entities || {};

ig.module(
        'devquest.entities.enemy-factory'
    )
    .requires(
        'plusplus.core.config',
        'plusplus.abstractities.spawner-character'
    )
    .defines(function () {
        "use strict"; 

        var _c = ig.CONFIG;

        devquest.entities.EntityEnemyFactory = ig.EntityEnemyFactory = ig.global.EntityEnemyFactory = ig.SpawnerCharacter.extend({

            animSettings: { 
                idle: false,
                idleDown: false,
                idleUp: false,
                idleLeft: false,
                idleRight: false
            },

            performance: _c.STATIC,
            collides: ig.EntityExtended.COLLIDES.FIXED,

            healthMax: 100,
            size: { x: 48, y: 16 },
            offset:{ x: 8, y: 40 },

            frozen: false,

            spawnCountMax: 5,
            duration: 10,
            spawnDelay: -1,
            spawnAtSide: { x: 0, y: 1 },

            init: function(x, y, settings) {

                // if (settings.animSheetFileName) {
                //     settings.animSheet = new ig.AnimationSheet(_c.PATH_TO_MEDIA + settings.animSheetFileName, 64, 96);
                // }

                this.parent(x, y, settings);

                console.log('animSheetPath is ' + this.animSheetPath);
            }

        });
    });