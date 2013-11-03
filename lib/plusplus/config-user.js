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
				SIZE_EFFECTIVE_MAX: 32,
				SIZE_OFFSET_X: 0,
				SIZE_OFFSET_Y: 0,
				OPAQUE_OFFSET: {
					left: 0,
					right: 0,
					top: 0,
					bottom: 0
				}
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
				CHAT_NAME: "font_04b03_black_8.png",
				//MENU_TITLE_NAME: "menu_title_couriernew_708e57_10.png",
				//MENU_TITLE_NAME: "menu_title_arial_708e57_12.png",
				MENU_TITLE_NAME: "font_menu_title_arial_708e57_10.png",
				MENU_NAME: "font_menu_arial_32494d_8_2.png",
				MENU_SMALL_NAME: "font_menu_arial_32494d_6_2.png",
				IGNORE_SYSTEM_SCALE: false
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

			PARTY: {
				INVENTORY_SIZE: 96
			},

			FPS: 60,

			UI: {
				CAN_FLIP_X: false,
				CAN_FLIP_Y: false,
				POS_AS_PCT: true,
				SCALE: 1,
				ITEMGRID: {
					COLS: 6,
					ROWS: 16,
					COLS_PER_PAGE: 6,
					ROWS_PER_PAGE: 4,
					SPACING_X: 5,
					SPACING_Y: 5,
					TILE_SIZE_X: 24,
					TILE_SIZE_Y: 24,
					SCROLL_SIZE_X: 3,
					SCROLL_SIZE_Y: 2
				},
				SCROLLBAR: {
					TILE_SIZE_X: 3,
					TILE_SIZE_Y: 2,
					WIDTH: 11
				},
				SCROLLTHUMB: {
					TILE_SIZE_X: 3,
					TILE_SIZE_Y: 1
				},
				BUTTONARROW: {
					SIZE_X: 11,
					SIZE_Y: 6
				},
				MENU: {
					CONSUMABLES: {
						ROWS_PER_PAGE: 4,
						COLS_PER_PAGE: 6,
						ROWS: 16,
						COLS: 6,
						SPACING: 5,
						SCROLLBAR_SIZE: {
							x: 3,
							y: 98
						},
						SCROLLBAR_POS: {
							x: 180,
							y: 11
						}
					},
					INDICATOR_SIZE: 24,
					SCROLL_HANDLE_SIZE: {x: 3, y: 24}
				}
			}

		};

	});