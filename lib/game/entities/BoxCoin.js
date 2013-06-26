ig.module('game.entities.BoxCoin'
	)
  .requires('impact.entity',
	    'plugins.box2d.entity'
  	)
  .defines( function(){

	EntityBoxCoin = ig.Box2DEntity.extend({
		size: {x:16,y:16},
		// how to behave when active collision occurs
		// box2D has its own way of handling collission
		collides: ig.Entity.COLLIDES.NEVER	,
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		// where to find the animation sheet
		animSheet: new ig.AnimationSheet('media/COIN.png',16,16),	
		// init function
		init: function(x, y , settings){
			this.addAnim('idle',1,[0]); //Make the coin appear
			this.restitution = 1;   	//Box2D alternative of bounciness, 0 equals no bounciness at all, 1 is maximum bounciness
			this.parent(x,y,settings);  //Let the defaults do their work
	
		},
		update: function(){
			this.body.SetXForm(this.body.GetPosition(), 0); //prevent the coin from spinning around
			//try outcommenting the collidePlayer function and see how bounciness works in Box2D
			this.collidePlayer();	//Custom collision function
			this.parent();			//Let the defaults do their work
		},
		collidePlayer:function(){
			// check if the squared euclidean distance < 1000 then consider it to be a collision
			// this is equal to saying that there is a circle with diameter 100 around the center of the coin
			// and as soon as the center of the player touches this, it is considered a collision.
			// a circle is an easier alternative than the square which we will see later
		    var player = ig.game.getEntitiesByType( EntityBoxPlayer )[0]; //get the BoxPlayer object
			if( player ) {
				distance = ((player.pos.x - this.pos.x)*(player.pos.x - this.pos.x)
							+ (player.pos.y - this.pos.y)*(player.pos.y - this.pos.y)
							);
				console.log(distance);
				if(distance < 2500)
	
				{
				//you earn a credit for finding the box2D world, don't you think?
				ig.game.addCoin();	
				// why don't you try to change this for instance let's give the player some extra health
				// don't forget to add the function into main.js then :D
				this.kill();	
				}	
			}
		}
	})
});