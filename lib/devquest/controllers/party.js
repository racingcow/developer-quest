var devquest = devquest || {};
devquest.controllers = devquest.controllers || {};

ig.module(
	'devquest.controllers.party'
)
.requires(
	'plusplus.core.config',
	'devquest.consumables.consumable',
	'devquest.consumables.health-mod'
)
.defines(function() {
	"use strict";

	var _c = ig.CONFIG,
		_cfg = _c.UI.MENU.CONSUMABLES;

	devquest.controllers.Party = ig.Class.extend({

		players: [],
		curPlayerIdx: 0,
		onPlayerChanged: null,
		inventory: new Array(_cfg.ROWS * _cfg.COLS), //inventory is shared by party

		init: function(game, players) {
			this.players = players;
			this.onPlayerChanged = new ig.Signal();

			//todo: some test items. need to get these populated from db/save state
			this.inventory[0] = new devquest.consumables.HealthMod(0, 0, {
				friendlyName: 'Nips',
				flavorText: 'For those who want that "fresh coffee" smell on their breath after dinner',
				description: 'Restores 5 CP, overpowers even the strongest toothpaste',
				animSettings: { idle: { sequence: [0] }},
				amt: 5
			});
			this.inventory[1] = new devquest.consumables.HealthMod(0, 0, {
				friendlyName: 'Double Ristretto Venti Nonfat Organic Chocolate Brownie Frappuccino with Extra Hot Foam and Whipped Cream Upside Down Double Blended',
				flavorText: 'A live birth occurred in line while someone rattled this baby off',
				description: 'Restores 500 CP, causes adult onset diabetes',
				animSettings: { idle: { sequence: [2] }},
				amt: 500
			});
		},
		update: function() {

			if (ig.game.paused) return;

			if (ig.input.pressed('rot-lft-2')) {
				console.log('party: rot-lft-2');
				this.switchPlayer(1);
			} 
			else if (ig.input.pressed('rot-rt-2')) {
				console.log('party: rot-rt-2');
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