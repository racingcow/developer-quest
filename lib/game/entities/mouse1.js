ig.module(
        'game.entities.mouse1'
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
        
        ig.EntityMouse1 = ig.global.EntityMouse1 = ig.EntityExtended.extend({            
            animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'mouse.png', 32, 32),
            animSettings: {                
                left: {
                    frameTime: 0.1,
                    sequence: [0,1,2,1,0],                
                    once: true
                },
                right: {
                    frameTime: 0.1,
                    sequence: [0,1,2,1,0],                
                    once: true
                },
                up: {
                    frameTime: 0.1,
                    sequence: [0,1,2,1,0],                
                    once: true
                },
                down: {
                    frameTime: 0.1,
                    sequence: [0,1,2,1,0],                
                    once: true
                }
            },
            
            damage: 1,  
            damageUnblockable: false,

            initProperties: function() {
                
                this.parent();

                _ut.addType(ig.EntityExtended, this, 'checkAgainst', 'DAMAGEABLE');

                this.abilities = new ig.Hierarchy();
                this.damageAbility = new ig.AbilityDamage(this);
                this.damageAbility.spawningEntity = ig.EntityMouse1;
                this.damageAbility.damage = this.damage;
                this.abilities.addDescendant(this.damageAbility);

            },
            init: function(x, y, settings){
                this.parent(x, y, settings);
                this.animSheet.name = 'mouse.png';                
            },
            check: function(entity) {
                this.parent(entity);                
                entity.receiveDamage(this.damage, this, this.damageUnblockable);
            }
        });

    });