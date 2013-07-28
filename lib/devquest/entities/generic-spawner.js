var devquest = devquest || {};
devquest.entities = devquest.entities || {};

ig.module(
        'devquest.entities.generic-spawner'
    )
    .requires(
        'plusplus.core.timer',
        'plusplus.abstractities.spawner',        
        'plusplus.entities.trigger',
        'plusplus.helpers.utils',

        //todo: how to load these dynamically?
        'devquest.entities.anthro',
        'devquest.entities.anthro2'
    )
    .defines(function () {
        "use strict"; 

        var _ut = ig.utils;

        devquest.entities.EntityGenericSpawner = ig.EntityGenericSpawner = ig.Spawner.extend({
            duration: -1,
            spawnCountMax: 1,
            spawningEntity: null,
            spawnDelay: 0,
            triggerable: true,
            once: false
        });
    });