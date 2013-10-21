var devquest = devquest || {};
devquest.ui = devquest.ui || {};

ig.module(
		'devquest.ui.direction'
	)
	.defines(function () {
		"use strict";

		devquest.ui.direction = {
			unspecified: 0,
			north: 1,
			east: 2,
			south: 3,
			west: 4
		};
	});