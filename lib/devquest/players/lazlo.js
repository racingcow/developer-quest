var devquest = devquest || {};
devquest.players = devquest.players || {};

ig.module(
	'devquest.players.lazlo'
)
.requires(
		'impact.entity',
		'plusplus.abstractities.player',
		'plusplus.core.config',
		'devquest.players.player',
		'devquest.abilities.weapon'
)
.defines(function() {

	"use strict";

	var _c = ig.CONFIG;

	devquest.players.EntityLazlo = ig.EntityLazlo = ig.global.EntityLazlo = devquest.players.EntityPlayer.extend({
		name: 'Lazlo',

		animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'lazlo.png', 32, 32),

		initProperties: function() {
			this.parent();
		}
	})
});