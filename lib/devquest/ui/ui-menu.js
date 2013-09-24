var devquest = devquest || {};
devquest.ui = devquest.ui || {};

ig.module(
		'devquest.ui.ui-menu'
	)
	.requires(
		'devquest.ui.equip',
		'devquest.ui.consumables'
	)
	.defines(function () {

		var _c = ig.CONFIG,
			_size = {x: 249, y: 345};

		devquest.ui.UIMenu = ig.global.UIMenu = ig.UIElement.extend({

			screen: null,
			screens: [],

			layerName: 'ui',
			size: _size,

			animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'menu-back.png', _size.x, _size.y),
			animSettings: {
				idle: {
					frameTime: 1,
					sequence: [0]
				}
			},

			initProperties: function() {
				this.parent();
				console.log('creating entity');
				this.screen = ig.game.spawnEntity(devquest.ui.Equip, 0, 0, {
					zIndex: this.zIndex + 1,
					linkedTo: this
				});
			},

			reposition: function ( force ) {
				this.parent();
				this.pos.y = 10;
			}

		});

	});