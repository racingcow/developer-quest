ig.module(
        'game.entities.generic-spawner'
    )
    .requires(
        'plusplus.core.timer',
        'plusplus.abstractities.spawner',        
        'plusplus.entities.trigger',
        'plusplus.helpers.utils',
        'game.entities.rabbit'
    )
    .defines(function () {
        "use strict";

        var _ut = ig.utils;

        ig.GenericSpawner = ig.global.EntityGenericSpawner = ig.Spawner.extend({
            duration: -1,
            spawnCountMax: 1,
            spawningEntity: 'EntityRabbit',
            spawnDelay: 0,
            triggerable: true,
            once: false
        });
    });