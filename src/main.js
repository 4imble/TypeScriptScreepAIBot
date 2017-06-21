"use strict";
var roleHarvester = require("./roles/role.harvester");
var roleUpgrader = require("./roles/role.upgrader");
var roleBuilder = require("./roles/role.builder");
var roleGatherer = require("./roles/role.gatherer");
var towerLord = require("./roles/role.towerLord");
var warrior_defender = require("./roles/role.warrior_defender");
var warrior_attacker = require("./roles/role.warrior_attacker");
var spawnManager = require("./room.spawnManager");
var towerManager = require("./room.towerManager");
module.exports = {
    loop: function () {
        spawnManager.run();
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
};
