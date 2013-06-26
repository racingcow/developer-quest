ig.module('game.entities.pickUpProjectile'
	)
  .requires('impact.entity'
  	)
  .defines( function(){
	EntityPickUpProjectile = ig.Entity.extend({
		/* the defaults */
		size: {x:48,y:48}, /* size of 48 by 48 */
		// how to behave when active collision occurs
		collides: ig.Entity.COLLIDES.NONE,
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		// where to find the animation sheet
		animSheet: new ig.AnimationSheet('media/projectile.png',48,48),	
		// init function
		init: function(x, y , settings){
			this.parent(x,y,settings);	/* the defaults */
			this.addAnim('idle',1,[0]); /* show the projectile */
		},
		check: function(other){
					
			ig.game.addProjectile(); 	// give the player a coin when picked up
			this.kill(); 				//disappear if you are picked up
		}
	})
});