var devquest = devquest || {};
devquest.entities = devquest.entities || {};

ig.module(
	'devquest.entities.player'
)
.requires(
		'impact.entity',
		'impact.font',
		'impact.sound',
		'impact.input',
		'plusplus.abstractities.player',
		'plusplus.abstractities.projectile',
		'plusplus.abilities.glow',
		'plusplus.core.config',
		'plusplus.helpers.utils',
		'devquest.utils.vect',
		'devquest.abilities.weapon',
		'devquest.entities.mouse1'
)
.defines(function() {

	"use strict";

	var _c = ig.CONFIG,
		_ut = ig.utils,
		_dirs = devquest.utils.vect.DIRECTION,
		_firstDir = _dirs.NONE; //allows for a little bit of strafing

	devquest.entities.EntityPlayer = ig.EntityPlayer = ig.global.EntityPlayer = ig.Player.extend({

		size: {x:32,y:32},		/* size is 20 by 40*/
		offset:{x:0,y:0},		/* collision box is a little bit bigger */
		vel:   {x:0,y:0}, 		/* you start without a velocity */
		zIndex:999,				// you are shown on top in case of collision
		name: 'Player',	
		facing: _dirs.DOWN, //Updated to reflect the current direction the player is facing

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
		damageSettings: {
			spawnSettings: {
				animTileOffset: ig.EntityParticleColor.colorOffsets.RED
			}
		},
		deathSettings: {
			spawnSettings: {
				animTileOffset: ig.EntityParticleColor.colorOffsets.RED
			}
		},

		animSettings: {
			left: {
				frameTime: 0.1,
				sequence: [3,4,5,4]
			},
			right: {
				frameTime: 0.1,
				sequence: [6,7,8,7]
			},
			up: {
				frameTime: 0.1,
				sequence: [9,10,11,10]
			},
			down: {
				frameTime: 0.1,
				sequence: [0,1,2,1]
			}
		},

		initProperties: function() {
			this.parent();

			//this.glow = new ig.AbilityGlow(this);
			//this.abilities.addDescendants([this.glow]);
			
			this.weaponAbility = new devquest.abilities.AbilityWeapon(this);
			this.weaponAbility.weaponType = ig.EntityMouse1;
			this.abilities.addDescendant(this.weaponAbility);

		},

		update: function() {

			this.parent();

			//Point the player in the right direction based on which direction he was 
			//previously facing, and which direction he is headed now. This allows for 
			//some pseudo-strafing.
			var velX = _c.CHARACTER.MAX_VEL_GROUNDED_X,
				velY = _c.CHARACTER.MAX_VEL_GROUNDED_Y;
			if(ig.input.state('up')){
				this.vel.y = -velY;
				this.facing = _firstDir === _dirs.LEFT || _firstDir === _dirs.RIGHT ? _firstDir : _dirs.UP;
				if (_firstDir === _dirs.NONE) _firstDir = _dirs.UP;
			}
			else if(ig.input.state('down')){
				this.vel.y =  velY;
				this.facing = _firstDir === _dirs.LEFT || _firstDir === _dirs.RIGHT ? _firstDir : _dirs.DOWN;
				if (_firstDir === _dirs.NONE) _firstDir = _dirs.DOWN;
			}
			else {
				this.vel.y = 0;
				_firstDir = _dirs.NONE;
			}
			if(ig.input.state('left')){
				this.vel.x = -velX;
				this.facing = _firstDir === _dirs.UP || _firstDir === _dirs.DOWN ? _firstDir : _dirs.LEFT;
				if (_firstDir === _dirs.NONE) _firstDir = _dirs.LEFT;
			}
			else if(ig.input.state('right')){
				this.vel.x = velX;
				this.facing = _firstDir === _dirs.UP || _firstDir === _dirs.DOWN ? _firstDir : _dirs.RIGHT;
				if (_firstDir === _dirs.NONE) _firstDir = _dirs.RIGHT;
			}
			else {
				this.vel.x = 0;
				_firstDir = _dirs.NONE;
			}

			if (!this.vel.x && !this.vel.y) {
				//stopped. just use previous direction
				this.currentAnim.gotoFrame(1);
				_firstDir = _dirs.NONE;
			}
			else 
			{
				//set movement animation based on which direction
				this.currentAnim = this.anims[this.facing.name];
			}

			//use whichever weapon is currently equipped
			if (ig.input.pressed('attack'))
			{
				console.log('Player: attack');
				this.weaponAbility.execute();
			}

			return true;

		},
		updateCurrentAnim: function() {
			return this.moving;
		}
	})
});