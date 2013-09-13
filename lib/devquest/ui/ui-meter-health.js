var devquest = devquest || {};
devquest.ui = devquest.ui || {};

ig.module(
		'devquest.ui.ui-meter-health'
	)
	.requires(
		'plusplus.ui.ui-meter'
	)
	.defines(function () {

		devquest.ui.UIMeterHealth = ig.UIMeter.extend({

			fillStyle: 'rgb(255,54,90)',
			margin: { x: 0.02, y: 0.02 },
			animSheet: new ig.AnimationSheet( 'media/UIMeterHealth.png', 32, 32 ),
			size: { x: 32, y: 32 },
			lerp: 0.8,
			bar: false,

			animSettings: {
				main: {
					sequence: [0,1,2,3,4,5,6,7,8,9,10,11]
				}
			},

			init: function() {
				this.parent();

				//craziness to force to default to 1
				this._valueTarget = 0;
				this.value = 0.5;
				this.setValue(0.9);

				//more craziness to force bar to false
				this.bar = false;
			}
		});
	});