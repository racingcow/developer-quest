var devquest = devquest || {};
devquest.ui = devquest.ui || {};

ig.module(
		'devquest.ui.consumables'
	)
	.requires(
		'devquest.utils.math',
		'devquest.ui.ui-menu-screen',
		'devquest.ui.highlight',
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

			highlightPosGrid: {x: 0, y: 0},
			highlightPosInv: {x: 0, y: 0},
			highlight: null,

			scrollHandle: null,

			init: function(x, y, settings) {
				this.parent(x, y, settings);

				_zIndex = this.zIndex + 1;

				this.highlight = ig.game.spawnEntity(devquest.ui.Highlight, 0, 0, {
					linkedTo: this,
					zIndex: _zIndex,
					name: 'highlight-consumables',
					margin: {x: _cfg.SPACING, y: _cfg.SPACING}
				});

				this.scrollHandle = ig.game.spawnEntity(devquest.ui.ScrollHandle, 0, 0, {
					linkedTo: this,
					zIndex: _zIndex,
					name: 'scrollhandle-consumables',
					margin: _cfg.SCROLLBAR_POS
				});

				this.renderPage();
			},

			die: function() {
				this.highlight.kill(true);
				this.scrollHandle.kill(true);
				this.renderPage(true);
				this.parent();
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

			},

			highlightMove: function(axis, offset) {

				var rowCol = axis === 'x' ? 'COLS' : 'ROWS';
				var spacing = _c.UI.MENU.CONSUMABLES.SPACING,
					jumpSz = this.highlight.size[axis] + spacing,
					posI = this.highlightPosInv[axis],
					posIMax = _cfg[rowCol] - 1,
					posG = this.highlightPosGrid[axis],
					posGMax = _cfg[rowCol + '_PER_PAGE'],
					mod = devquest.utils.math.mod;

				if ( (offset < 0 && posI <= 0) || (offset > 0 && posI >= posIMax) ) return;

				posI += offset;
				if (( (offset < 0) && (posG === 0) ) || ( (offset > 0) && (mod(posGMax, posG + 1) === 0)) ) {
					this.scroll(axis, offset);
					posG = offset < 0 ? posGMax - 1 : 0;
					this.highlight.margin[axis] = spacing + posG * (this.highlight.size[axis] + spacing);
				}
				else {
					posG += offset;
					this.highlight.margin[axis] += jumpSz * offset;
				}

				this.highlightPosGrid[axis] = posG;
				this.highlightPosInv[axis] = posI;
				this.highlight.refresh(true);

				console.log('posG = (' + this.highlightPosGrid.x.toString() + ', ' + this.highlightPosGrid.y.toString() + ')');
				console.log('posI = (' + this.highlightPosInv.x.toString() + ', ' + this.highlightPosInv.y.toString() + ')');
			},

			scroll: function(axis, offset) {

				console.log('scrolling ' + offset);

				var rowCol = axis === 'x' ? 'COLS' : 'ROWS',
					pxPer = this.scrollHandle.size.y / _cfg.ROWS;

				this.rowColIdx[axis] += offset;

				this.scrollHandle.margin[axis] = _cfg.SCROLLBAR_POS[axis] + this.rowColIdx[axis] * this.scrollHandle.size[axis];
				this.scrollHandle.refresh(true);

			},

			renderPage: function(clear) {

				// var inv = this.party.inventory,
				// 	start = this.pgIdx * _cfg.PAGE_SIZE,
				// 	end = Math.min(start + _cfg.PAGE_SIZE, inv.length),
				// 	item = null, c = 0, r = 0,
				// 	mod = devquest.utils.math.mod;

				// for (var i = 0; i < inv.length; i++) {
				// 	item = inv[i]
				// 	if (!clear && (i >= start) && (i < end)) {
				// 		console.log('spawning ' + i);
				// 		this.renderItem(item, r, c);
				// 		c = mod(c + 1, _cfg.COLS);
				// 		if (c === 0) r = mod(r + 1, _cfg.ROWS);
				// 	}
				// 	else {
				// 		console.log('removing ' + i);
				// 		this.clearItem(item);
				// 	}
				// }
			},

			renderItem: function(item, r, c) {
				ig.game.addItem(item);
				item.reset(0, 0, {
					linkedTo: this,
					zIndex: _zIndex
				});
			},

			clearItem: function(item) {
				item.unlink(false);
				ig.game.removeItem(item);
			}

		});

	});