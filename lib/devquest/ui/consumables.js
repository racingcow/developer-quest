var devquest = devquest || {};
devquest.ui = devquest.ui || {};

ig.module(
		'devquest.ui.consumables'
	)
	.requires(
		'devquest.utils.math',
		'devquest.ui.ui-menu-screen',
		'devquest.ui.highlight'
	)
	.defines(function () {
		'use strict';

		var _c = ig.CONFIG,
			_zIndex = null;

		devquest.ui.Consumables = ig.global.Consumables = devquest.ui.UIMenuScreen.extend({

			animSettings: {
				idle: {
					frameTime: 1,
					sequence: [1]
				}
			},
			party: null,
			pgIdx: 0,

			highlightPos: {c: 0, r: 0},
			highlight: null,

			init: function(x, y, settings) {
				this.parent(x, y, settings);

				_zIndex = this.zIndex + 1;

				//todo: need to continue working on positioning
				this.highlight = ig.game.spawnEntity(devquest.ui.Highlight, 20, 20, {
					linkedTo: this,
					zIndex: _zIndex
				});

				this.renderPage();
			},

			die: function() {
				this.highlight.kill(true);
				this.renderPage(true);
				this.parent();
			},

			update: function() {
				if (ig.input.pressed('down')) {

				}
			},

			renderPage: function(clear) {

				var inv = this.party.inventory,
					cfg = _c.UI.MENU.CONSUMABLES,
					start = this.pgIdx * cfg.PAGE_SIZE,
					end = Math.min(start + cfg.PAGE_SIZE, inv.length),
					item = null, c = 0, r = 0,
					mod = devquest.utils.math.mod;

				for (var i = 0; i < inv.length; i++) {
					item = inv[i]
					if (!clear && (i >= start) && (i < end)) {
						console.log('spawning ' + i);
						this.renderItem(item, r, c);
						c = mod(c + 1, cfg.COLS);
						if (c === 0) r = mod(r + 1, cfg.ROWS);
					}
					else {
						console.log('removing ' + i);
						this.clearItem(item);
					}
				}
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