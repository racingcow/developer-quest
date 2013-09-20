ig.module(
		'plusplus.config-user'
	)
	.defines(function () {

		/**
		 * User configuration of Impact++.
		 * <span class="alert alert-info"><strong>Tip:</strong> it is recommended to modify this configuration file!</span>
		 * @example
		 * // in order to add your own custom configuration to Impact++
		 * // edit the file defining ig.CONFIG_USER, 'plusplus/config-user.js'
		 * // ig.CONFIG_USER is never modified by Impact++ (it is strictly for your use)
		 * // ig.CONFIG_USER is automatically merged over Impact++'s config
		 * @static
		 * @readonly
		 * @memberof ig
		 * @namespace ig.CONFIG_USER
		 * @author Collin Hover - collinhover.com
		 **/
		ig.CONFIG_USER = {

			DEBUG: true,

			SCALE: 1,

			//top-down style game
			TOP_DOWN: true,
			ENTITY: {
				CAN_FLIP_X: false,
				CAN_FLIP_Y: false,
				HEALTH: 10,
				SIZE_X: 32,
				SIZE_Y: 32,
				SIZE_EFFECTIVE_X: 32,
				SIZE_EFFECTIVE_Y: 32,
				SIZE_EFFECTIVE_MIN: 32,
				SIZE_EFFECTIVE_MAX: 32
			},

			//fullscreen
			GAME_WIDTH_PCT: 1,
			GAME_HEIGHT_PCT: 1,

			//viewport
			GAME_WIDTH_VIEW: 320,
			GAME_HEIGHT_VIEW: 240,

			/**
			 * Camera flexibility and smoothness. This helps with motion sickness.
			 */
			CAMERA: {
				KEEP_CENTERED: false,
				LERP: 0.025,
				BOUNDS_PCT_MINX: -0.2,
				BOUNDS_PCT_MINY: -0.3,
				BOUNDS_PCT_MAXX: 0.2,
				BOUNDS_PCT_MAXY: 0.3,
				AUTO_FOLLOW_PLAYER: true
			},

			/**
			 * Special fonts and text should always be the same scale.
			 */
			FONT: {
				MAIN_NAME: "font_04b03_white_16.png",
				ALT_NAME: "font_04b03_white_8.png",
				CHAT_NAME: "font_04b03_black_8.png"
			},

			CREATURE: {
				CAN_FLEE: true,
				CAN_LEARN_PREDATORS: false,
				CAN_WANDER_X: true,
				CAN_WANDER_Y: true,
				FLEE_HEALTH_PCT: 0.1,
				NEEDS_LINE_OF_SIGHT_PREY: true,
				REACTION_DISTANCE: 100,
				REACTION_DELAY: 1,
				TETHER_DISTANCE: 500,
				WANDER_SWITCH_CHANCE: 0.005,
				WANDER_SWITCH_CHANCE_STOPPED: 0.01
			},

			CHARACTER: {
				SPEED_X: 150,
				SPEED_Y: 150,
				HEALTH: 100
			},

			FPS: 60,

			UI: {
				CAN_FLIP_X: false,
				CAN_FLIP_Y: false,
				POS_AS_PCT: true,
				SCALE: 1
			}

		};

	});