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

			pageIdx: 0,

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

				if (settings && settings.items) this.items = settings.items;

				this.cursorSrc = this.cursorCurr = (settings && settings.cursorSrc) || this.createCursor({
					name: 'cursor-source-consumables',
					animSettings: { idle: { sequence: [0] } },
					pageIdx: 0
				});

				this.cursorDest = (settings && settings.cursorDest) || this.createCursor({
					name: 'cursor-dest-consumables',
					animSettings: { idle: { sequence: [1] } },
					visible: false,
					pageIdx: 0
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

				this.cursorDest.unlink();
				this.cursorDest.kill();

				this.cursorSrc.unlink();
				this.cursorSrc.kill();

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

				if (ig.input.pressed('interact')) {
					if (this.cursorCurr === this.cursorDest) {
						this.itemEvent.call(this.linkedTo, this.idxAtSrc(), this.idxAtDest());
					}
					this.toggleCursor();
				}

				this.scrollbar.increment = this.pageIdx;
				this.cursorSrc.visible = this.cursorSrc.pageIdx === this.pageIdx;

			},

			toggleCursor: function() {

				this.cursorDest.visible = !this.cursorDest.visible;

				var cursorNext = this.cursorCurr === this.cursorSrc ? this.cursorDest : this.cursorSrc;

				cursorNext.margin.x = this.cursorCurr.margin.x;
				cursorNext.margin.y = this.cursorCurr.margin.y;
				cursorNext.pageIdx = this.cursorCurr.pageIdx;

				this.cursorCurr = cursorNext;

				this.cursorSrc.refresh();
				this.cursorDest.refresh();
			},

			draw: function() {

				var cpp = _cfg.COLS_PER_PAGE,
					rpp = _cfg.ROWS_PER_PAGE,
					curIdx = this.pageIdx * cpp * rpp,
					pdX = this.posDraw.x,
					pdY = this.posDraw.y,
					spcX = _cfg.SPACING_X,
					spcY = _cfg.SPACING_Y,
					szX = _cfg.TILE_SIZE_X,
					szY = _cfg.TILE_SIZE_Y,
					x, y, s = this.scale, t = undefined,
					item;

				for (var r = 0; r < rpp; r++) {
					for (var c = 0; c < cpp; c++) {

						x = pdX + spcX + c * (szX + spcX);
						y = pdY + spcY + r * (szY + spcY)

						this.anims['tile'].draw(x, y, s, t);

						item = this.items[curIdx++];
						if (item) item.anims['idle'].draw(x, y, s, t);

					}
				}

			},

			cursorMove: function(axis, offset) {

				var cur = this.cursorCurr,
					curSz = cur.size[axis],
					axisName = axis.toLowerCase() === 'x' ? 'COLS' : 'ROWS',
					spc = _cfg['SPACING_' + axis.toUpperCase()],
					perPage = _cfg[axisName + '_PER_PAGE'],
					pages = _cfg[axisName] / perPage,
					min = spc,
					max = spc + (curSz + spc) * (perPage - 1),
					newMg = cur.margin[axis] + offset * (curSz + spc);

				if (newMg < min && this.pageIdx > 0) {
					this.pageIdx--;
					cur.margin[axis] = max;
					cur.refresh(true);
				}
				else if (newMg > max && this.pageIdx < pages - 1) {
					this.pageIdx++;
					cur.margin[axis] = spc;
					cur.refresh(true);
				}
				else if (newMg >= min && newMg <= max) {
					cur.margin[axis] = newMg;
					cur.refresh(true);
				}

				cur.pageIdx = this.pageIdx;

			},

			idxAtSrc: function() {
				return this.idxAtCursor(this.cursorSrc);
			},

			idxAtDest: function() {
				return this.idxAtCursor(this.cursorDest);
			},

			idxAtCursor: function(cursor) {

				var spcX = _cfg.SPACING_X,
					spcY = _cfg.SPACING_Y,
					cpp = _cfg.COLS_PER_PAGE,
					rpp = _cfg.ROWS_PER_PAGE,
					colIdx = (cursor.margin.x - spcX) / (cursor.size.x + spcX),
					rowIdx = (cursor.margin.y - spcY) / (cursor.size.y + spcY),
					ipp = cpp * rpp,
					fullPages = cursor.pageIdx * ipp,
					fullRows = rowIdx * cpp,
					thisRow = colIdx;

				return fullPages + fullRows + thisRow;
			},

			sortCompare: function(item1, item2) { return 0 },
			sort: function() {
			},

			itemFilter: function(item) { return true },
			itemEvent: function(src, dest) {}

		});

	});