import roleHarvester = require('./role.harvester');
import roleUpgrader = require('./role.upgrader');
import roleBuilder = require('./role.builder');
import roleGatherer = require('./role.gatherer');
import towerLord = require('./role.towerLord');

import spawnManager = require('./room.spawnManager');
import gameStats = require('./game.stats');
import towerManager = require('./room.towerManager');

export = {

    loop: function () {
        spawnManager.run();
        //gameStats.run();

        for (var name in Game.creeps) {
            var creep = Game.creeps[name];
            if (creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
            if (creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
            if (creep.memory.role == 'builder') {
                roleBuilder.run(creep);
            }
            if (creep.memory.role == 'gatherer') {
                roleGatherer.run(creep);
            }
            if (creep.memory.role == 'towerLord') {
                towerLord.run(creep);
            }
        }

        //towerManager.run();
    }
} 