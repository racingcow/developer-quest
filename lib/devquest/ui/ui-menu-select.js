var devquest = devquest || {};
devquest.ui = devquest.ui || {};

ig.module(
		'devquest.ui.select'
	)
	.requires(
		'plusplus.ui.indicator'
	)
	.defines(function () {

		devquest.ui.Select = ig.global.Select = dequest.ui.Indicator.extend({

			animSettings: {
				idle: {
					frameTime: 1,
					sequence: [1]
				}
			}

		});

	});