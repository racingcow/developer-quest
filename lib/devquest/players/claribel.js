var devquest = devquest || {};
devquest.players = devquest.players || {};

ig.module(
	'devquest.players.claribel'
)
.requires(
		'impact.entity',
		'plusplus.abstractities.player',
		'plusplus.core.config',
		'devquest.abilities.whip',
		'devquest.players.player'
)
.defines(function() {

	"use strict";

	var _c = ig.CONFIG;

	devquest.players.EntityClaribel = ig.EntityClaribel = ig.global.EntityClaribel = devquest.players.EntityPlayer.extend({
		name: 'Claribel',

		animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'claribel.png', 32, 32),

		initProperties: function() {
			this.parent();

			this.weaponAbility = new devquest.abilities.AbilityWhip(this);
			this.abilities.addDescendant(this.weaponAbility);

		}

	})
});