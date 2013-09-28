var devquest = devquest || {};
devquest.controllers = devquest.controllers || {};

ig.module(
	'devquest.controllers.playerController'
)
.requires(
)
.defines(function() {
	"use strict";

	var _private = {
		
	}

	devquest.controllers.PlayerController = ig.Class.extend({

		game: null,
		players: [],
		curPlayerIdx: 0,
		onPlayerChanged: null,

		init: function(game, players) {
			this.game = game;
			this.players = players;
			this.onPlayerChanged = new ig.Signal();
		},
		update: function() {
			if (ig.input.pressed('rot-lft-2')) {
				this.switchPlayer(1);
			} 
			else if (ig.input.pressed('rot-rt-2')) {
				this.switchPlayer(-1);
			}
		},
		switchPlayer: function(dir) {

			var idx = this.curPlayerIdx,
				ps = this.players,
				pos = ps[idx].pos;

			ig.game.camera.unfollow(ps[idx]);

			console.log('removing player "' + ps[idx].name + '" @ ' + pos.x + ',' + pos.y);

			ig.game.removeEntity(ps[idx]);
			idx = (idx + dir) % ps.length;
			idx = idx < 0 ? ps.length - 1 : idx;
			var player = ig.game.spawnEntity(ps[idx], pos.x, pos.y);

			console.log('adding player "' + player.name + '" @ ' + pos.x + ',' + pos.y);

			this.curPlayerIdx = idx;

			ig.game.camera.follow(player);

			this.onPlayerChanged.dispatch(this);
		},
		cleanup: function () {
			this.onPlayerChanged.removeAll();
			this.onPlayerChanged.forget();
		}
	});
});