var devquest = devquest || {};
devquest.ui = devquest.ui || {};

ig.module(
		'devquest.ui.ui-dummy'
	)
	.requires(
		'plusplus.ui.ui-element'
	)
	.defines(function () {
		'use strict';

		var _c = ig.CONFIG,
			_size = {x: 60, y: 80};

		devquest.ui.UIDummy = ig.global.UIDummy = ig.UIElement.extend({

			layerName: 'ui',
			size: _size,
			animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'menu-equip-dummy.png', _size.x, _size.y),
			animSettings: true,

			marginAsPct: false,
			marginScaleless: false,

			linkAlignInside: true,
			linkAlign: {x: -1, y: -1},

			init: function(x, y, settings) {
				this.parent(x, y, settings);
				if (this.linkedTo) this.zIndex = this.linkedTo.zIndex + 1;
			}

		});

	});