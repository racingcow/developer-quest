//this ability represents any type of weapon that moves in a straight line 
//from the owning entity and then returns
//This includes whips, harpoons, lassos, or even boomerangs
ig.module(
        'game.abilities.whip'
    )
    .requires(
        'plusplus.core.input',
        'plusplus.abilities.ability'
    )
    .defines(function () {
        "use strict";

        ig.AbilityWhip = ig.Ability.extend({
            
            whipType: '', //Type of whip entity to spawn
            whip: null,   //Reference to entity controlled by this ability

            //Creates whip and handles application of settings
            activate: function (settings) {                

                settings = settings || {};                

                var entityOptions = this.entityOptions || this.entity;
                
                // add entity group to whip settings so we don't hit own group with whip
                var whipSettings = {
                    group: this.entity.group
                };

                // merge settings
                if (entityOptions.whipSettings) {
                    ig.merge(whipSettings, entityOptions.whipSettings);
                }
                if (settings.whipSettings) {
                    ig.merge(whipSettings, settings.whipSettings);
                }

                if (!this.whip) {
                    this.whip = ig.game.spawnEntity(
                        this.whipType, 
                        this.entity.pos.x, 
                        this.entity.pos.y,
                        whipSettings
                    );
                    //console.log(this.entity.pos.x + ',' + this.entity.pos.y);
                }

                //whip should be placed according to direction parent entity is facing
                var facing = whipSettings.facing || 'left';
                var offsetPct = {x: 0, y: 0};
                this.whip.currentAnim = this.whip.anims[facing];
                if (facing === 'left') {
                    offsetPct = {x: -1, y: 0};
                }
                if (facing === 'right') {
                    offsetPct = {x: 1, y: 0};
                    this.whip.currentAnim.flip.x = true;
                    this.whip.currentAnim.flip.y = true;
                    this.whip.currentAnim.angle = Math.PI;
                }
                if (facing === 'up') {
                    offsetPct = {x: 0, y: 1};
                    this.whip.currentAnim.angle = Math.PI * 0.5;
                }
                if (facing === 'down') {
                    offsetPct = {x: 0, y: -1};
                    this.whip.currentAnim.flip.x = true;
                    this.whip.currentAnim.angle = -Math.PI * 0.5;
                }
                this.whip.moveToEntity(this.entity, { 
                    matchPerformance: true,
                    once: false,
                    offsetPct: offsetPct
                });
                this.whip.currentAnim.onCompleted.add(this._onWhipAnimCompleted);            
                this.whip.currentAnim.playFromStart();
                
                this.parent();

                ig.global.whipAbility = this;

                return this.whip;
                
            },

            //whips stop after returning to the hand of their user
            _onWhipAnimCompleted: function() {                

                //holy cats, 'this' is undefined here, even though signalsjs says it should 
                //be the animation object!
                console.log(this);
                var whipAbility = ig.global.whipAbility;
                whipAbility.whip.currentAnim.onCompleted.remove(whipAbility._onWhipAnimCompleted);
                whipAbility.whip.currentAnim = null;
            },

            //override to include whip
            clone: function (c) {

                if (c instanceof ig.AbiltityWhip !== true) {

                    c = new ig.AbilityWhip();

                }

                c.whipType = this.whipType;                

                return this.parent(c);

            }
        });
    });