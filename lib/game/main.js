ig.module( 
	'game.main'
)
.requires(
	'plusplus.core.config',
	'plusplus.core.loader',
	'plusplus.core.game',

	'impact.font',

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
		var game = ig.GameExtended.extend({
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
			game,
			60,
			_c.GAME_WIDTH,
			_c.GAME_HEIGHT,
			_c.SCALE,
			ig.LoaderExtended
		);

		ig.system.resize(
			ig.global.innerWidth * _c.CANVAS_WIDTH_PCT * (1 / _c.SCALE),
			ig.global.innerWidth * _c.CANVAS_HEIGHT_PCT * (1 / _c.SCALE),
			_c.SCALE
		);
	}
});