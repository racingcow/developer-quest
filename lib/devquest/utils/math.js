var devquest = devquest || {};
devquest.utils = devquest.utils || {};

ig.module(
		'devquest.utils.math'
	)
	.defines(function () {
		"use strict";

		devquest.utils.math = devquest.utils.math || {};

		//adds a real modulo method that will handle negative numbers correctly
		//(as opposed to 'remainder' function - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#.25_.28Modulus.29)
		//a bit faster than adding to Number.prototype, which would interpret params as objects
		devquest.utils.math.mod = function(n, m) {
			return ((m % n) + n) % n;
		}
	});