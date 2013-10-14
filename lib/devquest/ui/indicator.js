var devquest = devquest || {};
devquest.ui = devquest.ui || {};

ig.module(
		'devquest.ui.indicator'
	)
	.requires(
		'plusplus.ui.ui-element'
	)
	.defines(function () {
		'use strict';

		var _c = ig.CONFIG,
			_size = {x: _c.UI.MENU.INDICATOR_SIZE, y: _c.UI.MENU.INDICATOR_SIZE};

		devquest.ui.Indicator = ig.global.Indicator = ig.UIElement.extend({

			layerName: 'ui',
			size: _size,
			animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'menu-indicator.png', _size.x, _size.y),
			animSettings: {
				idle: {
					frameTime: 1
				}
			},

			marginAsPct: false,
			marginScaleless: false,

			linkAlignInside: true,
			linkAlign: {x: -1, y: -1}

		});

	});