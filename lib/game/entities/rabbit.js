ig.module(
        'game.entities.rabbit'
    )
    .requires(        
        'plusplus.core.config',
        'plusplus.core.animation',
        'game.abstractities.enemy'
    )
    .defines(function () {
        "use strict";

        var _c = ig.CONFIG;
        var _ut = ig.utils;
        
        ig.EntityRabbit = ig.global.EntityRabbit = ig.Enemy.extend({            
            collides: ig.Entity.COLLIDES.ACTIVE,

            animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'dummy.png', 32, 32),
            animSettings: true,            
            damageSettings: {
                spawnCountMax: _c.CHARACTER.EXPLODING_DAMAGE_PARTICLE_COUNT,
                spawnSettings: {
                    animTileOffset: ig.EntityParticleColor.colorOffsets.GRAY
                }
            },
            deathSettings: {
                spawnCountMax: _c.CHARACTER.EXPLODING_DEATH_PARTICLE_COUNT,
                spawnSettings: {
                    animTileOffset: ig.EntityParticleColor.colorOffsets.GRAY
                }
            },    
            maxVelUngrounded: {x: 50, y:50},
            frictionUngrounded: {x: 0, y:0},                        
            speed: {x: 50, y:50},
            initTypes: function () {

                this.parent();

                _ut.addType(ig.EntityExtended, this, 'type', "DAMAGEABLE");

            }            
        });

    });