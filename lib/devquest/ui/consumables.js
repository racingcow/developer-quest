var devquest = devquest || {};
devquest.ui = devquest.ui || {};

ig.module(
		'devquest.ui.consumables'
	)
	.requires(
		'devquest.utils.math',
		'devquest.ui.ui-menu-screen',
		'devquest.ui.indicator',
		'devquest.ui.scroll-handle'
	)
	.defines(function () {
		'use strict';

		var _c = ig.CONFIG,
			_cfg = _c.UI.MENU.CONSUMABLES,
			_zIndex = null;

		devquest.ui.Consumables = ig.global.Consumables = devquest.ui.UIMenuScreen.extend({

			animSettings: {
				idle: {
					frameTime: 1,
					sequence: [1]
				}
			},
			party: null,
			rowColIdx: {x: 0, y: 0},

			highlightSrc: {
				name: 'highlightSrc',
				pos: {
					grid: {x: 0, y: 0},
					inv: {x: 0, y: 0},
				},
				entity: null
			},

			highlightDest: {
				name: 'highlightDest',
				pos: {
					grid: {x: 0, y: 0},
					inv: {x: 0, y: 0},
				},
				entity: null
			},

			highlightActiveName: 'highlightSrc',

			scrollHandle: null,

			init: function(x, y, settings) {
				this.parent(x, y, settings);

				_zIndex = this.zIndex + 1;

				this.highlightSrc.entity = this.createHighlight({
					name: 'highlight-source-consumables',
					animSettings: { idle: { sequence: [0] } }
				});

				this.highlightDest.entity = this.createHighlight({
					name: 'highlight-dest-consumables',
					animSettings: { idle: { sequence: [1] } }
				});
				this.clearItem(this.highlightDest.entity);

				this.scrollHandle = ig.game.spawnEntity(devquest.ui.ScrollHandle, 0, 0, {
					linkedTo: this,
					zIndex: _zIndex,
					name: 'scrollhandle-consumables',
					margin: _cfg.SCROLLBAR_POS
				});

				this.renderPage();
			},

			die: function() {
				this.highlightSrc.kill(true);
				this.highlightDest.kill(true);
				this.scrollHandle.kill(true);
				this.renderPage(true);
				this.parent();
			},

			createHighlight: function(settings) {
				var options = {
					linkedTo: this,
					zIndex: _zIndex,
					margin: {x: _cfg.SPACING, y: _cfg.SPACING},
				};
				ig.merge(options, settings);
				return ig.game.spawnEntity(devquest.ui.Indicator, 0, 0, options);
			},

			update: function() {
				this.parent();

				if (ig.input.pressed('up')) {
					this.highlightMove('y', -1);
				}
				if (ig.input.pressed('down')) {
					this.highlightMove('y', 1);
				}
				if (ig.input.pressed('left')) {
					this.highlightMove('x', -1);
				}
				if (ig.input.pressed('right')) {
					this.highlightMove('x', 1);
				}

				if (ig.input.pressed('interact')) {
					if (this.highlightActiveName === this.highlightSrc.name) {
						this.highlightActiveName = this.highlightDest.name;
						this.renderItem(this.highlightDest.entity, this.highlightDest.pos.grid.x, this.highlightDest.pos.grid.y);
					}
					else {
						//todo: handle cancel, dest selection
					}
				}

			},

			highlightMove: function(axis, offset) {

				var rowCol = axis === 'x' ? 'COLS' : 'ROWS';
				var spacing = _c.UI.MENU.CONSUMABLES.SPACING,
					highlight = this[this.highlightActiveName],
					jumpSz = highlight.entity.size[axis] + spacing,
					posI = highlight.pos.inv[axis],
					posIMax = _cfg[rowCol] - 1,
					posG = highlight.pos.grid[axis],
					posGMax = _cfg[rowCol + '_PER_PAGE'],
					mod = devquest.utils.math.mod;

				if ( (offset < 0 && posI <= 0) || (offset > 0 && posI >= posIMax) ) return;

				posI += offset;
				if (( (offset < 0) && (posG === 0) ) || ( (offset > 0) && (mod(posGMax, posG + 1) === 0)) ) {
					this.clearPage();
					this.scroll(axis, offset);
					posG = offset < 0 ? posGMax - 1 : 0;
					highlight.entity.margin[axis] = spacing + posG * jumpSz;
					highlight.pos.inv[axis] = posI;
					this.renderPage();
				}
				else {
					posG += offset;
					highlight.entity.margin[axis] += jumpSz * offset;
					highlight.pos.inv[axis] = posI;
				}

				highlight.pos.grid[axis] = posG;
				highlight.entity.refresh(true);
			},

			scroll: function(axis, offset) {

				console.log('scrolling ' + offset);

				var rowCol = axis === 'x' ? 'COLS' : 'ROWS',
					pxPer = this.scrollHandle.size.y / _cfg.ROWS;

				this.rowColIdx[axis] += offset;

				this.scrollHandle.margin[axis] = _cfg.SCROLLBAR_POS[axis] + this.rowColIdx[axis] * this.scrollHandle.size[axis];
				this.scrollHandle.refresh(true);

			},

			renderPage: function() {
				this.drawPage(this.renderItem);
			},

			clearPage: function() {
				this.drawPage(this.clearItem);
			},

			drawPage: function(renderCall) {

				var inv = this.party.inventory,
					mod = devquest.utils.math.mod,
					cpp = _cfg.COLS_PER_PAGE,
					rpp = _cfg.ROWS_PER_PAGE,
					pageSz = cpp * rpp,
					highlight = this.highlightActiveName === this.highlightSrc.name ? this.highlightSrc : this.highlightDest,
					pageIdx = Math.floor(highlight.pos.inv.y / rpp),
					offset = pageIdx * pageSz,
					item, x = 0, y = 0;

				console.log('drawpage ' + pageIdx.toString());

				for (var i = offset; i < offset + pageSz; i++) {
					item = inv[i];
					if (item) renderCall.call(this, item, x, y);
					x = mod(cpp, x + 1);
					if (x === 0)  y = y + 1;
				}

			},

			renderItem: function(item, x, y) {

				var spc = _cfg.SPACING,
					highlight = this.highlightActiveName === this.highlightSrc.name ? this.highlightSrc : this.highlightDest,
					hSz = highlight.entity.size;

				console.log('renderItem ' + item.friendlyName);

				ig.game.addItem(item);
				item.reset(0, 0, {
					linkedTo: this,
					zIndex: _zIndex,
					margin: {
						x: spc + x * (spc + hSz.x),
						y: spc + y * (spc + hSz.y)
					},
					marginAsPct: false,
					marginScaleless: false,
					linkAlignInside: true,
					linkAlign: {x: -1, y: -1}
				});
			},

			clearItem: function(item) {
				console.log('clearItem ' + item.friendlyName);

				item.unlink(true);
				ig.game.removeItem(item);

			}

		});

	});