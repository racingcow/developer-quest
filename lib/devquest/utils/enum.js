var devquest = devquest || {};
devquest.utils = devquest.utils || {};

ig.module(
		'devquest.utils.enum'
	)
	.defines(function () {
		"use strict";

		devquest.utils.enum = devquest.utils.enum || {};

		//searches an object for a particular property with a value, and returns the name of that property as a string
		devquest.utils.enum.nameFromVal = function(enumer, val) {
			for (var p in enumer) {
				if (enumer[p] === val) {
					return p;
				}
			}
			return null;
		}
	});