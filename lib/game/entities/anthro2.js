ig.module(
        'game.entities.anthro2'
    )
    .requires(        
        'plusplus.core.config',
        'plusplus.core.animation',
        'game.abstractities.enemy',
        'game.helpers.utilstile'
    )
    .defines(function () {
        "use strict";

        var _c = ig.CONFIG,
            _til = ig.utilstile,
            _path = null,
            _pathIdx = 1,
            _ut = ig.utils,
            _utm = ig.utilsmath,
            _utv = ig.utilsvector2;
        
        ig.EntityAnthro2 = ig.global.EntityAnthro2 = ig.Enemy.extend({

            animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'anthro2.png', 32, 32),
            trackingFrequencyInSec: 1,

            moveToNextTile: function() {

                //Stop if nowhere to go
                if (!this._path || this._path.length < 2 || this._pathIdx >= this._path.length) {                    
                    console.log('pausing');
                    this.moveToHere();
                    return;
                }

                //convert current tile to point and move to it
                var tile = this._path[++this._pathIdx],
                    point = _til.tileToPixel(
                        tile[0], tile[1], 
                        this.animSheet.width, this.animSheet.height);                        
                console.log('moving to { ' + point.x + ', ' + point.y + '}');
                this.moveToLocation(point);

            },

            seekPlayer: function() {

                //Collision tiles are 1/4 the size of this entity
                var colMap = ig.game.collisionMap,
                    entTileW = this.animSheet.width,
                    entTileH = this.animSheet.height,
                    entColMap = _til.downconvertCollisionMap(
                        colMap.data, 
                        colMap.tilesize, 
                        entTileW);

                //Find the enemy and player locations
                var player = ig.game.getEntitiesByType('EntityPlayer')[0],
                    el = _til.pixelToTile(this.pos.x, this.pos.y, entTileW, entTileH),
                    pl = _til.pixelToTile(player.pos.x, player.pos.y, entTileW, entTileH);

                //Find the path to the player, yo
                var grid = new PF.Grid(entColMap[0].length, entColMap.length, entColMap),
                    finder = new PF.AStarFinder({allowDiagonal: true});
                this._pathIdx = 1;
                try {
                    this._path = finder.findPath(el.x, el.y, pl.x, pl.y, grid);
                }
                catch (e) {
                    console.log(e);
                }

                //Get movin'
                this.moveToNextTile();
            },

            moveToUpdate: function () {
                
                if (this.movingTo === true) {

                    var dx = this._moveToPos.x - this.pos.x,
                        dy = this._moveToPos.y - this.pos.y,
                        xEqual = _utm.almostEqual(dx, 0, 1),
                        yEqual = _utm.almostEqual(dy, 0, 1);
                    
                    if (xEqual && yEqual) {
                        this.moveToNextTile();                        
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