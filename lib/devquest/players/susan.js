var devquest = devquest || {};
devquest.players = devquest.players || {};

ig.module(
	'devquest.players.susan'
)
.requires(
		'impact.entity',
		'plusplus.abstractities.player',
		'plusplus.core.config',
		'devquest.players.player'
)
.defines(function() {

	"use strict";

	var _c = ig.CONFIG;

	devquest.players.EntitySusan = ig.EntitySusan = ig.global.EntitySusan = devquest.players.EntityPlayer.extend({
		name: 'Susan',

		animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'susan.png', 32, 32),

		initProperties: function() {
			this.parent();
		}
	})
});