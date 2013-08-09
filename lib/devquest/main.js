ig.module( 
	'devquest.main'
)
.requires(

	//impact++ - https://github.com/collinhover/impactplusplus.git
	'plusplus.core.plusplus',
	'plusplus.core.config',
	'plusplus.core.loader',
	'plusplus.core.game',
	'plusplus.helpers.utils',

	//impact-bootstrap - https://github.com/gamecook/Impact-Bootstrap.git
	'plugins.impact-splash-loader.impact-splash-loader',

	//base impact dependencies
	'impact.font',

	//custom stuff
	'plugins.title-screen.title-screen',

	'devquest.entities.player',
	'devquest.levels.dev1'
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
				this.loadLevelDeferred(ig.global.LevelDev1);
				//ig.game.camera.addAtmosphere( 125 );
			},			
			inputStart: function() {
				this.parent();
				ig.input.bind(ig.KEY.SPACE, 'attack');
			},
			inputEnd: function() {
				this.parent();
			}			
		});
		
		ig.main(
			'#canvas',
			ig.TitleScreen,
			//ig.MainGame,
			_c.FPS,
			_c.GAME_WIDTH,
			_c.GAME_HEIGHT,
			_c.SCALE,
			ig.ImpactSplashLoader
			//ig.LoaderExtended
		);

		ig.system.resize(
			ig.global.innerWidth * _c.CANVAS_WIDTH_PCT * (1 / _c.SCALE),
			ig.global.innerHeight * _c.CANVAS_HEIGHT_PCT * (1 / _c.SCALE),
			_c.SCALE
		);
	}
});