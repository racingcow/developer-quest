var devquest = devquest || {};
devquest.ui = devquest.ui || {};

ig.module(
		'devquest.ui.equip'
	)
	.requires(
		'devquest.utils.vect',
		'devquest.ui.ui-menu-screen',
		'devquest.ui.ui-dummy',
		'devquest.ui.ui-item-text'
	)
	.defines(function () {

		var GRD_SZ_INV_X = 2,
			GRD_SZ_INV_Y = 4,
			GRD_SZ_EQP_X = 1,
			GRD_SZ_EQP_Y = 4,
			_c = ig.CONFIG,
			_cfgGrd = _c.UI.ITEMGRID;

		devquest.ui.Equip = ig.global.Equip = devquest.ui.UIMenuScreen.extend({

			name: 'equip.',
			inventoryGrid: null,

			animSheet: null,
			animSettings: false,

			itemText: null,

			init: function(x, y, settings) {

				this.parent(x, y, settings);

				this.itemText = ig.game.spawnEntity(devquest.ui.UIItemText, 0, 0, {
					name: this.name + '-uiitemtext',
					linkedTo: this, 
					margin: {
						x: _cfgGrd.SPACING_X,
						y: 0
					}
				});

				//left grid for equippable inventory
				this.grdInv = (settings && settings.inventoryGrid) || ig.game.spawnEntity(devquest.ui.UIItemGrid, 0, 0, {
					name: this.name + '-inventory-grid',
					linkedTo: this,
					itemEvent: this.onConsumableEvent,
					items: this.party.inventory,
					grdSz: {
						x: GRD_SZ_INV_X,
						y: _c.PARTY.INVENTORY_SIZE / GRD_SZ_INV_X,
					},
					grdSzPg: {
						x: GRD_SZ_INV_X,
						y: GRD_SZ_INV_Y
					},
					isGrdCur: true,
					onItemChanged: this.onItemChanged
				});

				this.itemText.margin.y = this.grdInv.size.y;

				//left/right-side equip slots
				var grdInvW = this.grdInv.size.x;
				this.initEqpGrid('grdEqpL', { x: grdInvW, y: 0 }, settings);
				this.initEqpGrid('grdEqpR', { x: this.size.x - _cfgGrd.SPACING_X * 2 - _cfgGrd.TILE_SIZE_X, y: 0 }, settings);

				this.grdInv.linkToGrid(this.grdEqpL, devquest.utils.vect.DIRECTION.RIGHT);
				this.grdEqpL.linkToGrid(this.grdEqpR, devquest.utils.vect.DIRECTION.RIGHT);

				this.dummy = (settings && settings.dummy) || ig.game.spawnEntity(devquest.ui.UIDummy, 0, 0, {
					name: this.name + '-dummy',
					linkedTo: this,
					margin: {
						x: this.grdInv.size.x + this.grdEqpL.size.x - _cfgGrd.SPACING_X,
						y: _cfgGrd.SPACING_Y
					}
				});

			},

			die: function() {
				this.itemText.kill();
				this.dummy.kill();
				this.grdEqpR.kill();
				this.grdEqpL.kill();
				this.grdInv.kill();
				this.parent();
			},

			initEqpGrid: function(grdName, margin, settings) {

				this[grdName] = (settings && settings[grdName]) || ig.game.spawnEntity(devquest.ui.UIItemGrid, 0, 0, {
					name: this.name + '-' + grdName,
					linkedTo: this,
					itemEvent: this.onConsumableEvent,
					items: [],
					grdSz: {
						x: GRD_SZ_EQP_X,
						y: 4 / GRD_SZ_EQP_X, //TODO: replace with const or read from player equip slots or something
					},
					grdSzPg: {
						x: GRD_SZ_EQP_X,
						y: GRD_SZ_EQP_Y
					},
					margin: margin,
					isGrdCur: false,
					onItemChanged: this.onItemChanged
				});

			},

			onItemChanged: function(itemIdx) {

				if (itemIdx < 0) return;

				var item = this.party.inventory[itemIdx];
				this.itemText.setItem(item);
			}

		});

	});