ig.module( 
	'plugins.title-screen.title-screen'
)
.requires(
	
	//base impact dependencies
	'impact.font',
	
	//impact-bootstrap - https://github.com/gamecook/Impact-Bootstrap.git
	'plugins.impact-splash-loader.impact-splash-loader',

	//impact++ - https://github.com/collinhover/impactplusplus.git
	'plusplus.core.config',
	'plusplus.core.game',
	'plusplus.helpers.utilsdraw'

)
.defines(function() {
	
	"use strict";

	ig.TitleScreen = ig.GameExtended.extend({		

		game: null,
		font: new ig.Font('media/font_04b03_black_16.png'),
		cfg: ig.CONFIG,
		options: ['00    //developer quest','10    Game devQuest = new Game();','20    game.Load();','30    Config options = game.Config();'],
		selectedOpt: 0,
		menuTop: 100,
		textHeight: 15,
		textSpacing: 2,

		init: function() {
			ig.input.bind(ig.KEY.ENTER, 'interact');
			ig.input.bind(ig.KEY.F11, 'interact');
			ig.input.bind(ig.KEY.UP_ARROW, 'up');
			ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
			ig.input.bind(ig.KEY.F10, 'down');
		},
		run: function() {	
			
			if(ig.input.pressed('interact')) {
				var c = this.cfg;
				ig.system.setGame(ig.MainGame);			
				ig.system.resize(c.GAME_WIDTH, c.GAME_HEIGHT, c.SCALE);				
			}
			if (ig.input.pressed('up')) {
				this.selectedOpt = (this.selectedOpt--) == 0 ? this.options.length - 1 : this.selectedOpt;				
				console.log(this.selectedOpt);
			}
			if (ig.input.pressed('down')) {
				this.selectedOpt = (++this.selectedOpt) % (this.options.length);
				console.log(this.selectedOpt);
			}

			//selection highlight
			ig.utilsdraw.fillPolygon(
				ig.system.context,
				[
					{x: 0, y: this.menuTop},
					{x: ig.system.width, y: this.menuTop},
					{x: ig.system.width, y: this.menuTop + this.textHeight * this.options.length},
					{x: 0, y: this.menuTop + this.textHeight * this.options.length},
				],
				0, 0,
				255, 255, 255, 255, ig.system.scale
			);
			ig.utilsdraw.fillPolygon(
				ig.system.context,
				[
					{x: 0, y: this.menuTop},
					{x: ig.system.width, y: this.menuTop},
					{x: ig.system.width, y: this.menuTop + this.textHeight},
					{x: 0, y: this.menuTop + this.textHeight},
				],
				0, this.selectedOpt * this.textHeight,
				255, 255, 0, 255, ig.system.scale
			);			
			
			//menu text
			for (var i = 0; i < this.options.length; i++) {
				this.font.draw(this.options[i], 100, this.menuTop + i * this.textHeight, ig.Font.ALIGN.LEFT);
			}

			//ig.game.screen.width
		},
	});	
});