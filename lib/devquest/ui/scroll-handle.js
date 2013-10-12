var devquest = devquest || {};
devquest.ui = devquest.ui || {};

ig.module(
		'devquest.ui.scroll-handle'
	)
	.requires(
		'plusplus.ui.ui-element'
	)
	.defines(function () {
		'use strict';

		var _c = ig.CONFIG,
			_size = {x: _c.UI.MENU.SCROLL_HANDLE_SIZE.x, y: _c.UI.MENU.SCROLL_HANDLE_SIZE.y};

		devquest.ui.ScrollHandle = ig.global.ScrollHandle = ig.UIElement.extend({

			layerName: 'ui',
			size: _size,
			animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'scroll-handle-consumables.png', _size.x, _size.y),
			animSettings: {
				idle: {
					frameTime: 1,
					sequence: [0]
				}
			},

			marginAsPct: false,
			marginScaleless: false,

			linkAlignInside: true,
			linkAlign: {x: -1, y: -1}

		});

	});