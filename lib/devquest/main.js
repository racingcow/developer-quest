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
	'devquest.controllers.playerController',
	'devquest.players.player',
	'devquest.players.carl',
	'devquest.players.claribel',
	'devquest.players.duke',
	'devquest.players.lazlo',
	'devquest.players.max',
	'devquest.players.susan',
	'devquest.players.vernon',
	'devquest.levels.dev1'
)
.defines(function() {
	"use strict";

	var _c = ig.CONFIG,
		DEBUG = _c.DEBUG;
	if (DEBUG) {
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
			playerController: null,
			init: function() {
				this.parent();
				this.loadLevel(ig.global.LevelDev1);
				//ig.game.camera.addAtmosphere( 125 );

				this.playerController = new devquest.controllers.PlayerController(this, [
					ig.game.getEntitiesByClass('EntityClaribel')[0],
					new devquest.players.Duke(),
					new devquest.players.Carl(),
					new devquest.players.Lazlo(),
					new devquest.players.Max(),
					new devquest.players.Susan(),
					new devquest.players.Vernon()
				]);
			},
			inputStart: function() {
				this.parent();
				ig.input.bind(ig.KEY.SPACE,	'attack');
				ig.input.bind(ig.KEY.Q,		'switchPlayerLeft');
				ig.input.bind(ig.KEY.E,		'switchPlayerRight');
			},
			inputEnd: function() {
				this.parent();
			},
			update: function() {
				this.parent();
				this.playerController.update();
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
			ig.global.innerWidth * _c.GAME_WIDTH_PCT * (1 / _c.SCALE),
			ig.global.innerHeight * _c.GAME_HEIGHT_PCT * (1 / _c.SCALE),
			_c.SCALE
		);
	}
});