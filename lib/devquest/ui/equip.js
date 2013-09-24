var devquest = devquest || {};
devquest.ui = devquest.ui || {};

ig.module(
		'devquest.ui.equip'
	)
	.requires(
		'devquest.ui.ui-menu-screen'
	)
	.defines(function () {

		devquest.ui.Equip = ig.global.Equip = devquest.ui.UIMenuScreen.extend({

			animSettings: {
				idle: {
					frameTime: 1,
					sequence: [1]
				}
			}

		});

	});