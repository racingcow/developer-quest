var devquest = devquest || {};
devquest.entities = devquest.entities || {};

ig.module(
        'devquest.entities.traitor'
    )
    .requires(
        'plusplus.core.config',
        'plusplus.core.animation',
        'plusplus.abstractities.character'
    )
    .defines(function () {
        "use strict";

        var _c = ig.CONFIG;
        var _ut = ig.utils;

        devquest.entities.EntityTraitor = ig.EntityTraitor = ig.global.EntityTraitor = ig.Character.extend({
            
            animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'traitor-bot.png', 32, 32),

            animSettings: {
                idle: {
                    sequence: [0]
                },
                talk: {
                    frameTime: 0.1,
                    sequence: [0, 1]
                },
                talkLeft: {
                    frameTime: 0.1,
                    sequence: [0, 1]
                },
                talkRight: {
                    frameTime: 0.1,
                    sequence: [0, 1]
                },
                talkUp: {
                    frameTime: 0.1,
                    sequence: [0, 1]
                },
                talkDown: {
                    frameTime: 0.1,
                    sequence: [0, 1]
                }
            },

            collides: ig.Entity.COLLIDES.ACTIVE,
            performance: ig.EntityExtended.PERFORMANCE.DYNAMIC,

            makeDamagable: function () {

                _ut.addType( ig.EntityExtended, this, 'type', 'DAMAGEABLE' );

            }

        });

    });