//modifies player health when consumed
var devquest = devquest || {};
devquest.consumables = devquest.consumables || {};

ig.module(
		'devquest.consumables.health-mod'
	)
	.requires(
		'plusplus.ui.ui-element',
		'devquest.consumables.consumable'
	)
	.defines(function () {
		'use strict';

		var _defaults = {
			damageUnblockable: true,
			requiresTarget: false
		};

		devquest.consumables.HealthMod = ig.global.HealthMod = devquest.consumables.Consumable.extend({

			amt: 0, //use < 0 for damage, > 0 for healing
			amtAsPct: false,

			consume: function(player) {

				var settings = _defaults;
				ig.merge(settings, this);
				var damager = new ig.AbilityDamage(player, 0, 0, settings);
				damager.execute();
				damager.kill();
			}

		});

	});