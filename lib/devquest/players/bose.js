var devquest = devquest || {};
devquest.players = devquest.players || {};

ig.module(
	'devquest.players.bose'
)
.requires(
		'impact.entity',
		'plusplus.abstractities.player',
		'plusplus.core.config',
		'devquest.abilities.weapon',
		'devquest.players.player',
		'devquest.entities.sword1'
)
.defines(function() {

	"use strict";

	var _c = ig.CONFIG;
	var _ut = ig.utils;

	devquest.players.EntityBose = ig.EntityBose = ig.global.EntityBose = devquest.players.EntityPlayer.extend({
		name: 'Bose',

		animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'bose.png', 32, 32),

		initProperties: function() {
			this.parent();

			this.weaponAbility = new devquest.abilities.AbilityWeapon(this);
			this.weaponAbility.weaponType = ig.EntitySword1;
			this.abilities.addDescendant(this.weaponAbility);

		}

	})
});