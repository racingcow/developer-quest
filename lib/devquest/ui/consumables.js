var devquest = devquest || {};
devquest.ui = devquest.ui || {};

ig.module(
		'devquest.ui.consumables'
	)
	.requires(
		'devquest.ui.ui-menu-screen'
	)
	.defines(function () {

		devquest.ui.Consumables = ig.global.Consumables = devquest.ui.UIMenuScreen.extend({

			animSettings: {
				idle: {
					frameTime: 1,
					sequence: [0]
				}
			}

		});

	});