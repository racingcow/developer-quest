var devquest = devquest || {};
devquest.consumables = devquest.consumables || {};

ig.module(
		'devquest.consumables.consumable'
	)
	.requires(
		'plusplus.ui.ui-element'
	)
	.defines(function () {
		'use strict';

		var _c = ig.CONFIG;

		devquest.consumables.Consumable = ig.global.Consumable = ig.UIElement.extend({

			friendlyName: '',
			flavorText: '',
			description: '',

			animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'consumables.png', 22, 22),
			animSettings: {
				idle: {
					frameTime: 0.1,
					sequence: [0]
				}
			},

			consume: function(player) {
			}

		});

	});