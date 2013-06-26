ig.module('game.entities.SoundTile')
  .requires('impact.entity','impact.sound')
  .defines(function(){
  	      EntitySoundTile = ig.Entity.extend({
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
                                          //the sound to use
                                          this.TileSound = new ig.Sound('media/music/soundtile.*'); 
                                          //this.TileSound_status = false;
                                          this.TileSound.volume = 1;
			    },
			    check: function(other){
                                          //play the sound
                                          this.TileSound.play();
			    }

  	      })
});