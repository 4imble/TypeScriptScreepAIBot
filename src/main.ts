import roleHarvester = require('./roles/role.harvester');
import roleUpgrader = require('./roles/role.upgrader');
import roleBuilder = require('./roles/role.builder');
import roleGatherer = require('./roles/role.gatherer');
import towerLord = require('./roles/role.towerLord');
import warrior_defender = require('./roles/role.warrior_defender');
import warrior_attacker = require('./roles/role.warrior_attacker');

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