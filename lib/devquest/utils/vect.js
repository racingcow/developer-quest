//extends some of the impact++ vector utility methods and objects

var devquest = devquest || {};
devquest.utils = devquest.utils || {};

console.log('loading vect');

ig.module(
		'devquest.utils.vect'
		)
	.requires(
		//just so plusplus.helpers.utilstile doesn't get loaded after me and clobber the ig.utilstile namespace
		'plusplus.helpers.utilsvector2'
	)
	.defines(function () {
		"use strict";

		devquest.utils.vect = devquest.utils.vect || {};

		var createDirection = function() {
			var dirs = {};
			for (var i in ig.utilsvector2.DIRECTION) {

				var cur = ig.utilsvector2.DIRECTION[i];
				var dir = {
					vect: cur,
					name: i.toLowerCase(),
					axis: cur.x === 0 ? 'y' : 'x'
				};

				dirs[i] = dir;
			}

			for (var i in dirs) {
				var cur = dirs[i];
				for (var j in dirs) {
					var invCand = dirs[j]
					if (invCand.vect.x === -cur.vect.x && invCand.vect.y === -cur.vect.y) {
						dirs[i].inverseName = invCand.name;
						break;
					}
				}
			}

			return dirs;
		};

		//adds a name property to each direction vector (makes some code cleaner when updating facing/direction)
		devquest.utils.vect.DIRECTION = createDirection();
	});