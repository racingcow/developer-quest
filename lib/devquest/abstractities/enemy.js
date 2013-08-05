var devquest = devquest || {};
devquest.abstractities = devquest.abstractities || {};

ig.module(
        'devquest.abstractities.enemy'
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
        'plusplus.abstractities.character',
        'plusplus.abilities.melee',
        'plusplus.abstractities.creature',
        'devquest.abstractities.character',
        'devquest.actions.move'
    )
    .defines(function () {
        "use strict";

        var _c = ig.CONFIG;
        var _ut = ig.utils;
        var _utm = ig.utilsmath;
        var _utv = ig.utilsvector2;

        devquest.abstractities.Enemy = ig.Creature.extend({

			groupPrey: ig.EntityExtended.GROUP.FRIEND,
			moveToRandomSettings: {
				avoidUngrounded: false
			},

			initProperties: function() {
				this.parent();

				//TODO: MAKE A CUSTOM MELEE CLASS
				//it should work in 2 dimensions, have knockback, better effect, etc.
				this.melee = new ig.AbilityMelee(this);
				this.melee.damage = 1;
				this.melee.rangeY = _c.CHARACTER.SIZE_EFFECTIVE_X * 1.5;
				this.melee.faceTarget = false;
				this.abilities.addDescendant(this.melee);

			},

			updateWander: function () {

				if ( this.canWander && !this.tethering && !this.entityPrey && !this.entityPredator ) {

					this.wandering = true;

					// direction can switch by chance or when close enough to edge of tether
					var wanderSwitchChanceX = this.wanderDirection.x === 0 ? this.wanderSwitchChanceStopped : this.wanderSwitchChance,
						wanderSwitchChanceY = this.wanderDirection.y === 0 ? this.wanderSwitchChanceStopped : this.wanderSwitchChance;

					var rndX = Math.random();
					var rndY = Math.random();
					if ( this.moveToUnsafe ) {
						this.wanderDirection.x = -this.wanderDirection.x || 1;
						this.wanderDirection.y = -this.wanderDirection.y || 1;
					}
					else if ((wanderSwitchChanceX > 0 && rndX < wanderSwitchChanceX)
						|| (wanderSwitchChanceY > 0 && rndX < wanderSwitchChanceY)) {

						if (wanderSwitchChanceX > 0 && rndX < wanderSwitchChanceX) {
							this.wanderDirection.x = Math.round( rndX * 2 - 1 );
						}
						if (wanderSwitchChanceY > 0 && rndY < wanderSwitchChanceY) {
							this.wanderDirection.y = Math.round( rndY * 2 - 1 );
						}

					}
					else if ( this.tetherDistance > 0 && this.entityTether ) {

						var tetherCenterX = this.entityTether.bounds.minX + this.entityTether.bounds.width * 0.5;
						if ( tetherCenterX - this.tetherDistance >= this.bounds.minX ) {
							this.wanderDirection.x = 1;
						}
						else if ( tetherCenterX + this.tetherDistance <= this.bounds.maxX ) {
							this.wanderDirection.x = -1;
						}

						var tetherCenterY = this.entityTether.bounds.minY + this.entityTether.bounds.height * 0.5;
						if ( tetherCenterY - this.tetherDistance >= this.bounds.minY ) {
							this.wanderDirection.y = 1;
						}
						else if ( tetherCenterY + this.tetherDistance <= this.bounds.maxY ) {
							this.wanderDirection.y = -1;
						}
					}

					// no wander direction
					if ( this.wanderDirection.x === 0 && this.wanderDirection.y === 0 ) {
						this.moveToStop();
					}
					// has direction
					else {
						if ( this.wanderDirection.x === 0 ) {
							this.moveToHereHorizontal();
						}
						else if ( this.wanderDirection.y === 0 ) {
							this.moveToHereVertical();
						}
						this.wanderPos.x = this.bounds.minX + this.bounds.width * 0.5 + this.bounds.width * 2 * this.wanderDirection.x;
						this.wanderPos.y = this.bounds.minY + this.bounds.height * 0.5 + this.bounds.height * 2 * this.wanderDirection.y;
						this.moveTo( this.wanderPos, this.moveToRandomSettings );
					}
				}
				else {
					this.wandering = false;
				}
			},

            updateFacing: function() {

                var vel = _utv.vector(this.vel.x, this.vel.y),                    
                    dir = _utv.directionToString(vel).toLowerCase(),
                    absVel = _utv.abs(vel);                

                //figure out animation to use if angular animations aren't present
                if (!this.anims[dir]) {
                    if (dir === 'upleft') {
                        this.currentAnim = (absVel.x > absVel.y) ? this.anims.left : this.anims.up;
                    }
                    else if (dir === 'upright') {
                        this.currentAnim = (absVel.x > absVel.y) ? this.anims.right : this.anims.up;
                    }
                    else if (dir === 'downleft') {
                        this.currentAnim = (absVel.x > absVel.y) ? this.anims.left : this.anims.down;
                    }
                    else if (dir === 'downright') {
                        this.currentAnim = (absVel.x > absVel.y) ? this.anims.right : this.anims.down;
                    }
                    else if (this.anims.idle) {
                        this.currentAnim = this.anims.idle;
                    }
                }
                else {
                    this.currentAnim = this.anims[dir];
                }
            }

        });
    });