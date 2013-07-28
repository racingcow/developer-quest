var devquest = devquest || {};
devquest.entities = devquest.entities || {};

ig.module(
    'devquest.entities.player'
)
.requires(
		'impact.entity',
		'impact.font',
		'impact.sound',
		'plusplus.abstractities.player',
		'plusplus.abstractities.projectile',
		'plusplus.abilities.glow',
		'plusplus.core.config',
		'plusplus.helpers.utils',
        'devquest.utils.vect',
		'devquest.abilities.whip',
		'devquest.entities.mouse1'
)
.defines(function() {
	
	"use strict";

	var _c = ig.CONFIG;
	var _ut = ig.utils;

	devquest.entities.EntityPlayer = ig.EntityPlayer = ig.global.EntityPlayer = ig.Player.extend({
		
		size: {x:32,y:32},		/* size is 20 by 40*/
		offset:{x:0,y:0},		/* collision box is a little bit bigger */
		vel:   {x:0,y:0}, 		/* you start without a velocity */
		zIndex:999,				// you are shown on top in case of collision
		name: 'Player',	
        facing: devquest.utils.vect.DIRECTION.DOWN, //Updated to reflect the current direction the player is facing
	
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

			//this.glow = new ig.AbilityGlow(this);
			//this.abilities.addDescendants([this.glow]);
			
			this.whipAbility = new devquest.abilities.AbilityWhip(this);
			this.whipAbility.whipType = ig.EntityMouse1;
			this.whipAbility.offsetAccelX = 30;
			this.whipAbility.offsetAccelY = 30;
			this.whipAbility.offsetVelX = 100;
			this.whipAbility.offsetVelY = 100;						
			this.abilities.addDescendant(this.whipAbility);

		},
		init: function(x, y , settings) {

			this.parent(x,y,settings);	// defaults

			ig.game.gravity = 0; //it's a top-down RPG, baby!		

			this.addAnim('NONE',1,[0]);
			this.addAnim('DOWN',0.1,[0,1,2,1]);
			this.addAnim('LEFT',0.1,[3,4,5,4]);
			this.addAnim('RIGHT',0.1,[6,7,8,7]);
			this.addAnim('UP',0.1,[9,10,11,10]);
		},
	
		update: function() {		
			
			this.parent();

			if(ig.input.state('up') || ig.input.pressed('w')){
				this.vel.y = -_c.CHARACTER.MAX_VEL_GROUNDED_Y;
                this.facing = devquest.utils.vect.DIRECTION.UP;
			}
			else if(ig.input.state('down') || ig.input.pressed('s')){
				this.vel.y =  _c.CHARACTER.MAX_VEL_GROUNDED_Y;
				this.facing = devquest.utils.vect.DIRECTION.DOWN;
			}
			else {
				this.vel.y = 0;
			}
			
			if(ig.input.state('left') || ig.input.pressed('a')){
				this.vel.x = -_c.CHARACTER.MAX_VEL_GROUNDED_X;
				this.facing = devquest.utils.vect.DIRECTION.LEFT;		
			}
			else if(ig.input.state('right') || ig.input.pressed('d')){
				this.vel.x = _c.CHARACTER.MAX_VEL_GROUNDED_X;
				this.facing = devquest.utils.vect.DIRECTION.RIGHT;
			}
			else {
				this.vel.x = 0;
			}
            
            //set movement animation based on which direction
            this.currentAnim = this.anims[this.facing.name];
            
			if (ig.input.pressed('attack'))
			{				
				this.whipAbility.execute();
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