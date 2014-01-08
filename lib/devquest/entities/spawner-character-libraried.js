var devquest = devquest || {};
devquest.entities = devquest.entities || {};

ig.module(
        'devquest.entities.spawner-character-libraried'
    )
    .requires(
        'plusplus.abstractities.spawner-character',
        'devquest.entities.enemy-factory',
        'devquest.entities.before-light'
    )
    .defines(function () {
        "use strict";

        var _c = ig.CONFIG;

        // this is intended for use in the level editor so that we don't need to define a new spawner for each spawnable entity.
        // everything this thing can spawn needs to be referenced above in the 'requires' section
        devquest.entities.EntitySpawnerCharacterLibraried = ig.global.EntitySpawnerCharacterLibraried = ig.SpawnerCharacter.extend({

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
            size: { x: 64, y: 40 },
            offset:{ x: 0, y: -5 },

            frozen: false,

            spawnAtSide: { x: 0, y: 1 },

            animSheetWidth: 64,
            animSheetHeight: 64,

            spawnNext: function( entity ) {

                var spawnedEntity = this.parent( entity );

                // spawners spawning spawners should auto-activate spawners!
                // this allows for weltmeister to be used to setup nested spawning scenarios
                if (spawnedEntity instanceof ig.Spawner) {
                    spawnedEntity.activate( this );
                }

                return spawnedEntity;

            }

        });

    });

