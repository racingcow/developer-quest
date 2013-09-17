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
	'devquest.ui.ui-meter-health',
	'devquest.players.carl',
	'devquest.players.claribel',
	'devquest.players.duke',
	'devquest.players.lazlo',
	'devquest.players.max',
	'devquest.players.susan',
	'devquest.players.vernon',
	'devquest.players.bose',
	'devquest.levels.dev1a'
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
			ig.Character._debugShowPaths = true;
			ig.Character._debugShowWaypoints = true;
			ig.Entity._debugShowBoxes = true;
			ig.Entity._debugShowVelocities = true;
			ig.Entity._debugShowNames = true;
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
			meterHealth: {},
			playerController: null,

			init: function() {
				this.parent();
				this.loadLevel(ig.global.LevelDev1a);
				//ig.game.camera.addAtmosphere( 125 );

				this.meterHealth = ig.game.spawnEntity(devquest.ui.UIMeterHealth, 0, 0);

				var players = [
					ig.game.getEntitiesByClass('EntityClaribel')[0],
					new devquest.players.EntityDuke(),
					new devquest.players.EntityCarl(),
					new devquest.players.EntityLazlo(),
					new devquest.players.EntityMax(),
					new devquest.players.EntitySusan(),
					new devquest.players.EntityVernon(),
					new devquest.players.EntityBose()
				];

				for (var i = 0; i < players.length; i++) {
					players[i].onReceivedDamage.add(this.playerReceivedDamage, this);
				}

				this.playerController = new devquest.controllers.PlayerController(this, players);

			},
			playerReceivedDamage: function() {
				var player = this.playerController.players[this.playerController.curPlayerIdx];
				this.meterHealth.setValue(player.health / player.healthMax);
			},
			inputStart: function() {
				this.parent();
				ig.input.bind(ig.KEY.ESC,	'pause');
				ig.input.bind(ig.KEY.SPACE,	'attack');
				ig.input.bind(ig.KEY.Q,		'switchPlayerLeft');
				ig.input.bind(ig.KEY.E,		'switchPlayerRight');

				//todo: just for testing. remove later.
				ig.input.bind(ig.KEY._1,		'weapon1');
				ig.input.bind(ig.KEY._2,		'weapon2');
				ig.input.bind(ig.KEY._3,		'weapon3');
				ig.input.bind(ig.KEY._4,		'weapon4');
			},
			inputEnd: function() {
				this.parent();
			},
			update: function() {
				this.parent();
				this.playerController.update();

				if (ig.input.pressed('pause')) {
					if (ig.game.paused) {
						ig.game.unpause();
					} 
					else {
						ig.game.pause();
					}
				}
			}
		});
		
		ig.main(
			'#canvas',
			//ig.TitleScreen,
			ig.MainGame,
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