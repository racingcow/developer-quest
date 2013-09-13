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
			offset:{x:1,y:0}
		});

	});