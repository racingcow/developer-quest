var devquest = devquest || {};
devquest.ui = devquest.ui || {};

ig.module(
		'devquest.ui.consumables'
	)
	.requires(
		'devquest.utils.math',
		'devquest.ui.ui-menu-screen',
		'devquest.ui.indicator',
		'devquest.ui.scroll-handle',
		'devquest.ui.ui-item-grid'
	)
	.defines(function () {
		'use strict';

		var _c = ig.CONFIG,
			_cfg = _c.UI.ITEMGRID;

		devquest.ui.Consumables = ig.global.Consumables = devquest.ui.UIMenuScreen.extend({

			name: 'consumables',
			party: null,
			itemGrid: null,

			init: function(x, y, settings) {

				this.parent(x, y, settings);

				this.itemGrid = ig.game.spawnEntity(devquest.ui.UIItemGrid, 0, 0, {
					name: 'inventory-grid',
					linkedTo: this,
					itemEvent: this.onConsumableEvent,
					items: this.party.inventory
				});

			},

			die: function() {
				this.itemGrid.kill();
				this.parent();
			},

			onConsumableEvent: function(src, dest) {
				console.log('onConsumableEvent');
			}

		});

	});