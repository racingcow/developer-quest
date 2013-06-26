ig.module('game.entities.enemy')
  .requires('impact.entity','plugins.ai.ai')
  .defines(function(){
  		EntityEnemy = ig.Entity.extend({
			// how to behave when active collision occurs
			collides: ig.Entity.COLLIDES.PASSIVE,
			type: ig.Entity.TYPE.B,
			checkAgainst: ig.Entity.TYPE.A,
			//the defaults
			size: {x:16,y:40}, /* the default size */
			offset:{x:8,y:4},  /* the collision box is a little bigger */
			name: 'enemy',     /* the class is called enemy */
			health:    200,	   /* they have a default health of 200 */
			zIndex:1,		   /* and are shown below the player if they occupy the same space */
			speed:50,		   /* they move at a speed of 50, half the speed of the player */

			// where to find the animation sheet
			animSheet: new ig.AnimationSheet('media/enemy.png',32,48),	
	
			init: function(x, y , settings){
				/* use our basic artificial intelligence engine */
				ai = new ig.ai(this);
				/* define the possible animations */
				this.addAnim('idle',1,[0]);
				this.addAnim('down',0.1,[0,1,2,3,2,1,0]);
				this.addAnim('left',0.1,[4,5,6,7,6,5,4]);
				this.addAnim('right',0.1,[8,9,10,11,10,9,8]);
				this.addAnim('up',0.1,[12,13,14,15,14,13,12]);
			
				this.parent(x,y,settings);  /* the defaults */
			},
			update: function(){	
				/* let the artificial intelligence engine tell us what to do */
				var action = ai.getAction(this);
				/* listen to the commands with an appropriate animation and velocity */
				switch(action){
					case ig.ai.ACTION.Rest: 
							this.currentAnim =  this.anims.idle;
							this.vel.x = 0;
							this.vel.y = 0;	
							break;
					case ig.ai.ACTION.MoveLeft	: 
							this.currentAnim = this.anims.left;
							this.vel.x = -this.speed;	
							break;
					case ig.ai.ACTION.MoveRight : 
							this.currentAnim = this.anims.right;
							this.vel.x = this.speed;			
							break;
					case ig.ai.ACTION.MoveUp	: 
							this.currentAnim = this.anims.up;
							this.vel.y = -this.speed;			
							break;
					case ig.ai.ACTION.MoveDown	: 
							this.currentAnim = this.anims.down;
							this.vel.y = this.speed;	  	
							break;
					case ig.ai.ACTION.Attack:
							this.currentAnim = this.anims.idle;
							this.vel.x = 0;
							this.vel.y = 0;
							ig.game.getEntitiesByType('EntityPlayer')[0].receiveDamage(2,this);
							break;
					default	: 
							this.currentAnim =  this.anims.idle;
							this.vel.x = 0;
							this.vel.y = 0;	
							break;
				}
				/* use the defaults */
				this.parent();
			},
			// do the attack if there is a collision
			check: function(other){
				other.receiveDamage(2,this);
				this.parent();
			}  
		})
	});