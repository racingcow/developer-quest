var devquest = devquest || {};
devquest.ui = devquest.ui || {};

ig.module(
		'devquest.ui.ui-item-text'
	)
	.requires(
		'plusplus.ui.ui-element',
		'devquest.ui.ui-element-dq'
	)
	.defines(function () {
		'use strict';

		var _c = ig.CONFIG,
			_cfgGrd = _c.UI.ITEMGRID;

		devquest.ui.UIItemText = ig.global.UIItemText = devquest.ui.DQUIElement.extend({

			init: function(x, y, settings) {

				this.parent(x, y, settings);

				this.size = {
					x: this.linkedTo.size.x - _cfgGrd.SPACING_X * 2,
					y: 40
				};

				this.friendlyName = ig.game.spawnEntity(ig.UIText, 0, 0, {
					font: ig.Font.FONTS.MENU_SMALL,
					text: 'item text',
					zIndex: this.zIndex + 1,
					linkedTo: this,
					linkAlignInside: true,
					linkAlign: {x: -1, y: -1},
					size: {
						x: this.size.x,
						y: 8
					},
					maxWidth: this.size.x,
					maxHeight: 8,
					textAlign: ig.Font.ALIGN.LEFT
				});

				this.description = ig.game.spawnEntity(ig.UIText, 0, 0, {
					font: ig.Font.FONTS.MENU_SMALL,
					text: 'description',
					zIndex: this.zIndex + 1,
					linkedTo: this,
					linkAlignInside: true,
					linkAlign: {x: -1, y: -1},
					marginAsPct: false,
					marginScaleless: false,
					margin: {
						x: 0,
						y: this.friendlyName.size.y
					},
					size: {
						x: this.size.x,
						y: this.friendlyName.size.y
					},
					maxWidth: this.size.x,
					maxHeight: this.friendlyName.size.y,
					textAlign: ig.Font.ALIGN.LEFT
				});

				this.flavorText = ig.game.spawnEntity(ig.UIText, 0, 0, {
					font: ig.Font.FONTS.MENU_SMALL,
					text: 'flavor text',
					zIndex: this.zIndex + 1,
					linkedTo: this,
					linkAlignInside: true,
					linkAlign: {x: -1, y: -1},
					marginAsPct: false,
					marginScaleless: false,
					margin: {
						x: 0,
						y: this.friendlyName.size.y + this.description.size.y
					},
					size: {
						x: this.size.x,
						y: this.friendlyName.size.y * 4
					},
					maxWidth: this.size.x,
					maxHeight: this.friendlyName.size.y * 4,
					textAlign: ig.Font.ALIGN.LEFT
				});
			},

			die: function() {
				this.parent();
				this.flavorText.kill();
				this.description.kill();
				this.friendlyName.kill();
			},

			setItem: function(item) {

				var cleanItem = item || {friendlyName: '', flavorText: '', description: ''};

				this.setText(this.friendlyName, cleanItem.friendlyName);
				this.setText(this.flavorText, cleanItem.flavorText);
				this.setText(this.description, cleanItem.description);
			},

			setText: function(uiText, text) {

				uiText.visible = text || false;

				if (!text) return;

				console.log('set text to ' + text);
				uiText.text = text;
				//uiText.refresh();
			}

		});

	});