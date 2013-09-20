var devquest = devquest || {};
devquest.ui = devquest.ui || {};

ig.module(
		'devquest.ui.ui-menu'
	)
	.requires(
		'plusplus.ui.ui-overlay-pause'
	)
	.defines(function () {

		var _c = ig.CONFIG,
			_size = {x: 180, y: 256};

		devquest.ui.UIMenu = ig.global.UIMenu = ig.UIElement.extend(/**@lends ig.UIOverlayPause.prototype */{

			layerName: 'ui',
			size: _size,

			animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'menu.png', _size.x, _size.y),
			animSettings: {
				idle: {
					frameTime: 1,
					sequence: [0]
				}
			}

		});

	});