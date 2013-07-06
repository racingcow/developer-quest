ig.module('game.entities.player')
.requires(
		'impact.entity',
		'impact.font',
		'impact.sound',
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
		
		size: {x:32,y:32},		/* size is 20 by 40*/
		offset:{x:0,y:0},		/* collision box is a little bit bigger */
		vel:   {x:0,y:0}, 		/* you start without a velocity */
		maxVel:{x:200,y:200},   /* you can never go faster than this */		
		zIndex:999,				// you are shown on top in case of collision
		name: 'player',			// let's call him player
	
		// how to behave when active collision occurs
		collides: ig.Entity.COLLIDES.PASSIVE,
		type: ig.Entity.TYPE.A,
		checkAgainst: ig.Entity.TYPE.B,
		animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'player.png', 32, 32),
		glowSettings: {
			light: {
				performance: _c.DYNAMIC,
				castsShadows: false,
				radius: 32
			}
		},
		initProperties: function() {
			this.parent();
			this.glow = new ig.AbilityGlow(this);
			this.abilities.addDescendants([this.glow]);
		},
		init: function(x, y , settings) {

			this.parent(x,y,settings);	// defaults

			ig.game.gravity = 0; //it's a top-down RPG, baby!		

			this.addAnim('idle',1,[0]);
			this.addAnim('down',0.1,[0,1,2,1]);
			this.addAnim('left',0.1,[3,4,5,4]);
			this.addAnim('right',0.1,[6,7,8,7]);
			this.addAnim('up',0.1,[9,10,11,10]);
		},
	
		update: function() {		
			
			this.parent();

			if(ig.input.state('up') || ig.input.pressed('w')){
				this.vel.y = -100;
				this.currentAnim = this.anims.up;
				this.lastPressed = 'up';	
			}
			else if(ig.input.state('down') || ig.input.pressed('s')){
				this.vel.y =  100;
				this.currentAnim = this.anims.down;
				this.lastPressed = 'down';
			}
			else if(ig.input.state('left') || ig.input.pressed('a')){
				this.vel.x = -100;
				this.currentAnim = this.anims.left;
				this.lastPressed = 'left';				
			}
			else if(ig.input.state('right') || ig.input.pressed('d')){
				this.vel.x = 100;
				this.currentAnim = this.anims.right;
				this.lastPressed = 'right';
			}	

			return true;		
		},
		updateCurrentAnim: function() {
			return this.moving;            
        },
        //Turn a bunch of stuff off in impact++ that don't make sense 
        //for top-down games. Maybe inherit from EntityExtended or something later.
		moveToUpdate: function() {},
		updateChanges: function() {},
		temporaryInvulnerability: function() {},
		updateAnimation: function() {}
	})	
});