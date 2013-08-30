var devquest = devquest || {};
devquest.players = devquest.players || {};

ig.module(
	'devquest.players.max'
)
.requires(
		'impact.entity',
		'impact.font',
		'impact.sound',
		'impact.input',
		'plusplus.abstractities.player',
		'plusplus.abstractities.projectile',
		'plusplus.abilities.glow',
		'plusplus.core.config',
		'plusplus.helpers.utils',
		'devquest.utils.vect',
		'devquest.abilities.weapon',
		'devquest.players.player',
		'devquest.entities.mouse1'
)
.defines(function() {

	"use strict";

	var _c = ig.CONFIG;

	devquest.players.Max = ig.EntityMax = ig.global.EntityMax = devquest.players.EntityPlayer.extend({
		name: 'Max',

		animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'max.png', 32, 32),

		initProperties: function() {
			this.parent();

			this.weaponAbility = new devquest.abilities.AbilityWeapon(this);
			this.weaponAbility.weaponType = ig.EntityMouse1;
			this.abilities.addDescendant(this.weaponAbility);

		}
	})
});