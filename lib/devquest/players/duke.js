var devquest = devquest || {};
devquest.players = devquest.players || {};

ig.module(
	'devquest.players.duke'
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

	devquest.players.Duke = ig.EntityDuke = ig.global.EntityDuke = devquest.players.EntityPlayer.extend({
		name: 'Duke',

		animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'duke.png', 32, 32),

		initProperties: function() {
			this.parent();
		}
	})
});