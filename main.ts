import roleHarvester = require('./role.harvester');
import roleUpgrader = require('./role.upgrader');
import roleBuilder = require('./role.builder');
import roleGatherer = require('./role.gatherer');
import towerLord = require('./role.towerLord');
import warrior_defender = require('./role.warrior_defender');
import warrior_attacker = require('./role.warrior_attacker');

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
            if (creep.memory.role == 'warrior_defender') {
                warrior_defender.run(creep);
            }
            if (creep.memory.role == 'warrior_attacker') {
                warrior_attacker.run(creep);
            }
        }

        towerManager.run();
    }
} 