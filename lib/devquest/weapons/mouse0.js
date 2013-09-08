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
			_w = 8,
			_h = 32,
			_ft = 0.05;

		devquest.weapons.EntityMouse0 = ig.EntityMouse0 = ig.global.EntityMouse0 = devquest.weapons.Weapon.extend({

			animSettings: {
				down:  { sequence: [ 0,  1,  2,  1,  0], frameTime: _ft },
				left:  { sequence: [ 3,  4,  5,  4,  3], frameTime: _ft },
				right: { sequence: [ 6,  7,  8,  7,  6], frameTime: _ft },
				up:    { sequence: [ 9, 10, 11, 10,  9], frameTime: _ft }
			},

			animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'mouse0.png', _h, _h),

			friendlyName: 'Three Buttons of Stun',
			flavorText: 'Nothing catches you off guard more than being smacked with the business end of a mouse.',
			description: 'light damage, chance to stun',

			damage: 1,

			sizeUnrotated: {x: _w, y: _h},
			size: {x: _w, y: _h}

		});

	});