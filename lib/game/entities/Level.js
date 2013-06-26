ig.module('game.entities.Level')
  .requires('impact.entity')
  .defines(function(){
  	      EntityLevel = ig.Entity.extend({
  			    // how to behave when active collision occurs
			    collides: ig.Entity.COLLIDES.NEVER,
                            type: ig.Entity.TYPE.B,
                            checkAgainst: ig.Entity.TYPE.A,
                            // where to find the animation sheet
			    animSheet: new ig.AnimationSheet('media/animatedtile.png',32,32),	
			    // init function
			    init: function(x, y , settings){
                                          this.parent(x,y,settings);
                                          this.addAnim('idle',0.2,[0,1,2,3]);
			    },
			    check: function(other){
                                          //go to the next level		
                                          //ig.game.loadSecondLevel();
                                          ig.game.loadMyLevel(LevelMain);
			    }

  	      })
});