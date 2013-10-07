var devquest = devquest || {};
devquest.ui = devquest.ui || {};

ig.module(
		'devquest.ui.ui-menu-screen'
	)
	.requires(
		'plusplus.ui.ui-element'
	)
	.defines(function () {

		var _c = ig.CONFIG,
			_size = {x: 192, y: 164},
			_offset = {x: 1, y: -37};

		devquest.ui.UIMenuScreen = ig.global.UIMenuScreen = ig.UIElement.extend({

			layerName: 'ui',
			size: _size,
			animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'menu-screens.png', _size.x, _size.y),
			party: null,
			marginAsPct: false,
			marginScaleless: false,

			reposition: function ( force ) {
				this.parent(force);
				this.pos.x += _offset.x;
				this.pos.y += _offset.y;
			}

		});

	});