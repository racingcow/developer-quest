var devquest = devquest || {};
devquest.abilities = devquest.abilities || {};

ig.module(
		'devquest.abilities.whip'
	)
	.requires(
		'plusplus.core.input',
		'plusplus.abilities.ability',
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

			init: function() {
				this.parent();
			},

			activateCore: function (settings) {

				this.parent(settings);

				//set size based on current  facing
				var facing = this.entity.facing,
					vert = ((facing.name === 'down' || facing.name === 'up')),
					w = this.weapon.sizeUnrotated.x,
					h = this.weapon.sizeUnrotated.y,
					x = vert ? w : h,
					y = vert ? h : w;
				this.weapon.size = { x: x, y: y };

				//set offset based on current facing
				var eX = this.weapon.animSheet.width,
					eY = this.weapon.animSheet.height,
					eW = vert ? eX : eY,
					eL = vert ? eY : eX,
					osX = Math.ceil((eW - x) / 2),
					osY = Math.ceil((eL - y) / 2);
				this.weapon.offset = { x: osX, y: osY };
			},

			//override to include weapon
			clone: function (c) {

				if (c instanceof ig.AbilityWhip !== true) {
					c = new devquest.abilities.AbilityWhip();
				}

				return this.parent(c);

			}
		});
	});