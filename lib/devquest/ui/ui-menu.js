var devquest = devquest || {};
devquest.ui = devquest.ui || {};

ig.module(
		'devquest.ui.ui-menu'
	)
	.requires(
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

			screenTypes: [
				devquest.ui.Equip,
				devquest.ui.Consumables
			],
			screen: null,
			screenIdx: 0,

			layerName: 'ui',
			size: _size,

			animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'menu-back.png', _size.x, _size.y),
			animSettings: {
				idle: {
					frameTime: 1,
					sequence: [0]
				}
			},

			initProperties: function() {
				this.parent();

				_zIndex = this.zIndex + 1;
				this.switchScreen(0);
			},

			switchScreenRight: function() {
				this.switchScreen(1);
			},

			switchScreenLeft: function() {
				this.switchScreen(-1);
			},

			switchScreen: function(offset) {

				this.cleanupScreen();

				var sign = offset ? offset < 0 ? -1 : 1 : 0;
				this.screenIdx = ((this.screenIdx + offset) * sign) % this.screenTypes.length;

				var st = this.screenTypes[this.screenIdx];
				this.screen = ig.game.spawnEntity(st, _pos);
				this.screen.link(this, true); //passing in settings of spawnEntity not working for some reason
				this.screen.zIndex = _zIndex; //passing in settings of spawnEntity not working for some reason

			},

			cleanupScreen: function() {

				if (!this.screen) return;

				this.screen.unlink(this);
				this.screen.kill();
			},

			update: function() {

				if (ig.input.pressed('left')) this.switchScreenLeft();
				if (ig.input.pressed('right')) this.switchScreenRight();

			},

			fadeToDeath: function(settings) {
				this.cleanupScreen();
				return this.parent(settings);
			},

			reposition: function ( force ) {
				this.parent(force);
				this.pos.y = _offset;
			}

		});

	});