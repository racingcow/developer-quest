var devquest = devquest || {};
devquest.abilities = devquest.abilities || {};

ig.module(
		'devquest.abilities.whip'
	)
	.requires(
		'plusplus.core.input',
		'plusplus.abilities.ability',
		'plusplus.helpers.utilsvector2',
		'devquest.weapons.mouse0',
		'devquest.weapons.mouse1'
	)
	.defines(function () {
		"use strict";

		var _c = ig.CONFIG,
			_utv = ig.utilsvector2;

		devquest.abilities.AbilityWhip = devquest.abilities.AbilityWeapon.extend({

			weaponType: ig.EntityMouse0,
			upgrades: [
				{ weaponType: ig.EntityMouse0 },
				{ weaponType: ig.EntityMouse1 },
			],

			//override to include weapon
			clone: function (c) {

				if (c instanceof ig.AbilityWhip !== true) {
					c = new devquest.abilities.AbilityWhip();
				}

				return this.parent(c);

			}
		});
	});