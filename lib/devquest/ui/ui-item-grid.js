var devquest = devquest || {};
devquest.ui = devquest.ui || {};

ig.module(
		'devquest.ui.ui-item-grid'
	)
	.requires(
		'plusplus.ui.ui-element'
	)
	.defines(function () {
		'use strict';

		var _c = ig.CONFIG,
			_cfg = _c.UI.ITEMGRID || {
				COLS: 6,
				ROWS: 16,
				COLS_PER_PAGE: 6,
				ROWS_PER_PAGE: 4,
				SPACING_X: 5,
				SPACING_Y: 5,
				TILE_SIZE_X: 24,
				TILE_SIZE_Y: 24
			};

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
				x: _cfg.TILE_SIZE_X,
				y: _cfg.TILE_SIZE_Y
			},

			animSheetScrollArrow: null,
			animSettingsScrollArrow: true,
			
			animSheetScrollThumb: null,
			animSettingsScrollThumb: true,

			animSheetScrollTrack: null,
			animSettingsScrollTrack: true,

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

			linkedTo: null,

			marginAsPct: false,
			marginScaleless: false,

			linkAlignInside: true,
			linkAlign: {x: -1, y: -1},

			init: function(x, y, settings) {

				this.parent(x, y, settings);

				console.log('init');

				if (settings.linkedTo) {
					this.zIndex = settings.linkedTo.zIndex + 1;
				}

			},

			reposition: function(force) {
				this.parent(force);
			},

			draw: function() {

				//this.parent();

				//tiles
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

			sortCompare: function(item1, item2) { return 0 },
			sort: function() {
			},

			itemFilter: function(item) { return true },
			itemEvent: function(src, dest) {}

		});

	});