var devquest = devquest || {};
devquest.actions = devquest.actions || {};

ig.module(
		'devquest.actions.move'
	)
	.requires(
	)
	.defines(function () {
		"use strict";

	//reasons that an entity would be moving
	devquest.actions.move = {
		NONE: {		//Not currently moving
			val: 0,
			passive: true
		},
		PATROL: {	//Moving in predefined pattern
			val: 1,	
			passive: true
		},
		CHASE: {	//Attempting to intercept entity
			val: 2,
			passive: false
		},
		FLEE: {		//Attempting to get away from entity
			val: 3,
			passive: false
		}
	};
});