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

		//animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'claribel.png', 32, 32),
		animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'claribel2.png', 32, 32),

		animSettings: {
			idle: {
				frameTime: 1,
				sequence: [1]
			},
			down: {
				frameTime: 0.12,
				sequence: [0,1,2,1]
			},
			left: {
				frameTime: 0.12,
				sequence: [7,8,9,8]
			},
			right: {
				frameTime: 0.12,
				sequence: [14,15,16,15]
			},
			up: {
				frameTime: 0.12,
				sequence: [21,22,23,22]
			},
			attackLeft: {
				frameTime: 0.15,
				sequence: [10,11,12,12,12,13]
			},
			attackRight: {
				frameTime: 0.15,
				sequence: [17,18,19,19,19,20]
			}
		},

		initProperties: function() {
			this.parent();

			this.weaponAbility = new devquest.abilities.AbilityWhip(this);
			this.abilities.addDescendant(this.weaponAbility);

		}

	})
});