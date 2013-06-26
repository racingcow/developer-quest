ig.module('game.entities.player')
.requires(
		'impact.entity',
		'impact.font',
		'impact.sound'
	 )

.defines( function(){
	EntityPlayer = ig.Entity.extend({
		size: {x:32,y:32},		/* size is 20 by 40*/
		offset:{x:6,y:4},		/* collision box is a little bit bigger */
		vel:   {x:0,y:0}, 		/* you start without a velocity */
		maxVel:{x:200,y:200},   /* you can never go faster than this */
		health: 400,			/* the health is 400 */
		zIndex:999,				// you are shown on top in case of collision
		name: 'player',			// let's call him player
	
		// how to behave when active collision occurs
		collides: ig.Entity.COLLIDES.PASSIVE,
		type: ig.Entity.TYPE.A,
		checkAgainst: ig.Entity.TYPE.B,
		// where to find the animation sheet
		//animSheet: new ig.AnimationSheet('media/player.png',32,48),	
		animSheet: new ig.AnimationSheet('media/player.png',32,32),	
		
		init: function(x, y , settings){
			this.parent(x,y,settings);	// defaults
			var block = false;			// you ar not blocking by default 
			
			//set up the sound
			this.walksound = new ig.Sound('media/music/snowwalk.ogg');
			this.walksound_status = false;
			this.walksound.volume = 1;
			//animate the figures
			this.addAnim('idle',1,[0]);
			this.addAnim('down',0.1,[0,1,2,1]);
			this.addAnim('left',0.1,[3,4,5,4]);
			this.addAnim('right',0.1,[6,7,8,7]);
			this.addAnim('up',0.1,[9,10,11,10]);
			
			this.weapon = 'projectile'; 		//you start with a sword
		},
	
		update: function(){
			this.parent();	//use the defaults
	
			//player movement
			if(ig.input.state('up') || ig.input.pressed('tbUp')){
				this.vel.y = -100;
				this.currentAnim = this.anims.up;
				this.lastPressed = 'up';
	
			}
			else if(ig.input.state('down') || ig.input.pressed('tbDown')){
				this.vel.y =  100;
				this.currentAnim = this.anims.down;
				this.lastPressed = 'down';
			}
			else if(ig.input.state('left') || ig.input.pressed('tbLeft')){
				this.vel.x = -100;
				this.currentAnim = this.anims.left;
				this.lastPressed = 'left';
			}
			else if(ig.input.state('right')||ig.input.pressed('tbRight')){
				this.vel.x = 100;
				this.currentAnim = this.anims.right;
				this.lastPressed = 'right';
			}
			//if it is not a mobile, return your velocity to zero
			else if(!ig.ua.mobile){
				this.vel.y = 0; 
				this.vel.x = 0;
				this.currentAnim  = this.anims.idle;
			}
	
			//is the player blocking the attack?
			if(ig.input.state('block')) {this.block = true} else {this.block = false;}
			//change the weapens
			if(ig.input.pressed('changeWeapon')){
				if(this.weapon == 'sword'){
					this.weapon = 'projectile';
				}else{
					this.weapon = 'sword';
				}
			 if(ig.ua.mobile){this.vel.x = 0;this.vel.y=0;}
			}
			//attack
			if(ig.input.pressed('attack')) {
				if (this.weapon == 'projectile'){
				// create a projectile
				ig.game.spawnEntity('EntityProjectile',this.pos.x,this.pos.y,{direction:this.lastPressed});
				}else{
				// we simulate a sword with a very fast moving projectile with a limited range
				ig.game.spawnEntity('EntitySword',this.pos.x,this.pos.y,null);
				}
				ig.game.sortEntitiesDeferred();
			}	
			//if there is movement make the walking sounds;
			if(this.vel.x == 0 && this.vel.y == 0){
				this.walksound.stop();
				this.walksound_status = false;
			}
			else if(this.walksound_status == false){
				//terug aanzetten bij productie
				///this.walksound.play();
				this.walksound_status = true;
			}

		},
		//override because this makes it easy to do respawn
		receiveDamage:function (a,object){
			if(!this.block){
			if(this.health - a > 0){
				this.health = this.health -a;
			}else{
				ig.game.respawn();
				}
			}
		},
		//very simple yet easy attacking and defense logic 
		check: function(other){
			// kill the player when he touches the enemy
			// and is attacking
			if(ig.input.pressed('attack')){
				// on attack is not always effective
					number = Math.random();
					if(number < .05){
						other.receiveDamage(5,this);
					}
			}
			this.parent();
		}
	})	
});