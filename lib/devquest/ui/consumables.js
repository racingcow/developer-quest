var devquest = devquest || {};
devquest.ui = devquest.ui || {};

ig.module(
		'devquest.ui.consumables'
	)
	.requires(
		'devquest.utils.math',
		'devquest.ui.ui-menu-screen',
		'devquest.ui.indicator',
		'devquest.ui.ui-scroll-thumb',
		'devquest.ui.ui-item-grid'
	)
	.defines(function () {
		'use strict';

		var _c = ig.CONFIG,
			_cfg = _c.UI.ITEMGRID;

		devquest.ui.Consumables = ig.global.Consumables = devquest.ui.UIMenuScreen.extend({

			name: 'inv.',
			party: null,
			itemGrid: null,

			init: function(x, y, settings) {

				this.parent(x, y, settings);

				this.itemText = ig.game.spawnEntity(devquest.ui.UIItemText, 0, 0, {
					name: this.name + '-uiitemtext',
					linkedTo: this, 
					margin: {
						x: _cfg.SPACING_X,
						y: 0
					}
				});

				this.itemGrid = ig.game.spawnEntity(devquest.ui.UIItemGrid, 0, 0, {
					name: 'inventory-grid',
					linkedTo: this,
					itemEvent: this.onConsumableEvent,
					items: this.party.inventory,
					onItemChanged: this.onItemChanged
				});

				this.itemText.margin.y = this.itemGrid.size.y;

			},

			die: function() {
				this.itemGrid.kill();
				this.itemText.kill();
				this.parent();
			},

			onConsumableEvent: function(idxSrc, idxDest) {

				var inv = this.party.inventory,
					src = inv[idxSrc],
					dest = inv[idxDest];

				if (src && dest) {
					this.consume(src);
				}
				else {
					this.swap(idxSrc, idxDest);
				}

			},

			consume: function(consumable) {

				consumable.consume(this.party.players[this.party.curPlayerIdx]);

				var inv = this.party.inventory,
					idxInv = inv.indexOf(consumable);
				inv[idxInv].kill();
				inv[idxInv] = null;

			},

			swap: function(idx1, idx2) {

				var inv = this.party.inventory

				var tmp = inv[idx1];
				inv[idx1] = inv[idx2];
				inv[idx2] = tmp;

			},

			onItemChanged: function(itemIdx) {

				if (itemIdx < 0) return;

				var item = this.party.inventory[itemIdx];
				this.itemText.setItem(item);
			}

		});

	});