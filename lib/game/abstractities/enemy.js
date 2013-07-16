ig.module(
        'game.abstractities.enemy'
    )
    .requires(
        'impact.game',
        'plusplus.core.config',
        'plusplus.core.timer',
        'plusplus.core.entity',
        'plusplus.core.hierarchy',
        'plusplus.entities.explosion',
        'plusplus.helpers.utils',
        'plusplus.helpers.utilsmath',
        'plusplus.helpers.utilsvector2',
        'plusplus.abstractities.character'
    )
    .defines(function () {
        "use strict";  

        var _c = ig.CONFIG;
        var _utm = ig.utilsmath;
        
        ig.Enemy = ig.Character.extend({
            
            performance: _c.KINEMATIC,
            gravityFactor: 0,            
            controllable: false, 

            init: function() {
                this.parent();

                this.seekTimer = new ig.Timer( 1 );
                this.seekPlayer();
            },

            update: function() {                
                this.parent();                
                if (this.seekTimer.delta() < 0) return;

                this.seekPlayer();

                this.seekTimer.reset();
            },            

            seekPlayer: function() {

                var player = ig.game.getEntitiesByType('EntityPlayer')[0];                
                this.moveToLocation({
                    x: player.pos.x,
                    y: player.pos.y
                });

            },

            moveToHere: function () {

                this.parent();

                this.vel.x = 0;
                this.vel.y = 0;
            },

            moveInDir: function(dx, dy, modX, modY) {

                this._movingToSpeed = true;                
                
                this.accel.x = (dx >= 0 ? 1 : -1) * modX || 1;
                this.accel.y = (dy >= 0 ? 1 : -1) * modY || 1;
            },
            
            moveToUpdate: function () {
                
                if (this.movingTo === true) {

                    var dx = this._moveToPos.x - this.pos.x,
                        dy = this._moveToPos.y - this.pos.y,
                        xEqual = _utm.almostEqual(dx, 0, 1),
                        yEqual = _utm.almostEqual(dy, 0, 1);

                    // at target position
                    if (xEqual && yEqual) {
                        this.movedTo = true;
                        this.moveToStop();                       
                    }                    

                    // otherwise move to target
                    else {
                        this.moveInDir(dx, dy, _c.CHARACTER.SPEED_X, _c.CHARACTER.SPEED_Y);
                    }

                    // check if stuck
                    if (this.movedTo !== true) {

                        if (_utm.almostEqual(this._moveToPosAt.x, this.pos.x, _c.PRECISION_ZERO) && _utm.almostEqual(this._moveToPosAt.y, this.pos.y, _c.PRECISION_ZERO)) {                            

                            this._moveToStuckFor += ig.system.tick;

                            // stuck for too long, stop trying

                            if (this._moveToStuckFor >= this.moveToStuckForThreshold) {

                                this.moveToStop();

                            }

                        }

                        // not stuck, update position at
                        else {
                            this._moveToStuckFor = 0;
                            this._moveToPosAt.x = this.pos.x;
                            this._moveToPosAt.y = this.pos.y;
                        }
                    }
                }
            }
            
        });
    });