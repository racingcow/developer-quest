var devquest = devquest || {};
devquest.players = devquest.players || {};

ig.module(
	'devquest.players.carl'
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

	devquest.players.EntityCarl = ig.EntityCarl = ig.global.EntityCarl = devquest.players.EntityPlayer.extend({
		name: 'Carl',

		animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'carl.png', 32, 32),

		initProperties: function() {
			this.parent();
		}
	})
});