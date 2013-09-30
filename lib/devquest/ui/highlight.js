var devquest = devquest || {};
devquest.ui = devquest.ui || {};

ig.module(
		'devquest.ui.highlight'
	)
	.requires(
		'plusplus.ui.indicator'
	)
	.defines(function () {

		devquest.ui.Highlight = ig.global.Highlight = dequest.ui.Indicator.extend({

			animSettings: {
				idle: {
					frameTime: 1,
					sequence: [0]
				}
			}

		});

	});