var devquest = devquest || {};
devquest.utils = devquest.utils || {};

ig.module(
		'devquest.utils.tile'
	)
	.requires(
	)
	.defines(function () {
		"use strict";

		devquest.utils.tile = devquest.utils.tile || {};

		//Sometimes it is nice to have collision map tiles be smaller than sprites
		//This method converts a collision map to one with fewer tiles and a larger tile size
		//A copy of the original data is returned as a 2d array
		//Useful in pathfinding to keep entities from walking into collidable tiles
		//Assumption: newTileSize is larger than, and an even multiple of collisionMaptileSize
		devquest.utils.tile.downconvertCollisionMap = function(collisionMapData, collisionMapTileSize, newTileSize) {

			var col = collisionMapData,
				colTileSize = collisionMapTileSize,
				entTileSize = newTileSize,
				colW = col[0].length,
				colH = col.length,
				ent = [],
				scale = entTileSize / colTileSize,
				entW = colW / scale,
				entH = colH / scale;
			
			for (var i = 0; i < entH; i++) {
				var row = [];
				for (var j = 0; j < entW; j++) {
					var x = i * scale;
					var y = j * scale;
					var blocked = false;
					for (var k = x; k < x + scale; k++)
					{
						for (var l = y; l < y + scale; l++)
						{		        
							blocked |= col[k][l];
							if (blocked) break;
						}
						if (blocked) break;
					}
					row.push(blocked);
				}
				ent.push(row);
			}

			return ent;
		},

		//returns zero-based tile position based on current pixel position
		ig.utilstile.pixelToTile = function(x, y, tileWidth, tileHeight) {
			return { 
				x: Math.floor(x / tileWidth),
                y: Math.floor(y / tileHeight)
            };                    
		},

		//returns center point (in pixels) of specified tile
		ig.utilstile.tileToPixel = function(x, y, tileWidth, tileHeight) {
			return { 
				x: x * tileWidth  + Math.round(tileWidth / 2),
                y: y * tileHeight + Math.round(tileHeight / 2)
            };                    
		}
	});