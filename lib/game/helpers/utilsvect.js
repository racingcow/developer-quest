//extends some of the impact++ vector utility methods and objects
var devquest = devquest || {};
devquest.utilsvect = devquest.utilsvect || {};

ig.module(
        'game.helpers.utilsvect'
    )
	.requires(        
		//just so plusplus.helpers.utilstile doesn't get loaded after me and clobber the ig.utilstile namespace
        'plusplus.helpers.utilsvector2' 
    )
    .defines(function () {
        "use strict";

        var createDirection = function() {
            var dirs = {};
            for (var i in ig.utilsvector2.DIRECTION) {
                var dir = {
                    vect: ig.utilsvector2.DIRECTION[i],
                    name: i
                };
                dirs[i] = dir;
            }
            return dirs;
        };
        
        
        
        //adds a name property to each direction vector (makes some code cleaner when updating facing/direction)
        devquest.utilsvect.DIRECTION = createDirection();
        ;
	});