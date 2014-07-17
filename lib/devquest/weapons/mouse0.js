var devquest = devquest || {};
devquest.weapons = devquest.weapons || {};

ig.module(
		'devquest.weapons.mouse0'
	)
	.requires(
		'plusplus.core.config',
		'plusplus.core.entity',
		'plusplus.core.animation',
		'devquest.weapons.weapon'
	)
	.defines(function () {

		var _c = ig.CONFIG,
			_w = 64,
			_h = 32,
			_ft = 0.05;

		devquest.weapons.EntityMouse0 = ig.EntityMouse0 = ig.global.EntityMouse0 = devquest.weapons.Weapon.extend({

			animSettings: {
				// down:  { sequence: [ 4,  4,  4,  4,  4,  4,  0,  1,  0,  1,  0,  1,  0,  3,  2,  3,  2,  3], frameTime: _ft },
				// left:  { sequence: [ 4,  4,  4,  4,  4,  4,  0,  1,  0,  1,  0,  1,  0,  3,  2,  3,  2,  3], frameTime: _ft },
				// right: { sequence: [ 4,  4,  4,  4,  4,  4,  0,  1,  0,  1,  0,  1,  0,  3,  2,  3,  2,  3], frameTime: _ft },
				// up:    { sequence: [ 4,  4,  4,  4,  4,  4,  0,  1,  0,  1,  0,  1,  0,  3,  2,  3,  2,  3], frameTime: _ft }
                down:  { sequence: [ 4,  4,  4,  4,  0,  1,  3,  2], frameTime: _ft },
                left:  { sequence: [ 4,  4,  4,  4,  0,  1,  3,  2], frameTime: _ft },
                right: { sequence: [ 4,  4,  4,  4,  0,  1,  3,  2], frameTime: _ft },
                up:    { sequence: [ 4,  4,  4,  4,  0,  1,  3,  2], frameTime: _ft }
			},

			animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'whip.png', _w, _h),

			friendlyName: 'Three Buttons of Stun',
			flavorText: 'Nothing catches you off guard more than being smacked with the business end of a mouse.',
			description: 'light damage, chance to stun',

			damage: 1,

			sizeUnrotated: {x: _w, y: _h},
			size: {x: _w, y: _h},

			canFlipX: true,
			canFlipY: true

		});

	});