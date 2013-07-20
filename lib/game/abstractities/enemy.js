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
        var _ut = ig.utils;
        var _utm = ig.utilsmath;
        var _utv = ig.utilsvector2;
        
        ig.Enemy = ig.Character.extend({

            collides: ig.Entity.COLLIDES.ACTIVE,
            performance: _c.KINEMATIC,
            gravityFactor: 0,            
            controllable: false,
            trackingFrequencyInSec: 1,

            damageSettings: {
                spawnCountMax: _c.CHARACTER.EXPLODING_DAMAGE_PARTICLE_COUNT,
                spawnSettings: {
                    animTileOffset: ig.EntityParticleColor.colorOffsets.GRAY
                }
            },
            deathSettings: {
                spawnCountMax: _c.CHARACTER.EXPLODING_DEATH_PARTICLE_COUNT,
                spawnSettings: {
                    animTileOffset: ig.EntityParticleColor.colorOffsets.GRAY
                }
            },
            animSettings: {
                left: {
                    frameTime: 0.1,
                    sequence: [3,4,5,4]
                },                
                right: {
                    frameTime: 0.1,
                    sequence: [6,7,8,7]
                },
                up: {
                    frameTime: 0.1,
                    sequence: [9,10,11,10]
                },                
                down: {
                    frameTime: 0.1,
                    sequence: [0,1,2,1]
                }
            },  

            //TODO: LOOK AT REPLACING THESE WITH SETTINGS
            maxVelUngrounded: {x: 50, y:50},
            frictionUngrounded: {x: 0, y:0},                        
            speed: {x: 50, y:50},

            initTypes: function () {

                this.parent();

                _ut.addType(ig.EntityExtended, this, 'type', "DAMAGEABLE");

            },

            init: function() {
                this.parent();

                this.seekTimer = new ig.Timer( this.trackingFrequencyInSec );
                this.seekPlayer();
            },

            update: function() {                
                this.parent();

                this.updateFacing.call(this);

                if (this.seekTimer.delta() < 0) return;

                this.seekPlayer();

                this.seekTimer.reset();
            },     

            updateFacing: function() {

                var vel = _utv.vector(this.vel.x, this.vel.y),                    
                    dir = _utv.directionToString(vel),
                    absVel = _utv.abs(vel);                

                //figure out animation to use if angular animations aren't present
                if (!this.anims[dir]) {
                    if (dir === 'UPLEFT') {
                        this.currentAnim = (absVel.x > absVel.y) ? this.anims.left : this.anims.up;
                    }
                    else if (dir === 'UPRIGHT') {
                        this.currentAnim = (absVel.x > absVel.y) ? this.anims.right : this.anims.up;
                    }
                    else if (dir === 'DOWNLEFT') {
                        this.currentAnim = (absVel.x > absVel.y) ? this.anims.left : this.anims.down;
                    }
                    else if (dir === 'DOWNRIGHT') {
                        this.currentAnim = (absVel.x > absVel.y) ? this.anims.right : this.anims.down;
                    }
                    else if (this.anims.idle) {
                        this.currentAnim = this.anims.idle;
                    }
                }
                else {
                    this.currentAnim = this.anims[dir];
                }
            },

            moveInDir: function(dx, dy, modX, modY) {

                this._movingToSpeed = true;
                
                this.accel.x = dx = 0 ? dx : (dx > 0 ? 1 : -1) * (modX || 1);
                this.accel.y = dy = 0 ? dy : (dy > 0 ? 1 : -1) * (modY || 1);
            },       

            seekPlayer: function() {

                var player = ig.game.getEntitiesByType('EntityPlayer')[0];
                
                //console.log('moving to { ' + player.pos.x + ', ' + player.pos.y + '}');

                this.moveToLocation({
                    x: player.pos.x,
                    y: player.pos.y
                });                
            
            },

            moveToHere: function () {

                //console.log('moveToHere');

                this.parent();

                this.vel.x = 0;
                this.vel.y = 0;
            },            
            
            moveToUpdate: function () {
                
                if (this.movingTo === true) {

                    var dx = this._moveToPos.x - this.pos.x,
                        dy = this._moveToPos.y - this.pos.y,
                        xEqual = _utm.almostEqual(dx, 0, 32),
                        yEqual = _utm.almostEqual(dy, 0, 32);

                    // at target position
                    if (xEqual && yEqual) {
                        this.movedTo = true;
                        this.moveToStop();                       
                    }                    

                    // otherwise move to target
                    else {
                        this.moveInDir.call(this, dx, dy, _c.CHARACTER.SPEED_X, _c.CHARACTER.SPEED_Y);
                    }

                    // check if stuck
                    if (this.movedTo !== true) {

                        if (_utm.almostEqual(this._moveToPosAt.x, this.pos.x, _c.PRECISION_ZERO) && _utm.almostEqual(this._moveToPosAt.y, this.pos.y, _c.PRECISION_ZERO)) {                            

                            this._moveToStuckFor += ig.system.tick;

                            // stuck for too long, stop trying

                            if (this._moveToStuckFor >= this.moveToStuckForThreshold) {

                                //console.log('stuck. stopping');
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