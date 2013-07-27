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
            animSettings: {                
                LEFT: {
                    frameTime: 0.05,
                    sequence: [4,5,4,3],
                    once: true
                },
                RIGHT: {
                    frameTime: 0.05,
                    sequence: [7,8,7,6],
                    once: true                    
                },
                UP: {
                    frameTime: 0.05,
                    sequence: [10,11,10,9],
                    once: true                    
                },
                DOWN: {
                    frameTime: 0.05,
                    sequence: [1,2,1,0],
                    once: true                    
                }
            },
            animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'mouse.png', 32, 32),
            size: {x:32, y:32},
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