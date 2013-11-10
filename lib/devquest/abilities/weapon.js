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

				this.activateCore(settings);

				//weapon should be placed according to direction controlling entity is facing

				//todo: can probably use direction info here to prevent all these ifs

				var facing = this.entity.facing,
					correctX = 0,
					correctY = 0;
				if (facing.name === 'down') {
					correctX = 0;
					correctY = 32;
				}
				if (facing.name === 'up') {
					correctX = 0;
					correctY = -32;
				}
				if (facing.name === 'left') {
					correctX = -48;
					correctY = 0;
				}
				if (facing.name === 'right') {
					correctX = 48;
					correctY = 0;
				}
				var offset = {x: correctX, y: correctY};
				this.weapon.currentAnim = this.weapon.anims[facing.name];
				this.weapon.moveTo(this.entity, { 
					matchPerformance: true,
					offset: offset,
					once: true
				});

				this.weapon.currentAnim.onCompleted.addOnce(this._onWeaponAnimCompleted, this);

				this.parent(); //have to call parent at end here according to impact++ docs
				this.weapon.angle = _utv.radianBetweenPoints(facing.vect, {x: 0, y: 0}, _utv.DIRECTION.RIGHT);

				// //rotate and flip based on current facing
				// this.weapon.angle = _utv.radianBetweenPoints(facing.vect, {x: 0, y: 0}, _utv.DIRECTION.RIGHT);
				// this.weapon.flip.x = facing.vect.x < 0;
				// this.weapon.flip.y = facing.vect.y < 0;

				return this.weapon;
				
			},

			//when upgrade data changes, push it into weaponSettings so that 
			//it is eventually merged onto the entity (weapon) controlled by this ability
			changegrade: function (rank) {
				this.parent(rank);
				ig.merge(this.entityOptions.weaponSettings, this.upgrades[ this.rank ]);
			},

			//allows child classes to modify the weapon after it is created, 
			//but before target is dropped by parent class
			activateCore: function() {
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