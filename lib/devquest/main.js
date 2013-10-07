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
	'devquest.controllers.party',
	'devquest.players.player',
	'devquest.ui.ui-menu',
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
			party: null,
			menu: null,

			init: function() {
				this.parent();
				this.loadLevel(ig.global.LevelDev1a);
				//ig.game.camera.addAtmosphere( 125 );

				ig.CONFIG.FONT.MENU_TITLE_PATH = ig.CONFIG.PATH_TO_MEDIA + ig.CONFIG.FONT.MENU_TITLE_NAME;
				ig.Font.FONTS.MENU_TITLE = new ig.Font(_c.FONT.MENU_TITLE_PATH);

				this.meterHealth = ig.game.spawnEntity(devquest.ui.UIMeterHealth, 0, 0);

				var matching = ig.game.getEntitiesByClass('EntityClaribel');
				this.player = matching[0];
				var players = [
					this.player,
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

				this.party = new devquest.controllers.Party(this, players);
				this.party.onPlayerChanged.add(this.playerChanged, this);

			},
			pause: function ( lock ) {
				this.parent();
				this.dimmer.message = null; //no 'paused' text
				if (!this.menu) {
					this.menu = this.spawnEntity(devquest.ui.UIMenu, 0, 0, {
						linkedTo: this.dimmer,
						party: this.party,
						margin: {x: 500, y: 10}
					});
				}
			},
			unpause: function ( unlock ) {
				if (this.menu) {
					this.unbindKeys(); //prevent orphaned menu objects due to keypress machine-gunnery
					this.menu.fadeToDeath( { onComplete: this.bindKeys } );
					this.menu = undefined;
				}
				this.parent();
			},
			playerReceivedDamage: function() {
				var player = this.player;
				this.meterHealth.setValue(player.health / player.healthMax);
			},
			playerChanged: function() {
				console.log('playerChanged');
				this.player = this.party.players[this.party.curPlayerIdx];
			},
			inputStart: function() {
				this.parent();

				ig.input.bind(ig.KEY.ESC,	'pause');
				ig.input.bind(ig.KEY.I,		'consumables');
				
				//todo: just for testing. remove later.
				ig.input.bind(ig.KEY._1,	'weapon1');
				ig.input.bind(ig.KEY._2,	'weapon2');
				ig.input.bind(ig.KEY._3,	'weapon3');
				ig.input.bind(ig.KEY._4,	'weapon4');

				this.bindKeys();
			},
			inputEnd: function() {
				this.input.unbindAll();
			},
			bindKeys: function() {
				ig.input.bind(ig.KEY.SPACE,	'atk-int-1');
				ig.input.bind(ig.KEY.Q,		'rot-lft-2');
				ig.input.bind(ig.KEY.E,		'rot-rt-2');
				ig.input.bind(ig.KEY.TAB,	'rot-lft-1');
				ig.input.bind(ig.KEY.R,		'rot-rt-1');
			},
			unbindKeys: function() {
				ig.input.unbind(ig.KEY.SPACE);
				ig.input.unbind(ig.KEY.Q);
				ig.input.unbind(ig.KEY.E);
				ig.input.unbind(ig.KEY.TAB);
				ig.input.unbind(ig.KEY.R);
			},
			update: function() {
				this.parent();
				this.party.update();

				if (ig.input.pressed('pause')) {
					if (ig.game.paused) {
						ig.game.unpause();
					} 
					else {
						ig.game.pause();
					}
				}

				if (ig.input.pressed('consumables')) {
					if (this.menu.visible) {
						this.unbindKeys(); //prevent orphaned menu objects due to keypress machine-gunnery
						this.menu.fadeToDeath( { onComplete: this.bindKeys } );
						this.menu = undefined;
					}
					else {
						this.menu = this.spawnEntity(devquest.ui.UIMenu, 0, 0, {
							linkedTo: this.dimmer,
							party: this.party,
							margin: {x: 500, y: 10}
						});
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