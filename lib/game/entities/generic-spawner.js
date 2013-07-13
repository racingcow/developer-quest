ig.module(
        'game.entities.generic-spawner'
    )
    .requires(
        'plusplus.core.timer',
        'plusplus.abstractities.spawner',
        'plusplus.entities.dummy',
        'plusplus.entities.trigger',
        'plusplus.helpers.utils'
    )
    .defines(function () {
        "use strict";

        var _ut = ig.utils;

        ig.GenericSpawner = ig.global.EntityGenericSpawner = ig.Spawner.extend({
            duration: 10,
            spawnCountMax: 10,            
            spawningEntity: 'EntityDummy',
            spawnDelay: 1,
            triggerable: true,
            once: false
        });
    });