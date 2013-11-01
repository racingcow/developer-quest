var devquest = devquest || {};
devquest.ui = devquest.ui || {};

ig.module(
		'devquest.ui.ui-button-arrow'
	)
	.requires(
		'plusplus.ui.ui-element',
		'devquest.ui.direction'
	)
	.defines(function () {
		'use strict';

		var _c = ig.CONFIG,
			_cfg = _c.UI.BUTTONARROW || {
			};

		devquest.ui.UIButtonArrow = ig.global.UIButtonArrow = UIElement.extend({

			animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'ui-button-arrow.png', _cfg.SIZE_X, _cfg.SIZE_Y),
			animSettings: true,

			direction: devquest.ui.direction.north,

			linkedTo: null,

			marginAsPct: false,
			marginScaleless: false,

			linkAlignInside: true,
			linkAlign: {x: -1, y: -1},

			init: function(x, y, settings) {

				this.parent(x, y, settings);

				//console.log('ButtonArrow:init');

				if (!settings || !settings.direction) {
					console.warn('UIButtonArrow.direction is set to unspecified. Using "north" as default direction.');
				}

				if (!settings || !settings.linkedTo) {
					console.warn("UIButtonArrow is not linkedTo any parent UIElement. This may cause unintended behavior if certain properties are not set via init settings.");
				}

				if (settings) {
					if (settings.linkedTo) this.zIndex = settings.linkedTo.zIndex + 1;
					this.size.x = settings.size && settings.size.x ? settings.size.x : _cfg.SIZE_X;
					this.size.y = settings.size && settings.size.y ? settings.size.y : _cfg.SIZE_Y;
					if (settings.direction) this.direction = settings.direction;
				}

				this.angle = Math.max(this.direction - 1, 0) * (Math.PI / 2);

			}

		});

	});