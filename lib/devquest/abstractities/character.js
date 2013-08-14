var devquest = devquest || {};
devquest.abstractities = devquest.abstractities || {};

ig.module(
		'devquest.abstractities.character'
	)
	.requires(  
		'impact.game',
		'plusplus.core.config',
		'plusplus.core.entity',
		'plusplus.helpers.utils',
		'plusplus.helpers.utilsmath',
		'plusplus.helpers.utilsvector2',
		'plusplus.abstractities.character'
	)
	.defines(function () {
		"use strict";

		var _c = ig.CONFIG;
		var _ut = ig.utils;
		var _utm = ig.utilsmath;
		var _utv = ig.utilsvector2;

		//todo: could we inject this into the plusplus CharacterExtended
		//		instead of having all of the devquest stuff extend from this?
		//		that would prevent duplication of some of these into Player, etc.
		devquest.abstractities.Character = ig.Character.extend({

			controllable: false,
			collides: ig.Entity.COLLIDES.ACTIVE,
			performance: _c.KINEMATIC, 
			gravityFactor: 0,

			damageSettings: {
				spawnSettings: {
					animTileOffset: ig.EntityParticleColor.colorOffsets.GRAY
				}
			},
			deathSettings: {
				spawnSettings: {
					animTileOffset: ig.EntityParticleColor.colorOffsets.GRAY
				}
			},
			animSettings: {
				left: {
					frameTime: 0.1,
					sequence: [3,4,5,4]
				},
				right: {
					frameTime: 0.1,
					sequence: [6,7,8,7]
				},
				up: {
					frameTime: 0.1,
					sequence: [9,10,11,10]
				},
				down: {
					frameTime: 0.1,
					sequence: [0,1,2,1]
				}
			},
			activated: true,

			//TODO: LOOK AT REPLACING THESE WITH SETTINGS
			maxVelUngrounded: {x: 50, y:50},
			frictionUngrounded: {x: 0, y:0},
			speed: {x: 50, y:50}

		});
	});