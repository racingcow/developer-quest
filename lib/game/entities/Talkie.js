ig.module('game.entities.Talkie')
  .requires('impact.entity')
  .defines(function(){
  	EntityTalkie = ig.Entity.extend({
  		size: {x:80,y:40},
  		offset:{x:-5,y:0},
		// how to behave when active collision occurs
		collides: ig.Entity.COLLIDES.PASSIVE,
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		name: 'Talkie',
		talked:0,
		Anim:'idle', 
		times:150,
		// where to find the animation sheet
		animSheet: new ig.AnimationSheet('media/Talkie.png',32,48),	
	
		init: function(x, y , settings){
			this.addAnim('idle',3,[0,1]);	
			this.addAnim('Talk',0.2,[0,1,2,1]);
			this.currentAnim = this.anims.idle;
			this.parent(x,y,settings);
		},
		update: function(){
			if(this.times >=0 && this.Anim == 'Talk'){
			  if(this.times == 150){this.currentAnim = this.anims.Talk;}
			  this.times = this.times -1;
			}
			if(this.times == 0){
			  this.currentAnim = this.anims.idle;
			  this.times = -1;
			}
			this.parent();
		},
		check: function(other){
			if(this.talked == 0){
				this.Anim = 'Talk';
				this.talked = 1;
				ig.game.spawnEntity('EntityTextBalloon',this.pos.x - 10,this.pos.y - 70,null);
				ig.game.sortEntitiesDeferred();
			}
		} 
	})
  });