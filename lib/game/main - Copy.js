ig.module( 
	'game.main' 
)
.requires(

	/*for the normal game */
	'impact.game',
	'impact.font',
	'game.levels.dev1',
	'game.levels.inside',
	'game.levels.outside',
	'game.entities.healthPotion',
	'game.entities.player',
	'game.entities.enemy',
	'game.entities.Level',
	'game.entities.coin',
	'game.entities.pickUpProjectile',
	'game.entities.projectile',
	'game.entities.sword',
	'game.entities.SoundTile',
	'game.entities.textBalloon', 

	/* void levelchange entity */ 
	'game.entities.levelchange',
	'game.entities.trigger',
	'game.entities.void',
	
	 /* for the Box2D game */
	'plugins.box2d.game',

	'game.levels.box',
	'game.entities.boxPlayer',
	'game.entities.BoxCoin',

	//extensions
	'plugins.ai.ai'

	//debug
	/*'impact.debug.debug'*/ 

)
.defines(function(){

//we make an object that you can use to store information in
//so that we can pass it between game systems 
GameInfo = new function(){
	this.lives=3;
	this.level=	LevelDev1;
	this.currentLevel = LevelDev1;
	this.coin = 0;
	this.projectiles = 0;
}





OpenScreen = ig.Game.extend({
	StartImage : new ig.Image('media/StartScreen.png'),
	init:function(){
		if(ig.ua.mobile){
			ig.system.setGame(MyGame);
		}
		ig.input.bind(ig.KEY.SPACE,'LoadGame');
	},
	update:function(){
		if(ig.input.pressed('LoadGame')){
			ig.system.setGame(MyGame);
		}
	},
	draw: function(){
		this.parent();
		this.StartImage.draw(0,0);
	}
}),
GameEnd = ig.Game.extend({
	StartImage : new ig.Image('media/Winner.png'),
	init:function(){
		}
		,
		
	update:function(){
		if(ig.input.pressed('LoadGame')){
			ig.system.setGame(MyGame);
		}
	},
	draw: function(){
		this.parent();
		this.StartImage.draw(0,0);
	}
}),
	

MyGame = ig.Game.extend({
	/*myNoteManager : new ig.NotificationManager(),*/
	font  : new ig.Font('media/font.png'),
	
	init: function() {
	var font  = new ig.Font('media/font.png');
		//console.log('start game');
		//ig.log('ok');
		
		
		// Initialize your game here; bind keys etc.
		// move your character
		if(!ig.ua.mobile){
		ig.input.bind(ig.KEY.UP_ARROW, 'up');
		ig.input.bind(ig.KEY.DOWN_ARROW,'down');
		ig.input.bind(ig.KEY.LEFT_ARROW,'left');
		ig.input.bind(ig.KEY.RIGHT_ARROW,'right');
		// fight
		ig.input.bind(ig.KEY.SPACE,'attack');
		ig.input.bind(ig.KEY.CTRL,'block');
		ig.input.bind(ig.KEY.NUMPAD_0,'changeWeapon');
		// camera movement
		ig.input.bind(ig.KEY.NUMPAD_5,'camera_change');
		ig.input.bind(ig.KEY.NUMPAD_2,'camera_down');
		ig.input.bind(ig.KEY.NUMPAD_8,'camera_up');
		ig.input.bind(ig.KEY.NUMPAD_4,'camera_left');
		ig.input.bind(ig.KEY.NUMPAD_6,'camera_right');
		// togle music on
		ig.input.bind(ig.KEY.F5,'music_off');
		ig.input.bind(ig.KEY.F6, 'music_down');
		ig.input.bind(ig.KEY.F7,'music_louder');

		// mouse action so that you can explain the action pattern 
		ig.input.bind(ig.KEY.MOUSE1,'attack');
		ig.input.bind(ig.KEY.MOUSE2,'block');
		// mouse wheele does not work on every mouse, 
		// you can check the effect easily in the windows environment
		ig.input.bind(ig.KEY.W,'accelerate');
		ig.input.bind(ig.KEY.MWHEELE_DOWN,'slow_down');

		//key to go to the easter egg
		ig.input.bind(ig.KEY.F9,'easter');


		}

		//load the first level
		//this.loadLevel(LevelMain);
		//this.loadLevel(LevelLevel1);
		this.loadLevel(LevelDev1);
		this.camera = 'follow';

		//add a little piece of background sound
		//and yes god is a DJ!
		// a good online mp3 to ogg converter
		// http://audio.online-convert.com/convert-to-ogg

		//play no music on mobile devices
		if(ig.ua.mobile){
			// controls are different on a mobile device
			ig.input.bindTouch( '#buttonLeft', 'tbLeft' );
			ig.input.bindTouch( '#buttonRight', 'tbRight' );
			ig.input.bindTouch( '#buttonUp', 'tbUp' );
			ig.input.bindTouch( '#buttonDown', 'tbDown' );
			ig.input.bindTouch( '#buttonJump', 'changeWeapon' );
			ig.input.bindTouch( '#buttonShoot', 'attack' );
			//alert('control setup');
		} else {
			//initiate background music
			var play_music = true;
			var music = ig.music;
			music.add("media/music/backgroundMusic.ogg");
			music.volume = 0.0;
			music.play();		
		}
	},
	
	update: function() {
		// Update all entities and backgroundMaps
			
		// Add your own, additional update code here
	
		//some music controls
		if(!ig.ua.mobile){
		if (ig.input.pressed('music_down')){ig.music.volume -= 0.1;}
		if (ig.input.pressed('music_louder')){ig.music.volume += 0.1;}
		if (ig.input.pressed('music_off')){ig.music.stop();}
		}
		//a little easter egg should be in every game
		if (ig.input.pressed('easter')){ig.system.setGame(BouncyGame);}

		//camera logic
		// follow the player, keep him in the center of the screen
		// better to call them in the initialisation step for speed
		// get the postition of the player and add half the screensize to it else the camera will be centered in a corner
		// you can also move the camera around to explore the space

		var gameviewport = ig.game.screen;
		var gamecanvas = ig.system;
		var player = this.getEntitiesByType( EntityPlayer )[0];
	


		 if(ig.input.state('camera_right'))	{gameviewport.x  = gameviewport.x + 2;this.camara = 'move';}
		 if(ig.input.state('camera_left'))  {gameviewport.x  = gameviewport.x - 2;this.camera = 'move';}
		 if(ig.input.state('camera_up'))	{gameviewport.y  = gameviewport.y - 2;this.camera = 'move';}
		 if(ig.input.state('camera_down'))  {gameviewport.y  = gameviewport.y + 2;this.camera = 'move';}

		 if(ig.input.pressed('camera_change')){
		 	this.camera = 'follow';
		 	gameviewport.x = player.pos.x - gamecanvas.width  /2;
			gameviewport.y = player.pos.y - gamecanvas.height /2;

		 }

		  if(this.camera == 'follow'){
		  	gameviewport.x = player.pos.x - gamecanvas.width 	/2;
			gameviewport.y = player.pos.y - gamecanvas.height /2;}
		
		
		ig.game.sortEntitiesDeferred();
		this.parent();
		

	},
	
	//respawn function for the player
	respawn: function(){
		GameInfo.lives = GameInfo.lives -1;
		if (GameInfo.lives <= 0){ 
			ig.system.setGame(gameOver);}
		else{
			this.loadLevelDeferred(GameInfo.level);
		}
	},

	//override the draw function so that we can put general info at the top
	draw:function(){

		this.parent();

		//show the health and money of the user in the left upper corner
		var player = this.getEntitiesByType( EntityPlayer )[0];
		//this.myNoteManager.draw();
		
		this.font.draw('health:' + player.health,10,10); //the user health
		this.font.draw('money:'  + GameInfo.coin,10,20); //money
		this.font.draw('projectile:'  + GameInfo.projectiles,10,30); //number of projectiles

				
		
	},

    // just to show that you can write your own functions
    loadMyLevel: function(stage){
    	GameInfo.level = stage;
    	GameInfo.currentLevel = stage;
    	this.loadLevelDeferred(stage);    
    },

    addCoin: function(){
    	//pickup item
    	GameInfo.coin += 1; //add a coin to the money
    },

    addProjectile: function(){
    	//add one projectile when you find one
    	GameInfo.projectiles +=1;
    }

},
	// a very simple class to show a nice game over picture at the end
	// and to show the use of extra classes
	gameOver = ig.Game.extend({
		gameOverImage : new ig.Image('media/GameOver.png'),
		draw: function(){
		 this.parent();
		 this.gameOverImage.draw(0,0);
		}
}),
	
	//easter egg
	//simple game logic for drop2D
	//be sure to have a collision layer 
	//else you could get a issues
	BouncyGame = ig.Box2DGame.extend({
		gravity:3,
		init: function(){

			//load the first level
			this.loadLevel(LevelBox);

			//controling the main player
			ig.input.bind(ig.KEY.UP_ARROW,'up');
			ig.input.bind(ig.KEY.UP_DOWN,'down');
			ig.input.bind(ig.KEY.UP_RIGHT,'right');
			ig.input.bind(ig.KEY.UP_LEFT,'left');
			ig.input.bind(ig.KEY.F9,'easter');
		},

		update: function(){
			
		
		
			//follow the player in the center of the screen
			var player = this.getEntitiesByType( EntityBoxPlayer )[0];
			if( player ) {
			this.screen.x = player.pos.x - ig.system.width/2;
			this.screen.y = player.pos.y - ig.system.height/2;
			}

			//go back to the original game
			if(ig.input.pressed('easter')){
				ig.system.setGame(MyGame);
			}
				//update 
			this.parent();
		}
		,

    addCoin: function(){
    	//pickup item
    	GameInfo.coin += 1; //add a coin to the money
    }

		

	})
);

// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2

if( ig.ua.iPad ) {
	ig.Sound.enabled = false;
	ig.main('#canvas', MyGame, 60, 300, 300, 1);
}
else if( ig.ua.mobile ) {	
	ig.Sound.enabled = false;
	var width = 320;
	var height = 320;
	ig.main('#canvas', MyGame, 60, 160, 160, 1);
	
	var c = ig.$('#canvas');
	c.width = width;
	c.height = height;

	var pr = 2;
	if( pr != 1 ) {

		c.style.webkitTransformOrigin = 'left top';
		c.style.webkitTransform = 
		
			'scale3d(2,2, 0)' +
			'';
	}

	
}
else {
	ig.main('#canvas', OpenScreen, 60, 320, 320,2);
}



});
