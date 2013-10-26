var devquest = devquest || {};
devquest.ui = devquest.ui || {};

ig.module(
		'devquest.ui.ui-scroll-thumb'
	)
	.requires(
		'plusplus.ui.ui-element'
	)
	.defines(function () {
		'use strict';

		var _c = ig.CONFIG,
			_cfg = _c.UI.SCROLLTHUMB;

		devquest.ui.UIScrollThumb = ig.global.UIScrollThumb = UIElement.extend({

			animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'ui-scroll-thumb.png', _cfg.TILE_SIZE_X, _cfg.TILE_SIZE_Y),
			animSettings: true,

			linkedTo: null,

			marginAsPct: false,
			marginScaleless: false,

			linkAlignInside: true,
			linkAlign: {x: -1, y: -1},

			init: function(x, y, settings) {

				this.parent(x, y, settings);

				console.log('UIScrollThumb:init');

				if (!settings || !settings.linkedTo) {
					console.warn("UIScrollThumb is not linkedTo any parent UIElement. This may cause unintended behavior if certain properties are not set via init settings.");
				}

				if (settings) {
					if (settings.linkedTo) this.zIndex = settings.linkedTo.zIndex + 1;
					this.size.x = settings.size && settings.size.x ? settings.size.x : _cfg.TILE_SIZE_X;
					this.size.y = settings.size && settings.size.y ? settings.size.y : _cfg.TILE_SIZE_Y;
				}

			},

			draw: function() {

				if (!this.visible) return;

				for (var y = 0; y < this.size.y; y = y + this.animSheet.height) {
					this.anims['idle'].draw(
						this.posDraw.x,
						this.posDraw.y + y,
						this.scale,
						this.textured ? this : undefined
					);
				}
			}

		});

	});