var devquest = devquest || {};
devquest.entities = devquest.entities || {};

ig.module(
		'devquest.entities.anthro'
	)
	.requires(
		'plusplus.core.config',
		'plusplus.core.animation',
		'devquest.abstractities.enemy'
	)
	.defines(function () {
		"use strict";

		var _c = ig.CONFIG;

		devquest.entities.EntityAnthro = ig.EntityAnthro = ig.global.EntityAnthro = devquest.abstractities.Enemy.extend({			
			animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'anthro.png', 32, 32),
			health: 10,
			healthMax: 10,
			name: 'EntityAnthro',
			reset: function (x, y, settings) {
				this.parent(x, y, settings);
				console.log('reset EntityAnthro');
			}
		});

	});