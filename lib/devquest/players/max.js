var devquest = devquest || {};
devquest.players = devquest.players || {};

ig.module(
	'devquest.players.max'
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

	devquest.players.Max = ig.EntityMax = ig.global.EntityMax = devquest.players.EntityPlayer.extend({
		name: 'Max',

		animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'max.png', 32, 32),

		initProperties: function() {
			this.parent();
		}
	})
});