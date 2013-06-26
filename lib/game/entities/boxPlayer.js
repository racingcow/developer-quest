ig.module(
	'game.entities.boxPlayer'
)
.requires(
	//'impact.entity',
	'plugins.box2d.entity'
)
.defines(function(){
	EntityBoxPlayer = ig.Box2DEntity.extend({
		/* defaults */
		size:  {x:32,y:48},	/* the size of the player */
		/* collision is handled by box2D */
		checkAgainst: ig.Entity.TYPE.NONE,
		collides: ig.Entity.COLLIDES.NEVER,   	
		// where to find the animation sheet
		animSheet: new ig.AnimationSheet('media/player.png',32,48),	
		//the init function
		init: function(x,y,settings){
			this.parent(x,y,settings);		/* use defaults */
			this.addAnim('idle',1,[0]);     /* we wan't it to look as if he slides so only 1 animation */
			this.restitution = 0;		    /* the box2D equivalent of bounciness, number between 0 and 1, 0 means no bounciness, 1 very bouncy */
			//this.body.WakeUp();				/* simulate it, if a body is asleep it will take less resources */
		},
		update: function(){
			//why don't you try to animate this further :D
			this.body.ApplyForce(new b2.Vec2(0,0),this.body.GetPosition());
			// movement dominated by vectors
			if(ig.input.state('up')){
				this.body.ApplyForce( new b2.Vec2(0,-200), this.body.GetPosition() );
			}
			if(ig.input.state('down')){
				this.body.ApplyForce( new b2.Vec2(0,200), this.body.GetPosition() );
			}
			if(ig.input.state('left')){
				this.body.ApplyForce( new b2.Vec2(-200,0), this.body.GetPosition() );
			}
			if(ig.input.state('right')){
				this.body.ApplyForce( new b2.Vec2(200,0), this.body.GetPosition() );
				
			}
			// take care that the body doesn't start to rotate, so fix the angle
			this.body.SetXForm(this.body.GetPosition(), 0);
			this.parent();
		}
	})
});
