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
            	CAN_FLIP_Y: false
            },

            //fullscreen
            GAME_WIDTH_PCT: 1,
            GAME_HEIGHT_PCT: 1,

            //viewport
            GAME_WIDTH_VIEW: 300,
            GAME_HEIGHT_VIEW: 100,

            /**
             * Camera flexibility and smoothness. This helps with motion sickness.
             */
            CAMERA: {
				KEEP_CENTERED: false,
				LERP: 0.025,
                BOUNDS_PCT_MINX: -0.2,
                BOUNDS_PCT_MINY: -0.3,
                BOUNDS_PCT_MAXX: 0.2,
                BOUNDS_PCT_MAXY: 0.3
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
            	REACTION_DISTANCE: 100,
            	REACTION_DELAY: 1,
            	CAN_LEARN_PREDATORS: false,
            	CAN_FLEE: true,
            	FLEE_HEALTH_PCT: 0.1,
            	TETHER_DISTANCE: 500,
            	CAN_WANDER: true,
            	WANDER_SWITCH_CHANCE: 0.005,
            	WANDER_SWITCH_CHANCE_STOPPED: 0.01
            },
            FPS: 60

        };

    });