var devquest = devquest || {};
devquest.ui = devquest.ui || {};

ig.module(
		'devquest.ui.highlight'
	)
	.requires(
		'devquest.ui.indicator'
	)
	.defines(function () {
		'use strict';

		devquest.ui.Highlight = ig.global.Highlight = devquest.ui.Indicator.extend({

			animSettings: {
				idle: {
					frameTime: 1,
					sequence: [0]
				}
			}

		});

	});