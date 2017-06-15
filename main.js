"use strict";
var roleHarvester = require("./role.harvester");
var roleUpgrader = require("./role.upgrader");
var roleBuilder = require("./role.builder");
var roleGatherer = require("./role.gatherer");
var towerLord = require("./role.towerLord");
var spawnManager = require("./room.spawnManager");
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
        }
    }
};
