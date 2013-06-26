ig.module('game.entities.projectile'
	)
  .requires('impact.entity'
  	)
  .defines( function(){
	EntityProjectile = ig.Entity.extend({
		size: {x:8,y:4},
		vel:  {x:100,y:0},
		bounciness:1,
		lifetime: 0,
		// how to behave when active collision occurs
		collides: ig.Entity.COLLIDES.NONE,
		type: ig.Entity.TYPE.A,
		checkAgainst: ig.Entity.TYPE.B,
	    
		// where to find the animation sheet
		//animSheet: new ig.AnimationSheet('media/projectile.png',8,4),	
		direction: 'right',
		animSheetX: new ig.AnimationSheet('media/projectile_x.png',8,4),
		animSheetY: new ig.AnimationSheet('media/projectile_y.png',4,8),
	
		// init function
		init: function(x, y , settings){
	   
			this.parent(x,y,settings);
			this.anims.xaxis = new ig.Animation(this.animSheetX,1,[0]);             
			this.anims.yaxis = new ig.Animation(this.animSheetY,1,[0]);         
			this.currentAnim = this.anims.xaxis;        
			//this.addAnim('idle',1,[0]);
			// get the position from the player to start from
			var player = ig.game.getEntitiesByType( EntityPlayer )[0];
			// go in the same direction if the player moves else go in the standar direction
			//if(!(player.vel.x == 0 && player.vel.y == 0)){this.vel.x = player.vel.x;this.vel.y = player.vel.y;}
			if(this.direction =='right'){
				this.vel.x = 110;
			    this.vel.y = 0;
			    this.currentAnim = this.anims.xaxis;
			    this.anims.xaxis.flip.x = false;
			}
			else if (this.direction == 'left'){
			    this.vel.x = -110;
			    this.vel.y = 0;
			    this.currentAnim = this.anims.xaxis;
			    this.anims.xaxis.flip.x = true;
			}
			else if (this.direction == 'up'){
			    this.vel.x = 0;
			    this.vel.y = -110;
			    this.currentAnim = this.anims.yaxis;
			    this.anims.yaxis.flip.y = false;
			}
			else if (this.direction == 'down'){
			    this.vel.x = 0;
			    this.vel.y = 110;
			    this.currentAnim = this.anims.yaxis;
			    this.anims.yaxis.flip.y = true;
			}
				
		},
		update:function(){
	
			if (this.startvelocity == -(this.vel.x) && this.direction == 'right'){this.anims.xaxis.flip.x = true;}
			else if (this.startvelocity == -(this.vel.x) && this.direction == 'left'){this.anims.xaxis.flip.x = false;}
			else if (this.startvelocity == -(this.vel.y) && this.direction == 'up'){this.anims.yaxis.flip.y = true;}
			else if (this.startvelocity == -(this.vel.y) && this.direction == 'down'){this.anims.yaxis.flip.y = false;} 		
			// a lifetime of 100 fps else kill
			if(this.lifetime <=100){this.lifetime +=1;}else{this.kill();}	
			this.parent();	
		},
		check: function(other){
			other.receiveDamage(100,this);
			this.kill();
			this.parent();
		}

	})
});