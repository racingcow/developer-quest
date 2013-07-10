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

            //Type of whip entity to spawn
            spawningEntity: '',            

            //Creates whip and handles application of settings
            activate: function (settings) {

                if (ig.global.whip) {
                    ig.global.whip.kill();
                    ig.global.whip = null;
                }

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

                var whip = ig.game.spawnEntity(
                    this.spawningEntity, 
                    this.entity.bounds.minX, 
                    this.entity.bounds.minY,
                    whipSettings
                );                

                //whip should be placed according to direction parent entity is facing
                var facing = whipSettings.facing || 'left';
                if (facing === 'left') {
                    whip.pos.x -= this.entity.bounds.width;
                    whip.currentAnim = whip.anims.left;                    
                }
                if (facing === 'right') {
                    whip.pos.x += this.entity.bounds.width;
                    whip.currentAnim = whip.anims.right;
                    whip.currentAnim.flip.x = true;
                    whip.currentAnim.flip.y = true;
                    whip.currentAnim.angle = Math.PI;
                }
                if (facing === 'up') {
                    whip.pos.y -= this.entity.bounds.height;
                    whip.currentAnim = whip.anims.up;
                    whip.currentAnim.angle = Math.PI * 0.5;
                }
                if (facing === 'down') {
                    whip.pos.y += this.entity.bounds.height;
                    whip.currentAnim = whip.anims.down;     
                    whip.currentAnim.flip.x = true;                                   
                    whip.currentAnim.angle = -Math.PI * 0.5;                    
                }
                whip.currentAnim.onCompleted.add(this._onWhipAnimCompleted);

                ig.global.whip = whip; //todo: find a way to reference this from _onWhipAnimCompleted
                this.parent();

                return whip;

            },

            //don't leave spawned whips lying around on the floor
            _onWhipAnimCompleted: function() {     

                ig.global.whip.kill();
                ig.global.whip = null;

                //todo: how to remove listener?
                //this.whip.currentAnim.onCompleted.remove(this._onWhipAnimCompleted);
            },

            //override to include whip
            clone: function (c) {

                if (c instanceof ig.AbiltityWhip !== true) {

                    c = new ig.AbilityWhip();

                }

                c.spawningEntity = this.spawningEntity;

                return this.parent(c);

            }
        });
    });