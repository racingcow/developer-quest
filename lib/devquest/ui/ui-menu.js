var devquest = devquest || {};
devquest.ui = devquest.ui || {};

ig.module(
		'devquest.ui.ui-menu'
	)
	.requires(
		'plusplus.ui.ui-element',
		'devquest.utils.math',
		'devquest.ui.equip',
		'devquest.ui.consumables'
	)
	.defines(function () {

		var _c = ig.CONFIG,
			_size = {x: 249, y: 345},
			_pos = {x: 0, y: 0},
			_offset = 10,
			_zIndex;

		devquest.ui.UIMenu = ig.global.UIMenu = ig.UIElement.extend({

			marginAsPct: false,
			//marginScaleless: false,

			screenTypes: [
				devquest.ui.Equip,
				devquest.ui.Consumables
			],
			screen: null,
			screenIdx: 0,

			party: null,
			playerIdx: 0,
			playerText: null,

			layerName: 'ui',
			size: _size,

			animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'menu-back.png', _size.x, _size.y),
			animSettings: {
				idle: {
					frameTime: 1,
					sequence: [0]
				}
			},

			init: function(x, y, settings) {
				ig.merge(this, settings);
				this.parent(x, y, settings);
			},

			initProperties: function() {
				this.parent();

				_zIndex = this.zIndex + 1;

				this.playerText = ig.game.spawnEntity(ig.UIText, 0, 0, {
					font: ig.Font.FONTS.MENU_TITLE,
					text: 'player',
					zIndex: _zIndex,
					ignoreSystemScale: false,
					linkedTo: this,
					linkAlign: { x: -0.445, y: -0.71 } //todo: magic numbers. weeeeeeee!!
				});

				this.playerIdx = this.party.curPlayerIdx;
				this.switchPlayer(this.playerIdx);

				this.switchScreen(0);
			},

			switchPlayerRight: function() {
				this.switchPlayer(1);
			},

			switchPlayerLeft: function() {
				this.switchPlayer(-1);
			},

			switchPlayer: function(offset) {

				var players = this.party.players;
				this.playerIdx = devquest.utils.math.mod(players.length, this.playerIdx + offset);
				this.playerText.text = players[this.playerIdx].name;
				this.playerText.refresh();

				this.switchScreen(0);

			},

			switchScreenRight: function() {
				this.switchScreen(1);
			},

			switchScreenLeft: function() {
				this.switchScreen(-1);
			},

			switchScreen: function(offset) {

				this.cleanupItem(this.screen);

				this.screenIdx = Math.abs(this.screenIdx + offset) % this.screenTypes.length;

				var st = this.screenTypes[this.screenIdx];
				console.log(ig.game.paused);
				this.screen = ig.game.spawnEntity(st, _pos.x, _pos.y, {
					linkedTo: this,
					zIndex: _zIndex,
					party: this.party,
					margin: {x: 1, y: -37}
				});


			},

			cleanupItem: function(item) {

				if (!item) return;

				item.unlink(this);
				item.kill();
				item = null;
			},

			update: function() {

				if (ig.input.pressed('rot-lft-1')) this.switchScreenLeft();
				if (ig.input.pressed('rot-rt-1')) this.switchScreenRight();

				if (ig.input.pressed('rot-lft-2')) this.switchPlayerLeft();
				if (ig.input.pressed('rot-rt-2')) this.switchPlayerRight();

			},

			fadeToDeath: function(settings) {
				console.log('fadeToDeath start');
				this.cleanupItem(this.playerText);
				this.cleanupItem(this.screen);
				var ret = this.parent(settings);
				console.log('fadeToDeath end');
				return ret;
			},

			reposition: function ( force ) {
				this.parent(force);
				this.pos.y = _offset;
			}

		});

	});