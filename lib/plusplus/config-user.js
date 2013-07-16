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
            SCALE: 3,
            CHARACTER: {
                //because this is a top-down game, 
                //impact++ always thinks character is flying
                FRICTION_UNGROUNDED_X: 500,
                FRICTION_UNGROUNDED_Y: 500,
                MAX_VEL_UNGROUNDED_X: 100,
                MAX_VEL_UNGROUNDED_Y: 100,
                MAX_VEL_GROUNDED_X: 100,
                MAX_VEL_GROUNDED_Y: 100,
                SPEED_X: 1000,
                SPEED_Y: 1000,
                JUMP_CONTROL: 1,
                JUMP_FORCE: 10
            },
            FPS: 60

        };

    });