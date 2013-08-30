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
		'plusplus.helpers.pathfinding',
		'devquest.abstractities.character',
		'devquest.actions.move'
	)
	.defines(function () {
		"use strict";

		var _c = ig.CONFIG;
		var _ut = ig.utils;
		var _utm = ig.utilsmath;
		var _utv = ig.utilsvector2;
		var _pf = ig.pathfinding;

		devquest.abstractities.Enemy = ig.Creature.extend({

			accel: {
				x: 100,
				y: 100
			},
			controllable: false,
			collides: ig.Entity.COLLIDES.ACTIVE,
			//performance: _c.KINEMATIC, 
			gravityFactor: 0,

			damageSettings: {
				spawnSettings: {
					animTileOffset: ig.EntityParticleColor.colorOffsets.GRAY
				}
			},
			deathSettings: {
				spawnSettings: {
					animTileOffset: ig.EntityParticleColor.colorOffsets.GRAY
				}
			},

			/*
			moveToPreySettings: {
				simple: false,
				unsafe: true,
				avoidUngrounded: false,
				alwaysKeepFirst: true,
				tween: true
			},
			*/
			
			animSettings: {
				moveLeft: {
					frameTime: 0.1,
					sequence: [3,4,5,4]
				},
				moveRight: {
					frameTime: 0.1,
					sequence: [6,7,8,7]
				},
				moveUp: {
					frameTime: 0.1,
					sequence: [9,10,11,10]
				},
				moveDown: {
					frameTime: 0.1,
					sequence: [0,1,2,1]
				}
			},

			//TODO: LOOK AT REPLACING THESE WITH SETTINGS
			frictionUngrounded: {x: 0, y:0},
			maxVelUngrounded: {x: 150, y:150},
			speed: {x: 150, y:150},
			preyGroup: ig.EntityExtended.GROUP.FRIEND,
			size: {x:16,y:32},
			offset:{x:8,y:0},
			/*
			activated: true,						
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
			moveToLeft: function (mod) { 
				this.parent();
				this.flip.x = false;
			},

			moveToUpdate: function() {
				this.parent();
				this.updateFacing();
			},
			

			updateFacing: function() {

				var vel = _utv.vector(this.vel.x, this.vel.y),					
					dir = _utv.directionToString(vel).toLowerCase(),
					absVel = _utv.abs(vel);				

				//figure out animation to use if angular animations aren't present
				if (!this.anims[dir]) {
					if (dir === 'upleft') {
						this.currentAnim = (absVel.x > absVel.y) ? this.anims.moveLeft : this.anims.moveUp;
					}
					else if (dir === 'upright') {
						this.currentAnim = (absVel.x > absVel.y) ? this.anims.moveRight : this.anims.moveUp;
					}
					else if (dir === 'downleft') {
						this.currentAnim = (absVel.x > absVel.y) ? this.anims.moveLeft : this.anims.moveDown;
					}
					else if (dir === 'downright') {
						this.currentAnim = (absVel.x > absVel.y) ? this.anims.moveRight : this.anims.moveDown;
					}
					else if (this.anims.idle) {
						this.currentAnim = this.anims.idle;
					}
				}
				else {
					this.currentAnim = this.anims[dir];
				}
			},

			findMoveToPath: function ( settings ) {

				// update path if delay reached since last path was found
				// and any of the entities invoved in the pathing changed
				// or we just don't have a path yet

				if ( this.pathingTimer.delta() >= 0 && ( this.path.length === 0 || this.needsNewPath ) ) {

					this.needsNewPath = false;

					// handle settings

					settings = settings || this.movingToSettings;

					var simple;
					var avoidEntities;
					var searchDistance;
					var alwaysKeepFirst;

					if ( settings ) {

						simple = settings.simple;
						avoidEntities = settings.avoidEntities;
						searchDistance = settings.searchDistance;
						alwaysKeepFirst = settings.alwaysKeepFirst;

					}

					// find a path
					
					var x;
					var y;

					if ( simple ) {

						if ( this.path.length === 0 ) {

							x = this.pos.x + this.size.x * 0.5;
							y = this.pos.y + this.size.y * 0.5;
							
							var dX;
							var dY;

							if ( this.movingTo instanceof ig.EntityExtended ) {

								dX = ( this.movingTo.pos.x + this.movingTo.size.x * 0.5 ) - x;
								dY = ( this.movingTo.pos.y + this.movingTo.size.y * 0.5 ) - y;

							}
							else {

								dX = this.movingTo.x - x;
								dY = this.movingTo.y - y;

							}

							// reverse directions when moving from

							if ( this.movingFrom ) {

								dX = -dX;
								dY = -dY;

							}
							
							// move start point to edge in direction
							// so character doesn't instantly move to point
							
							if ( dX !== 0 ) {
								
								if ( dX > 0 ) {
									
									dX = 1;
									x = this.pos.x + this.size.x;
									
								}
								else {
									
									dX = -1;
									x = this.pos.x;
									
								}
								
							}
							
							if ( dY !== 0 ) {
								
								if ( dY > 0 ) {
									
									dY = 1;
									y = this.pos.y + this.size.y;
									
								}
								else {
									
									dY = -1;
									y = this.pos.y;
									
								}
								
							}

							// get a simple path in direction
							
							var node = _pf.getWorldWalkableNodeAt( x, y, dX, dY );
							
							if ( node ) {
								
								node.ungrounded = false; //top down RPG, baby!
								this.path[ 0 ] = node;
								
							}
							
						}

					}
					// complex pathfinding
					else {

						// moving from

						if ( this.movingFrom ) {

							if ( this.movingTo instanceof ig.EntityExtended ) {

								this.path = _pf.getPathAwayFromEntity( this, this.movingTo, avoidEntities, searchDistance );

							}
							else {

								this.path = _pf.getPathAwayFromPoint( this, this.movingTo.x, this.movingTo.y, avoidEntities, searchDistance );

							}

						}
						// moving to
						else {

							if ( this.movingTo instanceof ig.EntityExtended ) {

								this.path = _pf.getPathToEntity( this, this.movingTo, avoidEntities, searchDistance );

							}
							else {

								this.path = _pf.getPathToPoint( this, this.movingTo.x, this.movingTo.y, avoidEntities, searchDistance );

							}

						}

						// use longer pathfinding delay when path not found

						if ( this.path.length === 0 ) {

							this._lastCornerNode = undefined;
							this.pathingTimer.set( this.pathfindingDelay )

						}
						else {

							this.pathingTimer.set( this.pathfindingUpdateDelay );

							if ( this.path.length > 1 && !alwaysKeepFirst ) {

								// remove first node in path
								// in almost all cases first node is redundant and/or problematic

								var node = this.path[ this.path.length - 1 ];

								if ( !node.corner || this._lastCornerNode === node ) {

									this.path.length--;
									return;

								}

								var nextNode = this.path[ this.path.length - 2 ];
								
								x = this.pos.x + this.size.x * 0.5;
								y = this.pos.y + this.size.y * 0.5;

								// there is also no need for the first node to take us backwards

								if ( ( node.x < x && nextNode.x > x )
									|| ( node.x > x && nextNode.x < x )
									|| ( node.y < y && nextNode.y > y )
									|| ( node.y > y && nextNode.y < y ) ) {

									this.path.length--;

								}

							}

						}

					}

				}

			},

			updateWander: function () {

				if ( this.canWander && !this.tethering && !this.entityPrey && !this.entityPredator ) {

					this.wandering = true;

					var wanderSwitchChance;
					
					if ( _c.TOP_DOWN ) {
						
						wanderSwitchChance = this.wanderDirection.x === 0 && this.wanderDirection.y === 0 ? this.wanderSwitchChanceStopped : this.wanderSwitchChance;
						
						// moved to an unsafe location
						// wander should switch
						
						if ( this.moveToUnsafe ) {
							
							// don't switch both directions at once
							
							if ( !this._wanderSwitchedHorizontal ) {
								
								this._wanderSwitchedHorizontal = true;
								this.wanderDirection.x = -this.wanderDirection.x || 1;
								
							}
							else {
								
								this._wanderSwitchedHorizontal = false;
								this.wanderDirection.y = -this.wanderDirection.y || 1;
								
							}

						}
						// random switch chance
						else if ( wanderSwitchChance > 0 && Math.random() < wanderSwitchChance ) {
							
							var ran = Math.random();
							
							if ( ran > 0.5 ) {
								
								this.wanderDirection.x = Math.round( (ran * 2 - 1) + 0.1 );
								
							}
							else {
								
								this.wanderDirection.y = Math.round( (ran * 2 - 1) + 0.1 );
								;
							}

						}
						// switch when at max tether distance
						else if ( this.tetherDistance > 0 && this.entityTether ) {

							var tetherCenterX = this.entityTether.pos.x + this.entityTether.size.x * 0.5;

							if ( tetherCenterX - this.tetherDistance >= this.pos.x ) {

								this.wanderDirection.x = 1;

							}
							else if ( tetherCenterX + this.tetherDistance <= this.pos.x + this.size.x ) {

								this.wanderDirection.x = -1;

							}
							
							var tetherCenterY = this.entityTether.pos.y + this.entityTether.size.y * 0.5;

							if ( tetherCenterY - this.tetherDistance >= this.pos.y ) {

								this.wanderDirection.y = 1;

							}
							else if ( tetherCenterY + this.tetherDistance <= this.pos.y + this.size.y ) {

								this.wanderDirection.y = -1;

							}

						}
						
					}
					else {
						
						// moved to an unsafe location
						// wander should switch
						
						if ( this.moveToUnsafe ) {

							this.wanderDirection.x = -this.wanderDirection.x || 1;

						}
						// random switch chance
						else if ( wanderSwitchChance > 0 && Math.random() < wanderSwitchChance ) {
							
							this.wanderDirection.x = Math.round( Math.random() * 2 - 1 );

						}
						// switch when at max tether distance
						else if ( this.tetherDistance > 0 && this.entityTether ) {

							var tetherCenterX = this.entityTether.pos.x + this.entityTether.size.x * 0.5;

							if ( tetherCenterX - this.tetherDistance >= this.pos.x ) {

								this.wanderDirection.x = 1;

							}
							else if ( tetherCenterX + this.tetherDistance <= this.pos.x + this.size.x ) {

								this.wanderDirection.x = -1;

							}

						}
						
					}

					// no wander direction

					if ( this.wanderDirection.x === 0 && this.wanderDirection.y === 0 ) {

						this.moveToStop();

					}
					// has direction
					else {

						if ( this.wanderDirection.x !== 0 ) {
							
							if ( this.wanderDirection.x > 0 ) {
								
								this.wanderPos.x = this.pos.x + this.size.x;
								
							}
							else {
								
								this.wanderPos.x = this.pos.x;
								
							}

						}
						else {
							
							this.wanderPos.x = this.pos.x + this.size.x * 0.5;
							this.moveToHereHorizontal();
							
						}
						
						if ( this.wanderDirection.y !== 0 ) {
							
							if ( this.wanderDirection.y > 0 ) {
								
								this.wanderPos.y = this.pos.y + this.size.y;
								
							}
							else {
								
								this.wanderPos.y = this.pos.y;
								
							}

						}
						else {
							
							this.wanderPos.y = this.pos.y + this.size.y * 0.5;
							this.moveToHereVertical();
							
						}
						
						this.moveTo( this.wanderPos, this.moveToRandomSettings );

					}

				}
				else {

					this.wandering = false;

				}

			}
*/
		});
	});