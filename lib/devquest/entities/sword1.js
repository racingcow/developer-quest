var devquest = devquest || {};
devquest.entities = devquest.entities || {};

ig.module(
		'devquest.entities.sword1'
	)
	.requires(
		'plusplus.core.hierarchy',
		'plusplus.core.config',
		'plusplus.core.entity',
		'plusplus.core.animation',
		'plusplus.abilities.ability-damage',
		'plusplus.helpers.utils'
	)
	.defines(function () {

		var _c = ig.CONFIG;
		var _ut = ig.utils;

		devquest.entities.EntitySword1 = ig.EntitySword1 = ig.global.EntitySword1 = ig.EntityExtended.extend({
			animSettings: {
				left: {
					frameTime: 0.05,
					sequence: [4,5,4,3],
					once: true
				},
				right: {
					frameTime: 0.05,
					sequence: [7,8,7,6],
					once: true
				},
				up: {
					frameTime: 0.05,
					sequence: [10,11,10,9],
					once: true
				},
				down: {
					frameTime: 0.05,
					sequence: [1,2,1,0],
					once: true
				}
			},
			animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'sword.png', 32, 32),
			size: {x:32, y:32},
			damage: 2,  
			damageUnblockable: false,

			initProperties: function() {
				
				this.parent();

				_ut.addType(ig.EntityExtended, this, 'checkAgainst', 'DAMAGEABLE');

				this.abilities = new ig.Hierarchy();
				this.damageAbility = new ig.AbilityDamage(this);
				this.damageAbility.spawningEntity = ig.EntitySword1;
				this.damageAbility.damage = this.damage;
				this.abilities.addDescendant(this.damageAbility);

			},

			init: function(x, y, settings){
				this.parent(x, y, settings);
				this.animSheet.name = 'sword.png';
			},

			check: function(entity) {
				this.parent(entity);
				entity.receiveDamage(this.damage, this, this.damageUnblockable);
			}

		});

	});