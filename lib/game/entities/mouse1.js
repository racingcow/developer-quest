ig.module(
        'game.entities.mouse1'
    )
    .requires(
        'plusplus.core.config',
        'plusplus.core.entity',
        'plusplus.core.animation'
    )
    .defines(function () {

        var _c = ig.CONFIG;
        
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
            damage: 10,

            init: function(x, y, settings){
                this.parent(x, y, settings);
                this.animSheet.name = 'mouse.png';
            }
        });

    });