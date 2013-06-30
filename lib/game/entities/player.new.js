ig.module(
	'game.entities.player'
)
.requires(
	'plusplus.abstractities.player',
	'plusplus.abilities.glow',
	'plusplus.core.config',
	'plusplus.helpers.utils'
) 
.defines(function() {
	"use strict";

	var _c = ig.CONFIG;
	var _ut = ig.utils;

	ig.EntityPlayer = ig.global.EntityPlayer = ig.Player.extend({
		size: {x:32, y:32},
		offset: {x:6, y:4},
		vel: {x:0, y:0},
		gravityFactor: 0,
		animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'player.png', 32, 32),
		animSettings: {			
			down: {
				frameTime: 0.2,		
				sequence: [0,1,2,1]		
			},
			left: {
				frameTime: 0.2,
				sequence: [3,4,5,4]
			},
			right: {
				frameTime: 0.2,
				sequence: [6,7,8,7]
			},
			up: {
				frameTime: 0.2,
				sequence: [9,10,11,10]				
			}
		},
		glowSettings: {
			light: {
				performance: _c.DYNAMIC,
				castsShadows: true
			}
		},
		initProperties: function() {
			this.parent();
			this.glow = new ig.AbilityGlow(this);
			this.abilities.addDescendants([this.glow]);
		}
	});
});