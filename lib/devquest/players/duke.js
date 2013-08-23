var devquest = devquest || {};
devquest.players = devquest.players || {};

ig.module(
	'devquest.players.duke'
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

	devquest.players.Duke = ig.EntityDuke = ig.global.EntityDuke = devquest.players.EntityPlayer.extend({
		name: 'Duke',

		animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'duke.png', 32, 32),

		initProperties: function() {
			this.parent();

			this.weaponAbility = new devquest.abilities.AbilityWeapon(this);
			this.weaponAbility.weaponType = ig.EntityMouse1;
			this.abilities.addDescendant(this.weaponAbility);

		}
	})
});