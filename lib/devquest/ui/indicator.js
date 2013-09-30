var devquest = devquest || {};
devquest.ui = devquest.ui || {};

ig.module(
		'devquest.ui.indicator'
	)
	.requires(
		'plusplus.ui.ui-element'
	)
	.defines(function () {

		var _c = ig.CONFIG,
			_size = {x: 24, y: 24};

		devquest.ui.Indicator = ig.global.Indicator = ig.UIElement.extend({

			layerName: 'ui',
			size: _size,
			animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'menu-indicator.png', _size.x, _size.y)

		});

	});