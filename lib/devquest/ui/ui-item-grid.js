var devquest = devquest || {};
devquest.ui = devquest.ui || {};

ig.module(
		'devquest.ui.ui-item-grid'
	)
	.requires(
		'plusplus.ui.ui-element',
		'devquest.ui.ui-scrollbar'
	)
	.defines(function () {
		'use strict';

		var _c = ig.CONFIG,
			_cfg = _c.UI.ITEMGRID,
			_cfgS = _c.UI.SCROLLBAR;

		devquest.ui.UIItemGrid = ig.global.UIItemGrid = UIElement.extend({

			items: [], //array of UIElements to display in the grid

			animIndBelow: false, //true draws indicators below items instead of above

			//since most things except scroll bars are the same size, these are all combined into one sheet
			animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'ui-item-grid.png', _cfg.TILE_SIZE_X, _cfg.TILE_SIZE_Y),
			animSettings: {
				tile: {
					frameTime: 1,
					sequence: [0]
				},
				indSrc: {
					frameTime: 1,
					sequence: [1]
				},
				indDest: {
					frameTime: 1,
					sequence: [2]
				}
			},

			size: {
				x: _cfg.SPACING_X + _cfg.COLS_PER_PAGE * (_cfg.TILE_SIZE_X + _cfg.SPACING_X) + _cfgS.WIDTH,
				y: _cfg.SPACING_Y + _cfg.ROWS_PER_PAGE * (_cfg.TILE_SIZE_Y + _cfg.SPACING_Y)
			},

			gridSize: {
				x: _cfg.ROWS,
				y: _cfg.COLS,
			},
			gridSpacing: {
				x: _cfg.SPACING_X,
				y: _cfg.SPACING_Y
			},
			pageSize: {
				x: _cfg.COLS_PER_PAGE,
				y: _cfg.ROWS_PER_PAGE
			},

			cursorSrc: null,
			cursorDest: null,
			cursorCurr: null,

			scrollbar: null,

			linkedTo: null,

			marginAsPct: false,
			marginScaleless: false,

			linkAlignInside: true,
			linkAlign: {x: -1, y: -1},

			init: function(x, y, settings) {

				this.parent(x, y, settings);

				console.log('UIItemGrid:init');

				if (!settings || !settings.linkedTo) {
					console.warn("UIItemGrid is not linkedTo any parent UIElement. This may cause unintended behavior if certain properties are not set via init settings.");
				}

				if (settings && settings.linkedTo) this.zIndex = settings.linkedTo.zIndex + 1;

				this.scrollbar = (settings && settings.scrollbar) || ig.game.spawnEntity(devquest.ui.UIScrollbar, 0, 0, {
					name: this.name + '-scrollbar',
					linkedTo: this,
					size: {
						x: _cfgS.WIDTH,
						y: this.size.y - 2 * _cfg.SPACING_Y
					},
					margin: {
						x: this.size.x - _cfgS.WIDTH,
						y: _cfg.SPACING_Y
					}
				});

				this.cursorSrc = this.cursorCurr = this.createCursor({
					name: 'cursor-source-consumables',
					animSettings: { idle: { sequence: [0] } }
				});

				this.cursorDest = this.createCursor({
					name: 'cursor-dest-consumables',
					animSettings: { idle: { sequence: [1] } },
					visible: false
				});

			},

			createCursor: function(settings) {
				var options = {
					linkedTo: this,
					zIndex: this.zIndex + 1,
					margin: {x: _cfg.SPACING_X, y: _cfg.SPACING_Y},
				};
				ig.merge(options, settings);
				return ig.game.spawnEntity(devquest.ui.Indicator, 0, 0, options);
			},

			die: function() {
				this.scrollbar.unlink();
				this.scrollbar.kill();
				this.parent();
			},

			update: function() {
				if (ig.input.pressed('up')) {
					this.cursorMove('y', -1);
				}
				if (ig.input.pressed('down')) {
					this.cursorMove('y', 1);
				}
				if (ig.input.pressed('left')) {
					this.cursorMove('x', -1);
				}
				if (ig.input.pressed('right')) {
					this.cursorMove('x', 1);
				}
			},

			draw: function() {

				for (var c = 0; c < _cfg.COLS_PER_PAGE; c++) {
					for (var r = 0; r < _cfg.ROWS_PER_PAGE; r++) {

						this.anims['tile'].draw(
							this.posDraw.x + _cfg.SPACING_X + c * (_cfg.TILE_SIZE_X + _cfg.SPACING_X),
							this.posDraw.y + _cfg.SPACING_Y + r * (_cfg.TILE_SIZE_Y + _cfg.SPACING_Y),
							this.scale,
							this.textured ? this : undefined
						);


					}
				}

			},

			cursorMove: function(axis, offset) {

				var cur = this.cursorCurr,
					curSz = cur.size[axis],
					axisName = axis.toLowerCase() === 'x' ? 'COLS' : 'ROWS',
					spc = _cfg['SPACING_' + axis.toUpperCase()],
					min = spc,
					max = spc + (curSz + spc) * (_cfg[axisName + '_PER_PAGE'] - 1),
					newMg = cur.margin[axis] + offset * (curSz + spc);

				console.log('newMg = ' + newMg + ', max = ' + max);

				if (newMg >= min && newMg <= max) {
					cur.margin[axis] = newMg;
					cur.refresh(true);
				}

			},

			sortCompare: function(item1, item2) { return 0 },
			sort: function() {
			},

			itemFilter: function(item) { return true },
			itemEvent: function(src, dest) {}

		});

	});