var devquest = devquest || {};
devquest.weapons = devquest.weapons || {};

ig.module(
		'devquest.weapons.mouse1'
	)
	.requires(
		'plusplus.core.config',
		'plusplus.core.entity',
		'plusplus.core.animation',
		'devquest.weapons.weapon'
	)
	.defines(function () {

		var _c = ig.CONFIG,
			_w = 16,
			_h = 40,
			_ft = 0.05;

		devquest.weapons.EntityMouse1 = ig.EntityMouse1 = ig.global.EntityMouse1 = devquest.weapons.Weapon.extend({

			animSettings: {
				down:  { sequence: [  0,  1,  2,  3,  2,  1,  0], frameTime: _ft },
				left:  { sequence: [  4,  5,  6,  7,  6,  5,  4], frameTime: _ft },
				right: { sequence: [  8,  9, 10, 11, 10,  9,  8], frameTime: _ft },
				up:    { sequence: [ 12, 13, 14, 15, 14, 13, 12], frameTime: _ft }
			},

			animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'mouse1.png', _h, _h),

			friendlyName: 'Of Mice and Pin',
			flavorText: "I don't mean to pin you down, but let me tell you a story.",
			description: 'moderate damage, chance to cause sleep', 

			damage: 4,

			sizeUnrotated: {x: _w, y: _h},
			size: {x: _w, y: _h}

		});

	});