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
			canTargetSelf: true
		};

		devquest.consumables.HealthMod = ig.global.HealthMod = devquest.consumables.Consumable.extend({

			amt: 0, //use < 0 for damage, > 0 for healing

			consume: function(player) {

				var damager = new ig.AbilityDamage(player, 0, 0);
				damager.damage = (this.amt * -1); //heal is the opposite of damage;
				damager.groupTargetable = true;
				damager.canTargetSelf = true;
				damager.setEntityTarget(player);
				damager.activate();
				damager.cleanup();

			}

		});

	});