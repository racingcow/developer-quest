ig.module('game.entities.healthPotion'
	)
  .requires('impact.entity'
  	)
  .defines( function(){
	EntityHealthPotion = ig.Entity.extend({
		/* defaults */
		size: {x:20,y:25}, /*default size*/
		// how to behave when active collision occurs
		collides: ig.Entity.COLLIDES.NONE,
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,	
		// where to find the animation sheet
		animSheet: new ig.AnimationSheet('media/healthpotion.png',20,25),	
		// init function
		init: function(x, y , settings){
			this.parent(x,y,settings);	/* the defaults */
			this.addAnim('idle',1,[0]);	/* show the healer */
		}
		,
		check: function(other){
			// if you drink a healthPotion get more health
			if(other.name == 'player'){		
				other.receiveDamage(-10,this);
				this.kill(); /* disappear */
			}
		}
	})
});