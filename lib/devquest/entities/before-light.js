var devquest = devquest || {};
devquest.entities = devquest.entities || {};

ig.module(
		'devquest.entities.before-light'
	)
	.requires(
		'plusplus.core.config',
		'plusplus.core.animation',
		'devquest.abstractities.enemy'
	)
	.defines(function () {
		"use strict";

		var _c = ig.CONFIG;

		devquest.entities.EntityBeforeLight = ig.EntityBeforeLight = ig.global.EntityBeforeLight = devquest.abstractities.Enemy.extend({
			animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'before-light.png', 32, 32),
			health: 10,
			healthMax: 10,
			friendlyName: 'EntityBeforeLight',
			size: {x:30,y:32},
			offset:{x:1,y:0},

            // For use in "arena defense" style game. Set these in weltmeister.
            // needsLineOfSightPrey: false,
            // searchDistance: 688,
            // reactionDistance: 688,
            // moveToPreySettings: {
            //     avoidEntities: true,
            //     searchDistance: 688,
            //     reactionDistance: 688
            // },

            // BeforeLight never stops moving because he flies all the time
            animSettings: {
                idle: {
                    frameTime: 0.1,
                    sequence: [0,1,2,1]
                },
                idleLeft: {
                    frameTime: 0.1,
                    sequence: [3,4,5,4]
                },
                idleRight: {
                    frameTime: 0.1,
                    sequence: [6,7,8,7]
                },
                idleUp: {
                    frameTime: 0.1,
                    sequence: [9,10,11,10]
                },
                idleDown: {
                    frameTime: 0.1,
                    sequence: [0,1,2,1]
                },
                moveLeft: {
                    frameTime: 0.1,
                    sequence: [3,4,5,4]
                },
                moveRight: {
                    frameTime: 0.1,
                    sequence: [6,7,8,7]
                },
                moveUp: {
                    frameTime: 0.1,
                    sequence: [9,10,11,10]
                },
                moveDown: {
                    frameTime: 0.1,
                    sequence: [0,1,2,1]
                }
            }

		});

	});