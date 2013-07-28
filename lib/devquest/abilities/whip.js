//this ability represents any type of weapon that moves in a straight line 
//from the owning entity and then returns
//This includes whips, harpoons, lassos, or even boomerangs

var devquest = devquest || {};
devquest.abilities = devquest.abilities || {};

ig.module(
        'devquest.abilities.whip'
    )
    .requires(
        'plusplus.core.input',
        'plusplus.abilities.ability',
        'plusplus.helpers.utilsvector2'
    )
    .defines(function () {
        "use strict";

        devquest.abilities.AbilityWhip = ig.Ability.extend({
            
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
                        this.entity.pos.x - (this.entity.size.x / 2), 
                        this.entity.pos.y - (this.entity.size.y / 2),
                        whipSettings
                    );
                }

                //whip should be placed according to direction controlling entity is facing
                var facing = this.entity.facing;
                this.whip.currentAnim = this.whip.anims[facing.name];
                
                this.whip.movingToEntity = null;
                this.whip.moveToEntity(this.entity, { 
                    matchPerformance: true,
                    once: false,
                    offsetPct: facing.vect
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
                //console.log(this);
                var whipAbility = ig.global.whipAbility;
                whipAbility.whip.currentAnim.onCompleted.remove(whipAbility._onWhipAnimCompleted);
                whipAbility.whip.currentAnim = null;
                whipAbility.whip.kill();
                whipAbility.whip = null;
            },

            //override to include whip
            clone: function (c) {

                if (c instanceof ig.AbiltityWhip !== true) {

                    c = new devquest.abilities.AbilityWhip();

                }

                c.whipType = this.whipType;                

                return this.parent(c);

            }
        });
    });