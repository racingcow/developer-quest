var devquest = devquest || {};
devquest.weapons = devquest.weapons || {};

ig.module(
		'devquest.weapons.weapon'
	)
	.requires(
		'plusplus.core.hierarchy',
		'plusplus.core.entity',
		'plusplus.core.animation',
		'plusplus.abilities.ability-damage',
		'plusplus.helpers.utils'
	)
	.defines(function () {

		var _ut = ig.utils;

		devquest.weapons.Weapon = ig.EntityExtended.extend({

			animSheet: null,
			friendlyName: '',
			flavorText: '',
			description: '',
			damage: 0,
			damageUnblockable: false,
			sizeUnrotated: {x: 32, y: 32},
			size: {x: 32, y: 32},

			initProperties: function() {

				this.parent();

				_ut.addType(ig.EntityExtended, this, 'checkAgainst', 'DAMAGEABLE');

				this.abilities = new ig.Hierarchy();
				this.damageAbility = new ig.AbilityDamage(this);
				this.damageAbility.spawningEntity = this; //ig.EntityMouse0; //check this
				this.damageAbility.damage = this.damage;
				this.abilities.addDescendant(this.damageAbility);

			},

			check: function(entity) {
				this.parent(entity);
				entity.receiveDamage(this.damage, this, this.damageUnblockable);
			}

		});

	});