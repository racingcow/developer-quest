ig.module('game.entities.sword'
	)
  .requires('impact.entity'
  	)
  .defines( function(){
	EntitySword = ig.Entity.extend({
		size: {x:8,y:4},	//a small box
		vel:  {x:200,y:0},	//move very fast
		bounciness:0,		//don't bounce
		lifetime: 0,		//counter to limit the reach of a sword
		// how to behave when active collision occurs
		collides: ig.Entity.COLLIDES.NONE,
		type: ig.Entity.TYPE.A,
		checkAgainst: ig.Entity.TYPE.B,
		// init function
		init: function(x, y , settings){	
			// get the position from the player to start from
			var player = ig.game.getEntitiesByType( EntityPlayer )[0];
			// go in the same direction if the player moves else go in the standard direction
			if(!(player.vel.x == 0 && player.vel.y == 0)){this.vel.x = player.vel.x;this.vel.y = player.vel.y;}
			this.parent(x,y,settings);		//defaults
		},
		update:function(){	
			// a lifetime of 100 fps else kill
			if(this.lifetime <= 10){this.lifetime +=1;}else{this.kill();}	
			this.parent();					//defaults
		}, 
		check: function(other){
			other.receiveDamage(100,this);	// give damage when there is a hit
			this.kill();				    // but only give damage once
			this.parent();					// defaults
		}
	})
});