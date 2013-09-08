var devquest = devquest || {};
devquest.players = devquest.players || {};

ig.module(
	'devquest.players.vernon'
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

	devquest.players.Vernon = ig.EntityVernon = ig.global.EntityVernon = devquest.players.EntityPlayer.extend({
		name: 'Vernon',

		animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'vernon.png', 32, 32),

		initProperties: function() {
			this.parent();
		}
	})
});