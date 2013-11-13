//base class for weapon abilities
var devquest = devquest || {};
devquest.abilities = devquest.abilities || {};

ig.module(
		'devquest.abilities.weapon'
	)
	.requires(
		'plusplus.abilities.ability',
		'plusplus.helpers.utilsvector2'
	)
	.defines(function () {
		"use strict";

		var _utv = ig.utilsvector2;

		devquest.abilities.AbilityWeapon = ig.Ability.extend({

			friendlyName: '',
			weaponType: '', //Type of weapon entity to spawn
			weapon: null,   //Reference to weapon entity controlled by this ability
			entityOptions: {
				weaponSettings: { }
			},

			//Creates weapon and handles application of settings
			activate: function (settings) {

				settings = settings || {};

				var entityOptions = this.entityOptions || this.entity;

				// add entity group to weapon settings so we don't hit own group with weapon
				var weaponSettings = {
					group: this.entity.group
				};

				// merge settings
				if (entityOptions.weaponSettings) {
					ig.merge(weaponSettings, entityOptions.weaponSettings);
				}
				if (settings.weaponSettings) {
					ig.merge(weaponSettings, settings.weaponSettings);
				}
				if (!this.weapon) {
					this.weapon = ig.game.spawnEntity(this.weaponType, 0, 0, weaponSettings);
				}

				//weapon should be placed according to direction controlling entity is facing
				var dir = this.entity.facing.vect, weapon = this.weapon;
				weapon.size = weapon.sizeDraw = this.getFacingSize();
				weapon.flip.y = dir.x < 0;
				weapon.angle = _utv.radianBetweenPoints(_utv.DIRECTION.RIGHT, {x: 0, y: 0}, dir);
				weapon.moveTo(this.entity, { 
					matchPerformance: true,
					offset: {
						x: dir.x * 48 + ((dir.y < 0) ? 3 : 0),
						y: dir.y * 48
					},
					once: true
				});
 
 				//play weapon animation
				weapon.animOverride(this.entity.facing.name, { 
					callback: this._onWeaponAnimCompleted,
					context: this
				});

				this.parent(); //have to call parent at end here according to impact++ docs

				return weapon;

			},

			getFacingSize: function() {
				var facing = this.entity.facing,
					vert = ((facing.name === 'down' || facing.name === 'up')),
					w = this.weapon.sizeUnrotated.x,
					h = this.weapon.sizeUnrotated.y,
					x = vert ? h : w,
					y = vert ? w : h;
				return { x: x, y: y };
			},

			//when upgrade data changes, push it into weaponSettings so that 
			//it is eventually merged onto the entity (weapon) controlled by this ability
			changegrade: function (rank) {
				this.parent(rank);
				ig.merge(this.entityOptions.weaponSettings, this.upgrades[ this.rank ]);
			},

			//destroy weapon entity after its animation is completed
			_onWeaponAnimCompleted: function() {
				this.weapon.kill();
				this.weapon = null;
			},

			update: function() {
				this.parent();

				//todo: remove this. just for testing purposes.
				if (ig.input.state('weapon1')) this.changegrade(0);
				if (ig.input.state('weapon2')) this.changegrade(1);
				if (ig.input.state('weapon3')) this.changegrade(2);
				if (ig.input.state('weapon4')) this.changegrade(3);
			},

			//override to include weapon
			clone: function (c) {

				if (c instanceof ig.AbiltityWeapon !== true) {

					c = new devquest.abilities.AbilityWeapon();

				}

				c.weaponType = this.weaponType;

				return this.parent(c);

			}
		});
	});