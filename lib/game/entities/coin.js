ig.module('game.entities.coin'
	)
  .requires('impact.entity'
  	)
  .defines( function(){
	EntityCoin = ig.Entity.extend({
	size: {x:16,y:16},	/* the size of a coin */
	// how to behave when active collision occurs
	collides: ig.Entity.COLLIDES.NEVER,
	type: ig.Entity.TYPE.B,
	checkAgainst: ig.Entity.TYPE.A,
	// where to find the animation sheet
	animSheet: new ig.AnimationSheet('media/COIN.png',16,16),	
		// init function
		init: function(x, y , settings){
			this.parent(x,y,settings);		/* the defaults */
			this.addAnim('idle',1,[0]);     /* show the coin */
		},
		check: function(other){			
			ig.game.addCoin(); 	// give the player a coin when picked up
			this.kill(); 		// disappear if you are picked up
		}
	})
});