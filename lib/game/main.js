ig.module( 
	'game.main'
)
.requires(
	
	//impact++ - https://github.com/collinhover/impactplusplus.git
	'plusplus.core.config',
	'plusplus.core.loader',
	'plusplus.core.game',

	//impact-bootstrap - https://github.com/gamecook/Impact-Bootstrap.git
	'plugins.impact-splash-loader.impact-splash-loader',

	//base impact dependencies
	'impact.font',

	//custom stuff
	'plugins.title-screen.title-screen',

	'game.entities.player',
	'game.levels.dev1'
)
.defines(function() {
	"use strict";

	var _c = ig.CONFIG;
	if (_c.DEBUG) {
		ig.module(
			'game.game-debug'
		)
		.requires(
			'plusplus.debug.debug'
		)
		.defines(function() {
			start();
		});
	} else {
		start();
	}

	function start() {
		ig.MainGame = ig.GameExtended.extend({
			shapesPasses: [{
				ignoreClimbable: true,
				discardBoundaryInner: true
			}],
			init: function() {
				this.parent();
				this.loadLevel(ig.global.LevelDev1);	
				ig.game.camera.addAtmosphere( 125 );						
			},
			inputStart: function() {
				this.parent();
			},
			inputEnd: function() {
				this.parent();
			}			
		});
		
		ig.main(
			'#canvas',
			ig.TitleScreen,
			_c.FPS,
			_c.GAME_WIDTH,
			_c.GAME_HEIGHT,
			_c.SCALE,
			ig.ImpactSplashLoader
			//ig.LoaderExtended
		);

		ig.system.resize(
			ig.global.innerWidth * _c.CANVAS_WIDTH_PCT * (1 / _c.SCALE),
			ig.global.innerWidth * _c.CANVAS_HEIGHT_PCT * (1 / _c.SCALE),
			_c.SCALE
		);
	}
});