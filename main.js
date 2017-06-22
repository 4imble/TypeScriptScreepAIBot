"use strict";
var roleHarvester = require("./harvester");
var roleMule = require("./mule");
var spawnManager = require("./spawnManager");
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
        }
        spawnManager.run();
    }
};
