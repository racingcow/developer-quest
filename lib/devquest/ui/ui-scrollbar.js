var devquest = devquest || {};
devquest.ui = devquest.ui || {};

ig.module(
		'devquest.ui.ui-scrollbar'
	)
	.requires(
		'plusplus.ui.ui-element',
		'devquest.ui.ui-scroll-thumb',
		'devquest.ui.ui-button-arrow',
		'devquest.ui.direction'
	)
	.defines(function () {
		'use strict';

		var _c = ig.CONFIG,
			_cfg = _c.UI.SCROLLBAR,
			_cfgBA = _c.UI.BUTTONARROW,
			_cfgST = _c.UI.SCROLLTHUMB,
			_cfgIG = _c.UI.ITEMGRID;

		//note: only supports vertical orientation for now
		devquest.ui.UIScrollbar = ig.global.UIScrollbar = UIElement.extend({

			animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'ui-scrollbar.png', _cfg.TILE_SIZE_X, _cfg.TILE_SIZE_Y),
			animSettings: true,

			thumb: null,
			arrow1: null,
			arrow2: null,

			increments: undefined,
			increment: 0,

			linkedTo: null,

			marginAsPct: false,
			marginScaleless: false,

			linkAlignInside: true,
			linkAlign: {x: -1, y: -1},

			init: function(x, y, settings) {

				this.parent(x, y, settings);

				console.log('scrollbar:init');

				if (!settings || !settings.linkedTo) {
					console.warn("Scrollbar is not linkedTo any parent UIElement. This may cause unintended behavior if certain properties are not set via init settings.");
				}

				if (settings) {
					if (settings.linkedTo) {
						this.zIndex = settings.linkedTo.zIndex + 1;
						this.increments = settings.linkedTo.grdSz.y / settings.linkedTo.grdSzPg.y;
					}
					this.size.x = settings.size && settings.size.x ? settings.size.x : this.animSheet.width;
					this.size.y = settings.size && settings.size.y ? settings.size.y : settings.linkedTo.size.y;
					if (settings.increments) this.increments = settings.increments;
				}

				this.thumb = (settings && settings.thumb) || ig.game.spawnEntity(devquest.ui.UIScrollThumb, 0, 0, {
					name: this.name + '-scrollthumb',
					linkedTo: this,
					size: {
						x: _cfgST.TILE_SIZE_X,
						y: (this.size.y - _cfgIG.SPACING_Y - _cfgBA.SIZE_Y) / this.increments
					},
					margin: {
						x: (this.size.x - _cfgST.TILE_SIZE_X) / 2,
						y: _cfgBA.SIZE_Y
					},
					visible: this.visible
				});

				this.arrow1 = (settings && settings.arrow1) || ig.game.spawnEntity(devquest.ui.UIButtonArrow, 0, 0, {
					name: this.name + '-arrowbutton1',
					direction: devquest.ui.direction.north,
					linkedTo: this,
					visible: this.visible
				});

				this.arrow2 = (settings && settings.arrow2) || ig.game.spawnEntity(devquest.ui.UIButtonArrow, 0, 0, {
					name: this.name + '-arrowbutton2',
					direction: devquest.ui.direction.south,
					linkedTo: this,
					visible: this.visible,
					margin: {
						x: 0,
						y: this.size.y - _cfgBA.SIZE_Y
					}
				});

			},

			die: function() {
				this.arrow2.unlink();
				this.arrow2.kill();
				this.arrow1.unlink();
				this.arrow1.kill();
				this.thumb.unlink();
				this.thumb.kill();
				this.parent();
			},

			update: function() {
				this.thumb.margin.y = _cfgBA.SIZE_Y + (this.increment * this.thumb.size.y);
				this.thumb.refresh(true);
			},

			draw: function() {

				if (!this.visible) return;

				for (var y = 0; y < this.size.y - 2 * _cfgBA.SIZE_Y; y = y + this.animSheet.height) {
					this.anims['idle'].draw(
						this.posDraw.x + (this.size.x - _cfg.TILE_SIZE_X) / 2,
						this.posDraw.y + _cfgBA.SIZE_Y + y,
						this.scale,
						this.textured ? this : undefined
					);
				}

			}

		});

	});