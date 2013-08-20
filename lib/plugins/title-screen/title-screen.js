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
		fontComment: new ig.Font('media/font_couriernew_green_white_48.png'),
		fontCode: new ig.Font('media/font_couriernew_black_white_48.png'),
		fontHighlight: new ig.Font('media/font_couriernew_black_white_48.png'),
		cfg: ig.CONFIG,
		options: ['00 <script>','10  //developer quest','20  var game = new Game();','30  game.load();','40  var options = game.config();','50 </script>'],
		selectedOpt: 2,
		menuTop: 300,
		textHeight: 45,
		textSpacing: 6,
		menuLeft: 25,

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
				this.selectedOpt = (this.selectedOpt--) == 2 ? this.options.length - 2 : this.selectedOpt;
				console.log('up');
			}
			if (ig.input.pressed('down')) {
				this.selectedOpt = (++this.selectedOpt) % (this.options.length - 1);
				if (this.selectedOpt < 2) this.selectedOpt = 2;
				if (!this.selectedOpt) this.selectedOpt++;
				console.log('down');
			}

			//selection highlight
			ig.system.context.fillStyle = 'white';
			ig.utilsdraw.fillPolygon(
				ig.system.context,
				[
					{x: 0, y: this.menuTop},
					{x: ig.system.width, y: this.menuTop},
					{x: ig.system.width, y: this.menuTop + this.textHeight * this.options.length},
					{x: 0, y: this.menuTop + this.textHeight * this.options.length},
				],
				0, 0, ig.system.scale
			);
			ig.system.context.fillStyle = 'yellow';
			ig.utilsdraw.fillPolygon(
				ig.system.context,
				[
					{x: 0, y: this.menuTop},
					{x: ig.system.width, y: this.menuTop},
					{x: ig.system.width, y: this.menuTop + this.textHeight},
					{x: 0, y: this.menuTop + this.textHeight},
				],
				0, this.selectedOpt * this.textHeight,
				ig.system.scale
			);			
			
			//menu text
			for (var i = 0; i < this.options.length; i++) {
				var font = (i == 1) ? this.fontComment : this.fontCode;
				if (i == this.selectedOpt) {
					font = this.fontHighlight;
				}
				font.draw(this.options[i], this.menuLeft, this.menuTop + i * this.textHeight, ig.Font.ALIGN.LEFT);
			}

			//ig.game.screen.width
		},
	});	
});