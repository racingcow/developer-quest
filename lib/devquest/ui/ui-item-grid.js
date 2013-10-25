var devquest = devquest || {};
devquest.ui = devquest.ui || {};

ig.module(
		'devquest.ui.ui-item-grid'
	)
	.requires(
		'plusplus.ui.ui-element',
		'devquest.utils.enum',
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

			//the number of items shown in the grid, across all pages
			grdSz: {
				x: _cfg.COLS,
				y: _cfg.ROWS,
			},
			//the number of items visible on a single page of the grid
			grdSzPg: {
				x: _cfg.COLS_PER_PAGE,
				y: _cfg.ROWS_PER_PAGE
			},
			//the amounf of spacing, in px, between each item in the grid
			grdSpc: {
				x: _cfg.SPACING_X,
				y: _cfg.SPACING_Y
			},
			pgIdx: {
				x: 0,
				y: 0
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

			//if set using linkToGrid method, user will be able to move 
			//cursor into these other grids
			linkedGrids: {
				up: undefined,
				down: undefined,
				left: undefined,
				right: undefined
			},

			init: function(x, y, settings) {

				this.parent(x, y, settings);

				console.log('UIItemGrid:init');

				this.size.x = this.grdSpc.x + this.grdSzPg.x * (this.animSheet.width  + this.grdSpc.x) + _cfgS.WIDTH;
				this.size.y = this.grdSpc.y + this.grdSzPg.y * (this.animSheet.height + this.grdSpc.y);

				if (!settings || !settings.linkedTo) {
					console.warn("UIItemGrid is not linkedTo any parent UIElement. This may cause unintended behavior if certain properties are not set via init settings.");
				}

				if (settings && settings.linkedTo) this.zIndex = settings.linkedTo.zIndex + 1;

				this.initScrollbar(settings);

				if (settings && settings.items) this.items = settings.items;

				this.cursorSrc = this.cursorCurr = (settings && settings.cursorSrc) || this.createCursor({
					name: 'cursor-source-consumables',
					animSettings: { idle: { sequence: [0] } },
					pgIdx: {x: 0, y: 0}
				});

				this.cursorDest = (settings && settings.cursorDest) || this.createCursor({
					name: 'cursor-dest-consumables',
					animSettings: { idle: { sequence: [1] } },
					visible: false,
					pgIdx: {x: 0, y: 0}
				});

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

				this.scrollbar.increment = this.pgIdx.y;
				this.cursorSrc.visible = this.cursorCurr && this.cursorSrc.pgIdx.y === this.pgIdx.y;

				if (this.destGridDeferred) {
					if (this.cursorCurr === this.cursorSrc) {
						this.destGridDeferred.cursorCurr = this.destGridDeferred.cursorSrc;
					}
					if (this.cursorCurr === this.cursorDest) {
						this.destGridDeferred.cursorCurr = this.destGridDeferred.cursorDest;
					}
					this.destGridDeferred.cursorCurr.refresh(true);
					this.cursorCurr = null;
					this.destGridDeferred = null;
				}

				if (!this.cursorCurr) return;

				var dir;
				for (var d in devquest.utils.vect.DIRECTION) {
					dir = devquest.utils.vect.DIRECTION[d];
					if (ig.input.pressed(dir.name)) {
						this.cursorMove(dir);
						break;
					}
				}

				if (ig.input.pressed('interact')) {
					if (this.cursorCurr === this.cursorDest) {
						this.itemEvent.call(this.linkedTo, this.idxAtSrc(), this.idxAtDest());
					}
					this.toggleCursor();
				}

			},

			//direction here is of type 'devquest.utils.vect.DIRECTION'
			linkToGrid: function(grid, direction) {

				grid.cursorCurr = null;

				this.linkedGrids[direction.name] = grid;
				grid.linkedGrids[direction.inverseName] = this;

				console.log('linking ' + this.name + '.' + direction.name + ' to ' + grid.name);
				console.log('linking ' + grid.name + '.' + direction.inverseName + ' to ' + this.name);

			},

			initScrollbar: function(settings) {

				this.scrollbar = (settings && settings.scrollbar) || ig.game.spawnEntity(devquest.ui.UIScrollbar, 0, 0, {
					name: this.name + '-scrollbar',
					linkedTo: this,
					size: {
						x: _cfgS.WIDTH,
						y: this.size.y - 2 * this.grdSpc.y
					},
					margin: {
						x: this.size.x - _cfgS.WIDTH,
						y: this.grdSpc.y
					},
					visible: this.grdSz.y / this.grdSzPg.y > 1 //don't display scrollbar if only one page
				});

			},

			createCursor: function(settings) {
				var options = {
					linkedTo: this,
					zIndex: this.zIndex + 1,
					margin: {x: this.grdSpc.x, y: this.grdSpc.y},
				};
				ig.merge(options, settings);
				return ig.game.spawnEntity(devquest.ui.Indicator, 0, 0, options);
			},

			toggleCursor: function() {

				this.cursorDest.visible = !this.cursorDest.visible;

				var cursorNext = this.cursorCurr === this.cursorSrc ? this.cursorDest : this.cursorSrc;

				cursorNext.margin.x = this.cursorCurr.margin.x;
				cursorNext.margin.y = this.cursorCurr.margin.y;
				cursorNext.pgIdx.x = this.cursorCurr.pgIdx.x;
				cursorNext.pgIdx.y = this.cursorCurr.pgIdx.y;

				this.cursorCurr = cursorNext;

				this.cursorSrc.refresh();
				this.cursorDest.refresh();
			},

			//direction is of type 'devquest.utils.vect.DIRECTION'
			cursorMove: function(direction) {

				var axis = direction.axis,
					cur = this.cursorCurr,
					curSz = cur.size[axis],
					spc = this.grdSpc[axis],
					perPage = this.grdSzPg[axis],
					pages = this.grdSz[axis] / perPage,
					min = spc,
					max = spc + (curSz + spc) * (perPage - 1),
					newMg = cur.margin[axis] + direction.vect[axis] * (curSz + spc);

				//paging "down"
				if (newMg < min && this.pgIdx[axis] > 0) {
					this.pgIdx[axis]--;
					cur.margin[axis] = max;
					cur.refresh(true);
				}
				//paging "up"
				else if (newMg > max && this.pgIdx[axis] < pages - 1) {
					this.pgIdx[axis]++;
					cur.margin[axis] = spc;
					cur.refresh(true);
				}
				//moving within same page
				else if (newMg >= min && newMg <= max) {
					cur.margin[axis] = newMg;
					cur.refresh(true);
				}
				//moving to linked grid
				else {
					console.log(this.name + 'moving to other grid');
					console.log(this.cursorCurr);
					this.destGridDeferred = this.linkedGrids[direction.name];
				}

				cur.pgIdx[axis] = this.pgIdx[axis];

			},

			draw: function() {

				var cpp = this.grdSzPg.x,
					rpp = this.grdSzPg.y,
					curIdx = this.pgIdx.y * cpp * rpp,
					pdX = this.posDraw.x,
					pdY = this.posDraw.y,
					spcX = this.grdSpc.x,
					spcY = this.grdSpc.y,
					szX = this.animSheet.width,
					szY = this.animSheet.height,
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

			idxAtSrc: function() {
				return this.idxAtCursor(this.cursorSrc);
			},

			idxAtDest: function() {
				return this.idxAtCursor(this.cursorDest);
			},

			idxAtCursor: function(cursor) {

				var spcX = this.grdSpc.x,
					spcY = this.grdSpc.y,
					cpp = this.grdSzPg.x,
					rpp = this.grdSzPg.y,
					colIdx = (cursor.margin.x - spcX) / (cursor.size.x + spcX),
					rowIdx = (cursor.margin.y - spcY) / (cursor.size.y + spcY),
					ipp = cpp * rpp,
					fullPages = cursor.pgIdx.y * ipp,
					fullRows = rowIdx * cpp,
					thisRow = colIdx;

				return fullPages + fullRows + thisRow;
			},

			sortCompare: function(item1, item2) { return 0 },
			sort: function() {
			},

			itemEvent: function(src, dest) {}

		});

	});