"use strict";
var roleHarvester = require("./harvester");
var roleMule = require("./mule");
var roleWorker = require("./worker");
var SpawnManager = require("./spawnManager");
module.exports = {
    loop: function () {
        for (var name in Game.creeps) {
            var creep = Game.creeps[name];
            if (creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
            if (creep.memory.role == 'mule') {
                roleMule.run(creep);
            }
            if (creep.memory.role == 'worker') {
                roleWorker.run(creep);
            }
        }
        SpawnManager.run();
    }
};
