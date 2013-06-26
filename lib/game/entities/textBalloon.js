ig.module('game.entities.textBalloon'
	)
  .requires('impact.entity','impact.game'
  	)
  .defines( function(){
    // inner class used by textBalloon
    WordWrap = ig.Class.extend({
	text:"",
	maxWidth:100,
	cut: false,
    
	init:function (text, maxWidth, cut) {
	    this.text = text;
	    this.maxWidth = maxWidth;
	    this.cut = cut;    
	},
	wrap:function(){
	    var regex = '.{1,' +this.maxWidth+ '}(\\s|$)' + (this.cut ? '|.{' +this.maxWidth+ '}|.+$' : '|\\S+?(\\s|$)');
	    return this.text.match( RegExp(regex, 'g') ).join( '\n' );
	}
    }),

  		//the textBalloon class

  		EntityTextBalloon = ig.Entity.extend({
  		pos:{x:0,y:0},			// a default position
		size:{x:100,y:50},		// the default size
		lifeTime:200,			// show the balloon for 200 frames

		//media used by text balloon
		font : new ig.Font('media/font.png'),								// the font sheet
		animSheet: new ig.AnimationSheet('media/gui_dialog.png',100,50),	// the animation
		wrapper : null,	
																			// place holder
		init: function(x,y,settings){			
		this.zIndex = 1000;													// always show on top
		this.addAnim('idle',1,[0]);											// the default graphic
		this.currentAnim  = this.anims.idle;								
		this.parent(x,y,settings);											// defaults
		this.wrapper = new WordWrap('Epicness awaits you!',20);	//we only have one text so use it as a default
		
		},

		update:function(){
			this.lifeTime = this.lifeTime -1;								// counter for the lifetime
			if(this.lifeTime < 0){this.kill();}								// remove the balloon after 200 frames
			this.parent();													// defaults
		
		},
		draw:function(){
			this.parent();													// defaults
			var x = this.pos.x - ig.game.screen.x + 5;						// x coordinate draw position
        	var y = this.pos.y - ig.game.screen.y + 5;						// y coordinate draw position
			this.font.draw(this.wrapper.wrap(),x, y,ig.Font.ALIGN.LEFT);	// put it on the screen 
			
		}
	    });
  });